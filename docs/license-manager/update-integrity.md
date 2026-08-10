# Update Integrity (Signed Updates)

License Manager can publish a SHA-256 checksum with every update and let you sign releases with an
Ed25519 key, so a client can prove an update archive is genuine **before** it installs it.

The feature is **off by default**. While disabled, the update API behaves exactly as it did before,
so existing clients see no change.

## Why a signature and not just a checksum

A checksum served next to the file only catches corruption. Anyone who can replace the archive can
replace the checksum alongside it. What makes an update tamper-proof is an asymmetric signature: the
private key lives on your release machine, the public key is embedded in your client, and the
license server never holds anything that can produce a valid signature.

That gives you three separate machines with three separate jobs:

| Machine | Holds | Can |
|---------|-------|-----|
| Release box | Private key | Sign a release |
| License server | Public keys only | Serve the signature it was given |
| Client | Public key | Verify, and refuse to install on mismatch |

::: danger Never copy the private key to the license server
If the signing key sits alongside the update files, anyone able to replace an update can also
re-sign it, which defeats the entire point. `keys:generate` and `release:sign` are built to run on a
machine that has the key and nothing else - neither touches the database or the network.
:::

## Requirements

- **ext-sodium** on the machine that signs, and on the license server if you want it to verify
  signatures at upload time. It is bundled and enabled by default from PHP 7.2, but some hosts
  compile without it.
- Without ext-sodium the plugin degrades to "cannot verify" rather than breaking: checksums still
  work, and unsigned uploads are still accepted.

## Enabling it

Go to **Admin → Settings → License Manager → General** and turn on **Enable update integrity**.

Checksums are recorded on upload whether or not the setting is on, so enabling it takes effect
immediately for everything already uploaded through the admin.

## Step 1 - Generate a keypair on your release machine

```bash
php artisan cms:license-manager:keys:generate
```

Writes the private key to `./lm-signing.key` with mode `0600` and prints the public key and key ID:

```
Private key ....................... /path/to/lm-signing.key (mode 0600)
Public key ........... 4jK9v0m2XcQ8pR1sT7uY3wZ5aB6cD8eF0gH2iJ4kL6M=
Key ID ............................................ ebf6e384f670a282
```

Use `--output=/secure/path/lm-signing.key` to write elsewhere. The command refuses to overwrite an
existing key file.

## Step 2 - Trust the public key on the license server

Go to **Admin → Settings → License Manager → General → Update signing keys**, paste the **public
key** and a label, and click **Trust this key**.

Only public keys are stored here. Once at least one key is trusted, any version uploaded *with* a
signature is verified against these keys before it is saved - an unknown key or a bad signature is
rejected at upload time rather than discovered by a client later.

## Step 3 - Sign the release

On the release box, with the archive you are about to upload:

```bash
php artisan cms:license-manager:release:sign update-1.2.0.zip PROD-001 1.2.0
```

Arguments are positional: **file**, **product reference id**, **version string exactly as it will be
stored**. `--key=` points at the private key (default `./lm-signing.key`), and `--json` emits
machine-readable output for CI.

```
Manifest
lm-manifest-v1
product=PROD-001
version=1.2.0
sha256=9b73b06f106459334a7ee3d62fd3e0bd80770609d398be693f8940c600fd822d
size=2048

Signature ........ VGhpcyBpcyBhIDY0LWJ5dGUgZGV0YWNoZWQgc2lnbmF0dXJlIGV4YW1wbGU...
Key ID ........................................... ebf6e384f670a282
```

::: warning The version you sign must match the version you upload
The version string is bound into the signature. Sign `1.2.0` and upload it as `1.2` and the server
will reject it with *"The signed manifest does not describe the uploaded file."*
:::

## Step 4 - Upload with the signature

When creating the product version in the admin, fill in the three signature fields with what
`release:sign` printed:

- **Signed manifest** - the full multi-line manifest block
- **Update signature** - the base64 signature
- **Signing key ID** - the 16-character key ID

