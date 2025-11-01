# 🚀 Vercel Deployment Guide - Car Wash Clean

## ✅ Pre-Deployment Checklist

Your project has been optimized for Vercel deployment! Here's what was updated:

- ✅ Removed `output: 'standalone'` from next.config.js (Render-specific)
- ✅ Removed aggressive memory optimizations (unnecessary on Vercel)
- ✅ Simplified webpack configuration
- ✅ Enabled Vercel's image optimization
- ✅ Fixed build scripts (removed NODE_OPTIONS memory limits)
- ✅ Added Vercel-specific domains to image remotePatterns
- ✅ Created vercel.json with security headers and caching

## 📋 Step-by-Step Deployment

### 1. Push to Git Repository

```bash
cd "/home/behar/Desktop/New Folder/car-wash-clean"
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Vercel will auto-detect Next.js - keep default settings
5. **DO NOT deploy yet** - configure environment variables first

### 3. Configure Environment Variables

In Vercel Project Settings → Environment Variables, add:

#### Required Variables:

```bash
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=j2t31xge
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Email (SMTP for booking notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
SMTP_FROM=noreply@carwashclean.com
```

#### Optional but Recommended:

```bash
# Twilio for SMS notifications (optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Analytics
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Performance
NEXT_TELEMETRY_DISABLED=1
```

### 4. Deploy!

Click **"Deploy"** in Vercel dashboard.

Build time: ~1-2 minutes

### 5. Post-Deployment Steps

#### Update Sanity CORS Settings:
1. Go to [sanity.io/manage](https://manage.sanity.io)
2. Select your project (j2t31xge)
3. Go to **API** → **CORS Origins**
4. Add your Vercel domain: `https://your-domain.vercel.app`
5. Check "Allow credentials"

#### Update Site URL:
1. After first deployment, copy your Vercel URL
2. Update `NEXT_PUBLIC_SITE_URL` in environment variables
3. Redeploy (or it will auto-redeploy)

#### Test Your Deployment:
- [ ] Homepage loads correctly
- [ ] Images display properly (Unsplash & Sanity)
- [ ] Services page shows all services
- [ ] Booking form works
- [ ] Contact form works
- [ ] Email notifications arrive
- [ ] Admin dashboard accessible

## 🔧 Custom Domain Setup (Optional)

1. In Vercel project settings → **Domains**
2. Add your custom domain (e.g., `carwashclean.com`)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_SITE_URL` to use custom domain
5. Update Sanity CORS to include custom domain

## 📧 Email Configuration

### Gmail Setup (Recommended for Testing):

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use this password for `SMTP_PASSWORD`

### Production Email (SendGrid/Mailgun):

For production, consider using:
- **SendGrid** (100 emails/day free)
- **Mailgun** (First 5,000 emails free)
- **Amazon SES** (Very cheap, high volume)

## 📱 Twilio SMS Setup (Optional)

1. Sign up at [twilio.com](https://twilio.com)
2. Get a phone number
3. Copy Account SID and Auth Token
4. Add to environment variables
5. Customers will receive SMS confirmations for bookings

## ⚡ Performance Tips

### Enable Vercel Analytics:
```bash
npm install @vercel/analytics
```

Then add to `src/app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

// Add before closing </body> tag
<Analytics />
```

### Enable Vercel Speed Insights:
```bash
npm install @vercel/speed-insights
```

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

<SpeedInsights />
```

## 🐛 Troubleshooting

### Build Fails?
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Try building locally: `npm run build`

### Images Not Loading?
- Verify remote image domains in `next.config.js`
- Check Sanity CDN URLs (cdn.sanity.io)
- Verify Unsplash images are accessible

### Email Not Sending?
- Verify SMTP credentials
- Check Gmail App Password (not regular password)
- Look at Vercel function logs for errors
- Test with a simple SMTP tester

### API Routes Timing Out?
- Default timeout is 10s (set in vercel.json)
- For Pro plans, can increase to 60s
- Check function logs in Vercel dashboard

## 📊 Monitoring

### Vercel Dashboard:
- Real-time logs
- Function execution times
- Bandwidth usage
- Error tracking

### Set Up Alerts:
1. Go to project settings → **Notifications**
2. Enable deployment notifications
3. Enable error notifications

## 🔒 Security Checklist

- ✅ Security headers configured in vercel.json
- ✅ Environment variables properly set (not in code)
- ✅ CORS configured in Sanity
- ✅ SMTP credentials secured
- ⚠️ Consider rate limiting on booking API
- ⚠️ Consider adding reCAPTCHA to forms

## 💰 Pricing Considerations

**Vercel Free Tier Includes:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- Edge Functions
- Preview deployments
- **Perfect for small car wash businesses!**

**May Need Pro Plan For:**
- Higher bandwidth (>100GB/month)
- Longer function timeouts (>10s)
- Advanced analytics
- Team collaboration
- Custom deployment protection

## 🆘 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Sanity Docs**: [sanity.io/docs](https://sanity.io/docs)
- **Vercel Support**: [vercel.com/support](https://vercel.com/support)

---

## 📝 Migration Notes from Render

### What Changed:

1. **No more memory limits** - Vercel handles this automatically
2. **No standalone build** - Vercel uses its own optimization
3. **Better image optimization** - Automatic AVIF/WebP conversion
4. **Faster deployments** - ~1-2 min vs 5-10 min on Render
5. **Global CDN** - Better performance worldwide
6. **Preview deployments** - Every PR gets its own URL

### Performance Improvements:

- 🚀 **Build Time**: 5-10 min → 1-2 min
- 🌍 **Global CDN**: Faster page loads worldwide
- 📸 **Image Optimization**: Automatic format conversion
- ⚡ **Cold Starts**: None (vs frequent on Render free tier)

---

**Last Updated**: November 1, 2025
**Next.js Version**: 15.5.4
**Vercel Compatible**: ✅

## Quick Deploy Command

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy from terminal
vercel --prod
```

---

## 🎉 Benefits Over Render

| Feature | Render (Free) | Vercel (Free) |
|---------|---------------|---------------|
| Memory | 512MB (strict) | Dynamic (generous) |
| Build Time | 5-10 min | 1-2 min |
| Cold Starts | Frequent | None |
| CDN | Limited | Global Edge Network |
| Preview Deploys | No | Yes |
| Image Optimization | Manual | Automatic |
| Bandwidth | Limited | 100GB/month |
| SSL | Yes | Yes |
| Custom Domains | Yes | Yes |

Good luck with your deployment! 🚀
