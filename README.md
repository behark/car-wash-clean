# Car Wash Clean - Simplified Car Wash Website

A clean, modern car wash website built with Next.js 14 and Sanity CMS.

## 🎯 Project Overview

This is a simplified version of the car wash booking system, focusing on essential features:

- **Clean Architecture**: Reduced from 68 to ~20 dependencies
- **Modern Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **Content Management**: Sanity CMS integration
- **Performance**: Optimized for speed and SEO
- **Mobile-First**: Responsive design

## 🚀 Features

- ✅ Modern responsive design
- ✅ Service catalog with pricing
- ✅ Customer testimonials
- ✅ Contact information
- ✅ Sanity CMS integration
- ✅ SEO optimized
- ✅ Mobile-first approach

## 🛠️ Tech Stack

**Core:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React 18

**CMS & Data:**
- Sanity CMS
- Mock data fallback

**Utilities:**
- Lucide React (icons)
- Date-fns (date handling)
- Zod (validation)
- Nodemailer (email)

## 📦 Dependencies Comparison

| Category | Original | Clean Version | Reduction |
|----------|----------|---------------|-----------|
| Total Dependencies | 68 | ~20 | 70% |
| Production | 37 | 13 | 65% |
| Development | 31 | 7 | 77% |

**Removed Dependencies:**
- AWS SDK, Stripe, Sentry (enterprise features)
- Prisma, Redis (database complexity)
- Socket.io, PWA (real-time features)
- Extensive testing frameworks

**Kept Dependencies:**
- Next.js, React, TypeScript (core)
- Tailwind CSS (styling)
- Sanity CMS (content management)
- Essential utilities (date-fns, zod, nodemailer)

## 🏗️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Sanity credentials
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/         # React components
│   ├── Header.tsx      # Navigation
│   └── Footer.tsx      # Footer
└── lib/               # Utilities
    ├── siteConfig.ts  # Site configuration
    ├── sanity.ts      # Sanity CMS client
    └── mockData.ts    # Fallback data
```

## 🎨 Sanity CMS Setup

1. Create a new Sanity project at [sanity.io](https://sanity.io)
2. Set up schemas for:
   - Services (title, description, price, duration, etc.)
   - Testimonials (name, content, rating, etc.)
3. Add your project credentials to `.env.local`

## 🚀 Deployment

This project can be deployed to:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Any platform supporting Node.js**

## 📊 Performance Benefits

- **Faster builds**: Reduced dependency tree
- **Smaller bundle**: Essential packages only
- **Better maintainability**: Simpler codebase
- **Easier debugging**: Less complexity
- **Cost effective**: Reduced infrastructure needs

## 🔧 Next Steps

To extend this project:

1. **Add Sanity Studio**: Content management interface
2. **Implement booking**: Simple form-based booking system
3. **Add analytics**: Google Analytics integration
4. **Email integration**: Contact form functionality
5. **Gallery**: Image gallery for before/after photos

## 📝 Notes

This clean version maintains all essential business functionality while removing enterprise-level complexity. Perfect for small to medium car wash businesses that need a professional web presence without over-engineering.# Deployed on Vercel
