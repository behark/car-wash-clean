# Twilio WhatsApp Integration Setup

This guide will help you set up Twilio WhatsApp Business API for sending booking confirmations.

## Prerequisites

1. A Twilio account ([sign up here](https://www.twilio.com/try-twilio))
2. WhatsApp Business API access through Twilio
3. A verified phone number for your business

## Step 1: Create Twilio Account and Get Credentials

1. Sign up for a Twilio account
2. Go to your [Twilio Console](https://console.twilio.com/)
3. Find your **Account SID** and **Auth Token** in the dashboard
4. Add these to your `.env.local` file:

```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
```

## Step 2: Set Up WhatsApp Business API

1. In Twilio Console, go to **Messaging** > **Try it out** > **Send a WhatsApp message**
2. Follow the setup process to activate WhatsApp for your account
3. You'll get a Twilio WhatsApp number (usually starts with +1415)
4. Add this to your `.env.local`:

```env
TWILIO_WHATSAPP_FROM=+14155238886
```

## Step 3: Configure Business WhatsApp Number

1. Add your business WhatsApp number to receive internal notifications:

```env
BUSINESS_WHATSAPP_NUMBER=+358401234567
```

## Step 4: Test the Integration

1. Make sure all environment variables are set in `.env.local`
2. Restart your development server: `npm run dev`
3. Test a booking through the website
4. Check that WhatsApp messages are sent to both customer and business numbers

## Environment Variables Summary

Add these to your `.env.local` file:

```env
# Twilio WhatsApp Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_FROM=+14155238886
BUSINESS_WHATSAPP_NUMBER=+358401234567
```

## Message Format

The system sends two types of messages:

### Customer Confirmation Message
- Booking details (service, date, time, price)
- Customer information
- Special requests (if any)
- Instructions (arrive 5 minutes early, bring keys, etc.)

### Business Notification Message
- New booking alert
- Customer contact details
- Service and timing information
- Special requests

## Troubleshooting

### Common Issues:

1. **"Invalid phone number" error**
   - Ensure phone numbers are in international format (e.g., +358401234567)
   - Remove any spaces or special characters

2. **"Authentication failed" error**
   - Double-check your TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN
   - Make sure there are no extra spaces in the environment variables

3. **"WhatsApp number not enabled" error**
   - Complete the WhatsApp Business API setup in Twilio Console
   - Verify your WhatsApp sandbox is active

4. **Messages not being delivered**
   - Check if recipient numbers are verified in Twilio sandbox
   - For production, ensure you have approved message templates

## Production Considerations

1. **Message Templates**: For production, you'll need to create and get approval for WhatsApp message templates
2. **Phone Number Verification**: Recipients may need to opt-in to receive messages
3. **Rate Limits**: Be aware of Twilio's rate limits for WhatsApp messages
4. **Costs**: Check Twilio's pricing for WhatsApp messages in your region

## Support

- [Twilio WhatsApp Documentation](https://www.twilio.com/docs/whatsapp)
- [Twilio Support](https://support.twilio.com/)