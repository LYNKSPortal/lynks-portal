# Cloudinary Setup Instructions

## Environment Variables Needed

Add these to your `.env.local` file:

```bash
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## How to Get Your Cloudinary Credentials

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Sign in or create a free account
3. On the dashboard, you'll see:
   - **Cloud Name** (e.g., "dxxxxx")
   - **API Key** (e.g., "123456789012345")
   - **API Secret** (click "Reveal" to see it)

## Using Cloudinary in Your Project

### Option 1: Using CldImage Component (Recommended)

```tsx
import { CldImage } from 'next-cloudinary';

<CldImage
  src="your-image-public-id"
  width={800}
  height={600}
  alt="Description"
  crop="fill"
  gravity="auto"
/>
```

### Option 2: Upload Images via API

```typescript
import cloudinary from '@/lib/cloudinary';

// Upload an image
const result = await cloudinary.uploader.upload(file, {
  folder: 'portfolio',
  transformation: [
    { width: 1200, height: 800, crop: 'fill' },
    { quality: 'auto' },
    { fetch_format: 'auto' }
  ]
});
```

## Benefits

- **Automatic compression** - Reduces image file sizes by up to 80%
- **Format optimization** - Serves WebP/AVIF to supported browsers
- **Responsive images** - Automatically serves the right size
- **CDN delivery** - Fast global image delivery
- **Transformations** - Resize, crop, and optimize on-the-fly
