# PHP Obfuscator

A built-in admin tool for obfuscating PHP source code before distributing it to customers. Protects your proprietary code from being easily read or reverse-engineered.

## Access

Navigate to **License Manager → PHP Obfuscator** in the admin panel.

## How It Works

1. Paste your PHP source code (must include `<?php` or `<?` opening tags)
2. Choose an obfuscation type
3. Optionally enable HTML minification
4. Click **Obfuscate**
5. Copy the obfuscated output

## Obfuscation Types

| Type | Method | Use Case |
|------|--------|----------|
| **Lite** | Base64 encoding + `eval()` | Quick protection, smaller files |
| **Advanced** | gzip compression + Base64 + `eval()` with randomized variable names | Stronger protection, harder to reverse |

### Lite Example

Input:
```php
<?php echo "Hello World"; ?>
```

Output:
```php
<?php eval(base64_decode('ZWNobyAiSGVsbG8gV29ybGQiOw==')); ?>
```

### Advanced Example

Output uses compressed encoding with random variable names:
```php
<?php $aBcDeFgH=base64_decode('...');$xYzAbCdE=gzinflate($aBcDeFgH);eval($xYzAbCdE); ?>
```

## HTML Minification

When enabled, strips unnecessary whitespace and HTML comments from mixed PHP/HTML files before obfuscation. Useful for template files that contain both PHP logic and HTML markup.

## Use Cases

- **License verification files** — Protect the code that checks license validity
- **Proprietary business logic** — Hide algorithms or sensitive logic in distributed plugins/themes
- **Template files** — Obfuscate PHP templates before packaging for distribution

## Limitations

- Obfuscated code requires `eval()` to execute — some hosting environments disable it
- Not a substitute for proper license management; adds a layer of protection alongside license keys
- Advanced obfuscation requires the `zlib` PHP extension

## See Also

- [Products](products.md) — Configure products for distribution
- [Licenses](licenses.md) — Manage license keys