All three must be provided together, or none of them. The server recomputes the digest of the
uploaded file, checks it against the manifest, and verifies the signature against your trusted keys
before saving.

Leave them empty to upload an unsigned release. Unsigned versions keep working; clients simply get
no `signature` field for them.

## Backfilling checksums for existing versions

Versions uploaded before this feature existed have no digest. Compute them in place:

```bash
php artisan cms:license-manager:versions:backfill-checksums --dry-run
php artisan cms:license-manager:versions:backfill-checksums
```

Safe to re-run: only rows with no digest are touched, and a version whose archive is missing from
disk is reported and left null rather than failing the run. Backfilling adds checksums only -
existing versions stay unsigned until you re-upload them with a signature.

## What the API returns

With update integrity enabled, `update/check` and `update/latest` gain up to three fields. They are
**omitted entirely** rather than sent as null when unknown, so a client can treat presence as "this
server offers integrity data".

```json
{
  "update_available": true,
  "version": "1.2.0",
  "file_size": 2048,
  "checksum": {
    "algo": "sha256",
    "value": "9b73b06f106459334a7ee3d62fd3e0bd80770609d398be693f8940c600fd822d"
  },
  "signature": {
    "algo": "ed25519",
    "key_id": "ebf6e384f670a282",
    "value": "<base64 detached signature>",
    "manifest": "lm-manifest-v1\nproduct=PROD-001\nversion=1.2.0\nsha256=9b73...\nsize=2048"
  }
}
```

The download endpoint additionally sends the digest as a response header on the main archive:

```
X-LM-Checksum-SHA256: 9b73b06f106459334a7ee3d62fd3e0bd80770609d398be693f8940c600fd822d
```

::: warning Resumed downloads
That header describes the **complete** file. On a `206 Partial Content` response to a Range request
it does not describe the bytes in that response. A client resuming a download must verify the
reassembled file, never an individual chunk.
:::

## The manifest format

Signatures are computed over a canonical byte string, `lm-manifest-v1`:

```
lm-manifest-v1\n
product=<product reference id>\n
version=<version string, verbatim as stored>\n
sha256=<lowercase hex, 64 chars>\n
size=<decimal bytes, no separators>
```

Fixed field order, LF separators, and **no trailing newline**. Every byte matters: the signature is
computed over exactly this string, so a client that reproduces it differently will reject valid
signatures.

It is deliberately not JSON. Client verification has to be reimplemented in every language you
support, and JSON canonicalisation - key order, unicode escaping, integer formatting - is a rich
source of subtle mismatches. A fixed-order line format is byte-exact by construction.

**Why a manifest and not the digest alone:** signing only the digest would let an attacker who
controls the server replay an older, genuinely signed archive in response to an update check for a
newer version, and every signature check would pass. Binding product, version, digest and size
together closes that.

## Verifying in your client

Order matters. The manifest is only trustworthy *after* the signature over it verifies, so never
read values out of it first and check the signature later.

1. **Verify the signature** over `signature.manifest` using the public key embedded in your client.
   Abort on failure.
2. **Parse the manifest** and reject anything that is not a well-formed `lm-manifest-v1`. Treat a
   parse failure as "do not trust", never as "empty manifest".
3. **Check `product` and `version` in the manifest** against the update you actually asked for.
   The signature binds them, but only your comparison enforces them - this is what stops a valid
   older release being replayed at you.
4. **Download the archive**, then recompute SHA-256 over the complete file.
5. **Compare digests with a constant-time comparison**, and check the size.
6. **Install only if every step passed.** Abort on any mismatch.

### Reference implementation (PHP)

This is the canonical implementation and matches the server exactly.

