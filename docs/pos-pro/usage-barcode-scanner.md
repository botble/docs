# Barcode Scanner

The POS Pro plugin includes a powerful barcode scanning feature that allows you to quickly search for products by scanning their barcodes. This feature supports both camera-based scanning using your device's camera and hardware barcode scanners connected to your computer.

## Overview

The barcode scanner feature in POS Pro offers:

- Camera-based scanning using your device's built-in camera
- Support for external USB barcode scanners
- Recognition of multiple barcode formats (1D and 2D)
- Automatic product search when a barcode is detected

## Using the Camera-Based Scanner

The camera-based scanner uses your device's camera to scan barcodes directly from the POS interface.

### Accessing the Scanner

1. In the POS interface, locate the barcode icon button next to the search bar
2. Click the barcode icon to open the camera scanner
3. If this is your first time using the scanner, your browser will ask for permission to access your camera
4. Grant camera access permission when prompted

### Scanning a Barcode

1. Once the scanner is open, position the product barcode within the camera view
2. Hold the barcode steady in front of the camera
3. A red scanning line will move across the screen, indicating the scanner is active
4. When a barcode is successfully detected, you'll see a success notification
5. The product matching the barcode will automatically be searched and displayed

### Camera Selection

If your device has multiple cameras:

1. A dropdown menu will appear below the scanner
2. Select the camera you want to use (typically the rear/back camera works best for barcode scanning)
3. The scanner will automatically switch to the selected camera

## Using a Hardware Barcode Scanner

POS Pro also supports external USB barcode scanners, which typically emulate keyboard input.

### Setting Up a Hardware Scanner

1. Connect your USB barcode scanner to your computer
2. Most barcode scanners work as "plug and play" devices and don't require additional drivers
3. Ensure your scanner is configured to add an "Enter" keystroke after each scan (this is the default for most scanners)

### Scanning Products

1. Place your cursor in the search box in the POS interface
2. Scan a product barcode using your hardware scanner
3. The scanner will input the barcode and automatically trigger a search
4. The product matching the barcode will be displayed in the results

## Supported Barcode Formats

POS Pro supports a wide range of barcode formats, including:

### 1D Product Barcodes
- UPC-A
- UPC-E
- EAN-8
- EAN-13
- UPC/EAN extensions

### 1D Industrial Barcodes
- Code 39
- Code 128
- Code 93
- Codabar
- ITF

### 2D Barcodes
- QR Code
- Data Matrix
- Aztec
- PDF 417

## Troubleshooting

### Camera Access Issues

If you're having trouble with camera access:

1. **Permission Denied**: If your browser shows "Camera permission denied":
   - Click the lock/info icon in your browser's address bar
   - Ensure camera permissions are set to "Allow"
   - Refresh the page and try again

2. **No Camera Detected**: If you see "No camera found":
   - Ensure your device has a working camera
   - Try using a different browser
   - Check if other applications are currently using the camera

3. **Browser Compatibility**: The camera scanner works best with:
   - Google Chrome
   - Microsoft Edge
   - Safari (on macOS/iOS)
   - Firefox (may require permission settings adjustment)

### Hardware Scanner Issues

If your hardware scanner isn't working properly:

1. **Scanner Not Detected**: 
   - Ensure the scanner is properly connected
   - Try a different USB port
   - Check if the scanner needs to be charged or powered on

2. **Scans Not Registering**:
   - Make sure the cursor is focused in the search box
   - Check if your scanner is configured to add an Enter keystroke after scanning
   - Try scanning into a text editor to verify the scanner is working correctly

3. **Incorrect Scans**:
   - Clean the scanner lens
   - Ensure the barcode is not damaged or printed with low quality
   - Try adjusting the distance between the scanner and the barcode

## Best Practices

For optimal barcode scanning performance:

1. **Good Lighting**: Ensure the barcode is well-lit, especially when using the camera scanner
2. **Steady Position**: Hold the barcode steady when using the camera scanner
3. **Proper Distance**: Position the barcode at an appropriate distance from the scanner
4. **Clean Barcodes**: Ensure barcodes are clean and undamaged
5. **Focus on Search Box**: When using a hardware scanner, always ensure the cursor is in the search box

## Adding Barcodes to Products

To make the most of the barcode scanning feature, ensure your products have barcodes assigned:

1. Go to Products in your admin panel
2. Edit the product you want to add a barcode to
3. Find the "Barcode" field and enter the product's barcode
4. Save the product

Once barcodes are assigned, you can quickly find products by scanning their barcodes in the POS interface.
