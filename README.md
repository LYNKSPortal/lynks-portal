# LYNKS - Global IT & Marketing Solutions

A modern, professional website for LYNKS, a global IT and marketing company offering comprehensive digital services including web development, mobile apps, social media management, PPC, design, photography, and videography.

## 🚀 Features

- **Modern Design**: Sleek, professional UI with gradient accents and smooth animations
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **Dark Mode Support**: Automatic dark mode based on user preferences
- **Service Showcase**: Comprehensive pages for all services offered
- **Portfolio Section**: Beautiful gallery showcasing completed projects
- **Contact Form**: Interactive contact form for client inquiries
- **SEO Optimized**: Built with Next.js for optimal performance and SEO
- **TypeScript**: Fully typed for better development experience

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono
- **Image Optimization**: Next.js Image component

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd lynks
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
lynks/
├── app/
│   ├── about/          # About page
│   ├── contact/        # Contact page with form
│   ├── portfolio/      # Portfolio showcase
│   ├── services/       # Services overview
│   ├── layout.tsx      # Root layout with navbar & footer
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
└── public/             # Static assets
```

## 🎨 Pages

- **Home** (`/`): Hero section, service overview, stats, and CTA
- **Services** (`/services`): Detailed breakdown of all services offered
- **Portfolio** (`/portfolio`): Project showcase with filtering
- **About** (`/about`): Company story, values, team, and stats
- **Contact** (`/contact`): Contact form and information

## 🌐 Services Offered

1. **Web Development**: Custom websites, e-commerce, CMS integration
2. **App Development**: Native and cross-platform mobile applications
3. **Social Media**: Content strategy, management, and advertising
4. **PPC & Design**: Google Ads, Meta Ads, brand design
5. **Photography**: Product, corporate, event, lifestyle photography
6. **Videography**: Commercial, corporate, social media video production

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/lynks)

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Railway
- Render

## 🎨 Customization

### Colors

The project uses a gradient color scheme (blue to purple). To customize:
- Edit Tailwind classes in components
- Modify CSS variables in `app/globals.css`

### Content

- Update service details in `app/services/page.tsx`
- Modify portfolio projects in `app/portfolio/page.tsx`
- Change company information in `app/about/page.tsx`
- Update contact details in `components/Footer.tsx` and `app/contact/page.tsx`

### Images

Replace placeholder images from Unsplash with your own:
- Add images to `/public` folder
- Update image paths in components

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

This is a custom project for LYNKS. For modifications or updates, please contact the development team.

## 📄 License

Copyright © 2026 LYNKS. All rights reserved.

## 📞 Support

For questions or support, contact:
- Email: hello@lynks.com
- Phone: +1 (234) 567-890

---

Built with ❤️ by LYNKS
