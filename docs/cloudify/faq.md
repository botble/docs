# Frequent Questions

## Image uploaded successful but doesn't display

Make sure you have done following steps:

- Make sure `APP_URL` in `.env` is correct.
- Make sure PHP extension `GD` or `Imagick` is enabled.
- Chmod folder `public/storage` to make it writeable.
- Go to `Settings` -> `Media` and set `Driver` to **Local**.
