# Public Assets Directory

This directory contains static assets that will be served directly by the web server.

## Directory Structure

- `/images/` - Store all image files (PNG, JPG, SVG, etc.)
- `/assets/` - Store other static assets (documents, videos, etc.)
- `/icons/` - Store icon files and favicons

## Usage

Files in this directory can be referenced in your code using absolute paths:

```jsx
// Example: Using an image from public/images/
<img src="/images/logo.png" alt="Logo" />

// Example: Using an icon from public/icons/
<link rel="icon" href="/icons/favicon.ico" />

// Example: Using an asset from public/assets/
<a href="/assets/brochure.pdf" download>Download Brochure</a>
```

## Best Practices

1. **Optimize images** before adding them to reduce file sizes
2. **Use descriptive filenames** (e.g., `hero-background.jpg` instead of `img1.jpg`)
3. **Organize by category** within subdirectories if needed
4. **Consider using WebP format** for better compression
5. **Include alt text** for accessibility when using images

## Supported File Types

- **Images**: PNG, JPG, JPEG, SVG, WebP, GIF
- **Icons**: ICO, PNG, SVG
- **Documents**: PDF, DOC, DOCX
- **Videos**: MP4, WebM
- **Other**: Any static file type

## File Size Recommendations

- **Hero images**: < 500KB
- **Thumbnails**: < 100KB
- **Icons**: < 50KB
- **Documents**: < 10MB