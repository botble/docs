# Running the App

## Development Mode
To run the app in development mode:

1. Make sure you have a device/emulator connected:
   ```bash
   flutter devices
   ```

2. Run the app:
   ```bash
   flutter run
   ```

## Debug Mode
For debugging purposes:
```bash
flutter run --debug
```

## Release Mode (Local Testing)
To test the release version locally:
```bash
flutter run --release
```

## Profile Mode
For performance profiling:
```bash
flutter run --profile
```

## Common Issues and Solutions
1. **Missing Dependencies**
   ```bash
   flutter pub get
   ```

2. **Clean Build**
   ```bash
   flutter clean
   flutter pub get
   flutter run
   ```

3. **Hot Reload/Restart**
   - Press `r` for hot reload
   - Press `R` for hot restart
   - Press `q` to quit
