# Authentication Setup Guide

## Installation

Install the required package for JWT authentication:

```bash
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
```

## Environment Variables

Add the following to your `.env.local` file:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## OTP System (Development Mode)

The current implementation uses a **development OTP system** that:
- Generates a 6-digit OTP
- Logs it to the console
- Returns it in the API response (development only)
- Stores it in MongoDB with 10-minute expiry

### For Production

To integrate with a real SMS service, update `src/app/api/auth/send-otp/route.ts`:

#### Option 1: MSG91 (Free Tier Available)
```typescript
import axios from 'axios'

async function sendSMS(phone: string, otp: string) {
  await axios.post('https://api.msg91.com/api/v5/otp', {
    template_id: 'your_template_id',
    mobile: phone,
    authkey: process.env.MSG91_AUTH_KEY,
    otp: otp
  })
}
```

#### Option 2: Twilio (Trial Credits)
```typescript
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

async function sendSMS(phone: string, otp: string) {
  await client.messages.create({
    body: `Your BR Handlooms OTP is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+91${phone}`
  })
}
```

#### Option 3: Fast2SMS (Free Tier)
```typescript
import axios from 'axios'

async function sendSMS(phone: string, otp: string) {
  await axios.get('https://www.fast2sms.com/dev/bulkV2', {
    params: {
      authorization: process.env.FAST2SMS_API_KEY,
      variables_values: otp,
      route: 'otp',
      numbers: phone
    }
  })
}
```

## Features

### ✅ Implemented
- Phone number-based authentication
- OTP generation and verification
- JWT token-based sessions
- User registration with optional name
- Automatic session management
- Login/Logout functionality
- User profile display in navbar

### 🔄 Development Mode
- OTP displayed in console
- OTP returned in API response (for testing)
- No actual SMS sent

### 📱 How It Works

1. **User enters phone number** → OTP sent (logged to console in dev mode)
2. **User enters OTP** → Verified against database
3. **JWT token created** → Stored in HTTP-only cookie
4. **User authenticated** → Can access cart/wishlist
5. **Session persists** → 30 days validity

## Testing

### Development Testing
1. Click "Login" button in navbar
2. Enter phone number (e.g., 7907730095)
3. Check console for OTP (or see it in the modal in dev mode)
4. Enter the OTP
5. Optionally enter your name
6. Click "Verify & Login"

### Production Testing
1. Integrate SMS service (see options above)
2. Remove `devOTP` from API responses
3. Test with real phone numbers
4. Verify SMS delivery

## Security Notes

- JWT tokens are stored in HTTP-only cookies (not accessible via JavaScript)
- OTP expires after 10 minutes
- Tokens expire after 30 days
- Phone numbers are unique (one account per number)
- OTP is cleared from database after successful verification

## Forgot Password

Since we use OTP-based authentication:
- Users can simply request a new OTP anytime
- No traditional password reset needed
- Each login generates a fresh OTP

## Next Steps

1. Install jsonwebtoken package
2. Add JWT_SECRET to .env.local
3. Choose and integrate an SMS service for production
4. Test the authentication flow
5. Update cart/wishlist to require authentication (optional)
