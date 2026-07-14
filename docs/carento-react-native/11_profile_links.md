# Profile Support Links

The Profile tab includes a **Support** section. What its "Help & support" row
does, and whether a "Customer support" row appears, is controlled by three
environment variables that flow through `app.config.js` into
`appConfig.support` (`src/config/app.ts`).

## Configuration

Set these in your `.env`:

```bash
# --- Profile "Support" links ---
HELP_CENTER_URL=
CUSTOMER_SUPPORT_URL=
USE_LOCAL_HELP=true
```

| Variable              | Purpose                                                        | Default |
|-----------------------|---------------------------------------------------------------|---------|
| `HELP_CENTER_URL`     | Page the Help row opens (when not using the bundled screen)   | empty   |
| `CUSTOMER_SUPPORT_URL`| Adds a "Customer support" row that opens this page            | empty   |
| `USE_LOCAL_HELP`      | `true` → Help row opens the bundled help screen               | `true`  |

## Relative vs. absolute URLs

Both URLs may be **absolute** or **relative**:

- **Absolute** (`https://carento.com/contact`): Used as-is.
- **Relative** (`/contact`): Resolved against your backend site URL (`API_BASE_URL`). For example, with `API_BASE_URL=https://carento.com` and `HELP_CENTER_URL=/help`, the app opens `https://carento.com/help`.

Resolution is handled by `resolveUrl()` in `src/config/app.ts`.

## How the "Help & support" row behaves

The Help row logic lives in `app/(tabs)/profile.tsx`:

- When **`USE_LOCAL_HELP=false` and `HELP_CENTER_URL` is set**, the Help row opens that page in the in-app browser (`app/web-view.tsx`). This is a `WebView` with loading and error/retry states.
- **Otherwise** (the default, `USE_LOCAL_HELP=true`, or no `HELP_CENTER_URL`), the Help row opens the **bundled help screen** (`app/account/help.tsx`). This has native "Call support" / "Email us" links, a Frequently Asked section, and a contact form wired to the backend contact plugin.

## The "Customer support" row

`CUSTOMER_SUPPORT_URL` is independent of the Help row. When it is set, a
**"Customer support"** row appears inside the bundled help screen
(`app/account/help.tsx`) and opens the configured page in the in-app browser
(`app/web-view.tsx`). When it is empty, no such row is shown.

## Worked examples

### Default: bundled help, no extra row

```bash
USE_LOCAL_HELP=true
HELP_CENTER_URL=
CUSTOMER_SUPPORT_URL=
```

Help row → bundled help screen. No "Customer support" row.

### Web help center, hosted on your Botble site (relative URL)

```bash
API_BASE_URL=https://carento.com
USE_LOCAL_HELP=false
HELP_CENTER_URL=/help-center
```

Help row → opens `https://carento.com/help-center` in the in-app browser.

### Bundled help plus a customer-support page

```bash
USE_LOCAL_HELP=true
CUSTOMER_SUPPORT_URL=https://support.carento.com
```

Help row → bundled help screen, which now shows a "Customer support" row that
opens `https://support.carento.com` in the in-app browser.

### Everything web-based

```bash
API_BASE_URL=https://carento.com
USE_LOCAL_HELP=false
HELP_CENTER_URL=/contact
CUSTOMER_SUPPORT_URL=/support
```

Help row → `https://carento.com/contact`. The bundled screen (reachable when it
is shown) also exposes a "Customer support" row → `https://carento.com/support`.

## Applying changes

`.env` values are read at bundle time, so after editing any of these variables:

1. Stop Metro.
2. Restart with `npx expo start -c` (a clean start guarantees the new values are
   picked up).

Hot reload does not apply `.env` changes.
