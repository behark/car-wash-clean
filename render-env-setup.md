# Render Environment Variables Setup

## Project: Car Wash Booking System

Copy these environment variables to your Render.com service dashboard:

### Required Variables
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://car-wash-clean.onrender.com
NEXT_PUBLIC_SANITY_PROJECT_ID=j2t31xge
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skVALaMvvJIxP9krYTpB6SYM6XgH3fe60cDRTpVg05znY5DlDGIx1LvUMre94xah8O1bk6ZIiz5QwNz7aA6B5XisFj8mWid17JAgnWh5tuncOehX5gsYt2oNpVxfpS9xsa1YWxHCjMUxkwGeeH9bynKZGz5OQFwIeNARmmN3ajJCCEfgMUiO
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=512
```

### Email Configuration (Required for booking notifications)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail-address@gmail.com
SMTP_PASSWORD=your-gmail-app-password
SMTP_FROM=your-gmail-address@gmail.com
```

### Setup Instructions
1. **Gmail App Password Setup** (if using Gmail):
   - Enable 2-factor authentication on your Gmail account
   - Generate an App Password at: https://myaccount.google.com/apppasswords
   - Use the generated password as SMTP_PASSWORD

2. **Render Dashboard Setup**:
   - Login to Render.com dashboard
   - Navigate to your car-wash-clean service
   - Go to Environment tab
   - Add each variable individually using the key-value pairs above
   - **IMPORTANT**: Mark SMTP_PASSWORD as "Secret" for security
   - Click "Save Changes"
   - Service will automatically redeploy with new variables

### Alternative Email Providers
If not using Gmail, update these values accordingly:
- **Outlook/Hotmail**: SMTP_HOST=smtp-mail.outlook.com, SMTP_PORT=587
- **Yahoo**: SMTP_HOST=smtp.mail.yahoo.com, SMTP_PORT=587
- **SendGrid**: SMTP_HOST=smtp.sendgrid.net, SMTP_PORT=587