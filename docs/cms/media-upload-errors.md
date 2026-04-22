# Media Upload Errors

When a media upload fails in **Admin → Media**, Botble now reports the exact PHP-level reason instead of a generic "The file failed to upload." message. Use this page to map the message you see to the fix.

## How the error codes map

PHP reports one of the `UPLOAD_ERR_*` codes for every failed upload, before any Laravel/Botble code runs. The table below lists each code, what Botble shows to the admin user, the real cause, and how to fix it.

| PHP error code | Message shown in Botble | Cause | Fix |
| --- | --- | --- | --- |
| `UPLOAD_ERR_INI_SIZE` (1) | "The file is larger than the server's **X MB** upload limit…" | File exceeds PHP's `upload_max_filesize` | Raise `upload_max_filesize` and `post_max_size` in `php.ini` (or via hosting panel). `post_max_size` must be ≥ `upload_max_filesize`. |
| `UPLOAD_ERR_FORM_SIZE` (2) | "The file exceeds the form's maximum upload size." | File exceeds form-level `MAX_FILE_SIZE` | Unusual in Botble — usually indicates a bespoke form. Raise the hidden `MAX_FILE_SIZE` field. |
| `UPLOAD_ERR_PARTIAL` (3) | "The file was only partially uploaded…" | Connection dropped mid-upload | Retry. If it keeps failing, check the network/proxy and raise `max_input_time`. |
| `UPLOAD_ERR_NO_FILE` (4) | "Please select a file to upload." | Form submitted with no file | User error — pick a file first. |
| `UPLOAD_ERR_NO_TMP_DIR` (6) | "Server cannot save the uploaded file because PHP's temporary upload directory (upload_tmp_dir) is missing or not writable…" | PHP-FPM cannot write to `upload_tmp_dir` (usually `/tmp`) | See [Fix for UPLOAD_ERR_NO_TMP_DIR](#fix-for-upload-err-no-tmp-dir) below. |
| `UPLOAD_ERR_CANT_WRITE` (7) | "Server could not write the uploaded file to disk…" | Disk full, bad permissions, or tmp dir unwritable | Check disk quota, folder permissions on `upload_tmp_dir`, and that the web user owns it. |
| `UPLOAD_ERR_EXTENSION` (8) | "A PHP extension (such as ModSecurity or a security plugin) blocked the upload." | ModSecurity, imunify360, or similar blocked the request | Disable the blocking rule, or whitelist the upload endpoint. |

## Fix for `UPLOAD_ERR_NO_TMP_DIR`

This is the most common media-upload failure on shared hosting, especially on cPanel / CloudLinux / CageFS setups where `/tmp` is a jailed or missing bind-mount for the PHP-FPM pool.

### 1. Diagnose

Upload a PHP file like the one below to `public/upload-check.php` (and delete it after use). Access it with `?token=<your-value>` and submit the test upload. The page shows the exact `UPLOAD_ERR_*` code plus the tmp-dir state.

```php
<?php
const TOKEN = 'CHANGE-ME';
if (($_GET['token'] ?? '') !== TOKEN) { http_response_code(403); exit('Forbidden.'); }

$uploadTmpDir = ini_get('upload_tmp_dir') ?: sys_get_temp_dir();
$probe = rtrim($uploadTmpDir, '/') . '/botble_probe_' . bin2hex(random_bytes(4));
$write = @file_put_contents($probe, 'ok');
@unlink($probe);

echo '<pre>';
echo "upload_tmp_dir (ini): " . (ini_get('upload_tmp_dir') ?: '(empty)') . "\n";
echo "sys_get_temp_dir():   " . sys_get_temp_dir() . "\n";
echo "effective tmp dir:    " . $uploadTmpDir . "\n";
echo "is_writable:          " . (is_writable($uploadTmpDir) ? 'YES' : 'NO') . "\n";
echo "live write probe:     " . ($write !== false ? 'OK' : 'FAILED: ' . (error_get_last()['message'] ?? '')) . "\n\n";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['f'])) {
    echo "test upload error code: " . $_FILES['f']['error'] . "\n";
    echo "tmp_name:               " . ($_FILES['f']['tmp_name'] ?: '(empty)') . "\n";
}
echo '</pre>';
?>
<form method="post" enctype="multipart/form-data">
  <input type="file" name="f"><button>Upload</button>
</form>
```

### 2. Interpret

| What the probe shows | What it means |
| --- | --- |
| `is_writable: YES` + `live write probe: OK` | The tmp dir is fine. `UPLOAD_ERR_NO_TMP_DIR` is not from this directory — check `open_basedir` and `disable_functions`. |
| `is_writable: YES` + `live write probe: FAILED` | CageFS / chroot / bind-mount issue. PHP-FPM cannot actually write despite the permission bits. See step 3. |
| `is_writable: NO` | The tmp dir doesn't exist, is owned by another user, or is read-only. See step 3. |

### 3. Fix on cPanel hosting

1. **Create a user-owned tmp dir**. In File Manager, create `/home/<your-user>/tmp` and set permissions to `700` (or via SSH: `mkdir -p /home/<your-user>/tmp && chmod 700 /home/<your-user>/tmp`).

2. **Try the cPanel MultiPHP INI Editor**. Open **cPanel → Software → MultiPHP INI Editor → Editor mode → select your domain**, then add:
   ```ini
   upload_tmp_dir = /home/<your-user>/tmp
   sys_temp_dir = /home/<your-user>/tmp
   ```
   Save.

3. **Restart PHP-FPM**. Open **cPanel → Software → MultiPHP Manager**, tick your domain, change the PHP version (e.g. from 8.3 to 8.1 → Apply → back to 8.3 → Apply). This forces the FPM pool to reload.

4. **Re-run the diagnostic**. If `upload_tmp_dir (ini)` is still `(empty)` after the restart, your hosting is using PHP-FPM in a way that ignores the per-domain INI. `upload_tmp_dir` is a `PHP_INI_SYSTEM` directive — it can only be set in the master `php.ini` or the FPM pool config, not in `.user.ini` or `.htaccess`. In that case go to step 5.

5. **Open a ticket with your hosting provider** (template):

   > My PHP-FPM pool cannot write to `/tmp`. Uploads fail with `UPLOAD_ERR_NO_TMP_DIR`. `file_put_contents('/tmp/test')` from PHP-FPM returns "Failed to open stream: No such file or directory", even though `is_writable('/tmp')` returns `true` — looks like a broken CageFS / private-tmp mount for my pool.
   >
   > I've created `/home/<your-user>/tmp` (perms 700, owner `<your-user>`). Please either:
   >
   > 1. Add these lines to my FPM pool config and restart PHP-FPM:
   >    ```ini
   >    php_admin_value[upload_tmp_dir] = /home/<your-user>/tmp
   >    php_admin_value[sys_temp_dir]   = /home/<your-user>/tmp
   >    ```
   > 2. Or fix the `/tmp` mount for my PHP-FPM pool.

### 4. Verify

After the fix, the diagnostic page should show `upload_tmp_dir (ini)` = `/home/<your-user>/tmp` and `live write probe: OK`. Botble's admin media upload will work without any application-side change.

## Related

- [Installation requirements](/cms/installation-requirements)
- [Media overview](/cms/media)
- [Troubleshooting](/cms/troubleshooting)
