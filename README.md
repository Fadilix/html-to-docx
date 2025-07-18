# HTML to DOCX Utility

A TypeScript utility for converting HTML content to DOCX documents with Tailwind CSS support and image handling.

## Features

- 🔄 Convert HTML elements to DOCX format
- 🎨 Automatic Tailwind CSS class to inline style conversion
- 🖼️ Image processing and embedding as base64
- 📄 Customizable document options (orientation, margins)
- 💾 Automatic file download using FileSaver.js

## Installation

```bash
# Using pnpm (recommended)
pnpm install

# Using npm
npm install

# Using yarn
yarn install
```

## Dependencies

- `html-docx-js-typescript` - Core HTML to DOCX conversion
- `file-saver` - Client-side file saving functionality

## Usage

### Basic Usage

```typescript
import { generateDocx } from './docx';

// Convert an HTML element with ID 'myContent' to DOCX
await generateDocx('myContent', 'my-document');
```

### HTML Structure

The utility works with any HTML element, but it's particularly optimized for document-like structures:

```html
<div id="document-content" class="w-a4 p-page">
  <h1 class="text-xl font-bold text-center mb-4">Document Title</h1>
  <p class="mb-4">Your document content here...</p>
  <img src="/assets/your_image.png" alt="Your alt" width="100" height="100">
</div>
```

## Supported Tailwind Classes (some classes may not be supported)

The utility automatically converts the following Tailwind CSS classes to inline styles:

### Typography

- `text-xl` → `font-size: 1.25rem;`
- `text-center` → `text-align: center;`
- `font-bold` → `font-weight: 700;`

### Colors

- `text-white` → `color: #ffffff;`
- `text-green-500` → `color: #10b981;`
- `text-blue-500` → `color: #3b82f6;`
- `bg-gray-200` → `background-color: #e5e7eb;`

### Spacing

- `mt-4`, `mb-4` → `margin-top: 1rem;`, `margin-bottom: 1rem;`
- `ml-2` → `margin-left: 0.5rem;`
- `p-2` → `padding: 0.5rem;`
- `p-page` → `padding: 1rem;`
- `m-page` → `margin: 1rem;`
- `mx-auto` → `margin-left: auto; margin-right: auto;`

### Layout

- `flex` → `display: flex;`
- `flex-col` → `flex-direction: column;`
- `items-center` → `align-items: center;`
- `justify-start` → `justify-content: flex-start;`
- `justify-center` → `justify-content: center;`

### Dimensions

- `w-a4` → `width: 793.7px;` (A4 width)
- `h-a4` → `height: 1122.5px;` (A4 height)
- `w-[1000px]` → `width: 1000px;`
- `w-[50%]` → `width: 50%;`
- `h-[100vh]` → `height: 100vh;`
- `max-w-page` → `max-width: 793.7px;`
- `max-h-page` → `max-height: 1122.5px;`

### Borders

- `border` → `border: 1px solid #000;`
- `border-collapse` → `border-collapse: collapse;`
- `border-spacing-0` → `border-spacing: 0;`
- `border-1` → `border-width: 1px;`
- `border-solid` → `border-style: solid;`
- `border-black` → `border-color: #000;`
- `rounded` → `border-radius: 0.25rem;`

## Image Handling

The utility automatically processes images and converts them to base64 format for embedding in the DOCX file:

- Images are converted to PNG format
- Supports custom width and height
- Cross-origin images are handled with CORS
- Images are centered in the document

## Document Options

The generated DOCX document uses the following default settings:

```typescript
const options = {
  orientation: "portrait" as const,
  margins: { 
    top: 100, 
    bottom: 100, 
    left: 100, 
    right: 100 
  },
};
```

## API Reference

### `generateDocx(elementId: string, filename: string): Promise<void>`

Converts an HTML element to a DOCX document and triggers download.

**Parameters:**

- `elementId` (string): The ID of the HTML element to convert
- `filename` (string): The desired filename (without extension)

**Returns:**

- `Promise<void>`: Resolves when the conversion and download are complete

### `convertClassesToInline(htmlContent: string): string`

Converts Tailwind CSS classes to inline styles.

**Parameters:**

- `htmlContent` (string): HTML content with Tailwind classes

**Returns:**

- `string`: HTML content with inline styles

### `getBase64Image(imgUrl: string, width: number, height: number): Promise<string>`

Converts an image to base64 format.

**Parameters:**

- `imgUrl` (string): URL of the image to convert
- `width` (number): Desired width of the image
- `height` (number): Desired height of the image

**Returns:**

- `Promise<string>`: Base64-encoded image data

## Error Handling

The utility includes error handling for:

- Missing HTML elements
- Image loading failures
- DOCX generation errors

All errors are logged to the console for debugging.

## Browser Compatibility

This utility requires:

- Modern browsers with Canvas API support
- JavaScript enabled
- Support for Promises and async/await

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Examples

### Simple Document

```html
<div id="invoice" class="w-a4 p-page">
  <h1 class="text-xl font-bold text-center mb-4">Invoice #001</h1>
  <p class="mb-4">Date: 2024-01-01</p>
  <table class="border-collapse border border-black mx-auto">
    <tr>
      <th class="border border-black p-2">Item</th>
      <th class="border border-black p-2">Price</th>
    </tr>
    <tr>
      <td class="border border-black p-2">Service</td>
      <td class="border border-black p-2">$100</td>
    </tr>
  </table>
</div>

<script>
// Convert to DOCX
generateDocx('invoice', 'invoice-001');
</script>
```

This will generate a properly formatted DOCX document with all styles converted to inline CSS for maximum compatibility with Microsoft Word.