```php
function verifyUpdate(
    array $signature,      // the 'signature' object from update/check
    string $archivePath,   // the downloaded file
    string $expectedProduct,
    string $expectedVersion,
    string $publicKeyBase64 // embedded in your client
): bool {
    $manifest = $signature['manifest'] ?? '';

    // 1. Signature first, over the raw manifest bytes.
    $sig = base64_decode($signature['value'] ?? '', true);
    $key = base64_decode($publicKeyBase64, true);

    if ($sig === false || strlen($sig) !== 64 || $key === false || strlen($key) !== 32) {
        return false;
    }

    if (! sodium_crypto_sign_verify_detached($sig, $manifest, $key)) {
        return false;
    }

    // 2. Parse only what we have just authenticated.
    $lines = explode("\n", $manifest);

    if (count($lines) !== 5 || $lines[0] !== 'lm-manifest-v1') {
        return false;
    }

    $fields = [];

    foreach (array_slice($lines, 1) as $line) {
        [$name, $value] = array_pad(explode('=', $line, 2), 2, null);
        $fields[$name] = $value;
    }

    if (! preg_match('/^[a-f0-9]{64}$/', $fields['sha256'] ?? '')) {
        return false;
    }

    // 3. It must describe the update we asked for.
    if (($fields['product'] ?? null) !== $expectedProduct
        || ($fields['version'] ?? null) !== $expectedVersion) {
        return false;
    }

    // 4 + 5. The file itself, compared in constant time.
    if ((int) ($fields['size'] ?? -1) !== filesize($archivePath)) {
        return false;
    }

    return hash_equals($fields['sha256'], hash_file('sha256', $archivePath));
}
```

### Other languages

The primitives are the same everywhere: Ed25519 detached verification over the manifest bytes, then
SHA-256 over the file with a constant-time comparison. Only the library differs.

| Platform | Ed25519 verification |
|----------|---------------------|
| .NET / C# | [NSec](https://nsec.rocks): `SignatureAlgorithm.Ed25519.Verify(PublicKey.Import(SignatureAlgorithm.Ed25519, key, KeyBlobFormat.RawPublicKey), manifest, sig)`, or BouncyCastle `Ed25519Signer` |
| Swift / macOS | CryptoKit: `Curve25519.Signing.PublicKey(rawRepresentation:).isValidSignature(_:for:)` |
| Node.js | `crypto.verify(null, manifest, publicKey, sig)` - a raw 32-byte key must be wrapped as SPKI first (prefix `302a300506032b6570032100`) |
| Python | PyNaCl: `VerifyKey(key).verify(manifest, sig)` |
| Java | BouncyCastle `Ed25519Signer` |
| Go | `ed25519.Verify(pub, manifest, sig)` |

Two portability rules that cause most failures:

- Encode the manifest as **UTF-8 bytes with no normalisation** and no trailing newline. Do not let a
  string helper add one.
- Compare digests with a **constant-time** function (`hash_equals`, `crypto.timingSafeEqual`,
  `CryptographicOperations.FixedTimeEquals`), not `==`.

## Key rotation and revocation

Trust more than one key at a time to rotate without a flag day:

1. Generate a new keypair on the release box.
2. Add its public key on the server while the old one is still trusted.
3. Ship a client release that embeds both public keys.
4. Start signing with the new key.
5. Revoke the old key once no supported client depends on it.

Revoking a key rejects **new** uploads signed with it. Versions already signed keep their
signatures, so revocation never breaks an existing release.

## Troubleshooting

| Message | Cause |
|---------|-------|
| A signature, key ID and manifest must all be provided together | Only some of the three fields were filled in |
| That signing key is not trusted, or has been revoked | The key ID is not in the trusted list, or was revoked |
| The signature does not match the manifest | Signature and manifest are from different runs, or were altered in transit |
| The signed manifest does not describe the uploaded file | Product, version, or file differs from what was signed - usually a version string typo |
| The uploaded file could not be hashed | The archive could not be read from storage |
| This server cannot verify signatures | ext-sodium is not installed on the license server |

::: tip Client verification is yours to implement
The server publishes checksums and signatures; deciding to refuse an install is the client's job.
Existing versions released before this feature have no signature, so roll enforcement out only once
signed versions have accumulated - otherwise the first enforcing client rejects every older release.
:::
