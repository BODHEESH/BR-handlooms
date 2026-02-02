# Supabase Image Storage Setup Guide

## 🚀 Quick Setup

### 1. Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" 
3. Sign up with GitHub/Google
4. Create new organization (free tier is sufficient)

### 2. Create New Project
1. Click "New Project"
2. Choose organization
3. Set project name: `br-handlooms`
4. Set database password (save it somewhere safe)
5. Choose region (closest to your users)
6. Click "Create new project"

### 3. Create Storage Bucket
1. Go to "Storage" section in Supabase dashboard
2. Click "Create bucket"
3. Bucket name: `product-images`
4. Public bucket: ✅ (make it public)
5. Click "Save"

### 4. Set Up Environment Variables
Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Get these values from:
- **Project URL**: Supabase dashboard → Settings → API → Project URL
- **Anon Key**: Supabase dashboard → Settings → API → anon public
- **Service Role Key**: Supabase dashboard → Settings → API → service_role (secret)

### 5. Install Supabase Client
```bash
npm install @supabase/supabase-js
```

## 📱 Usage Options

### Option 1: Admin Upload Interface
1. Go to: `http://localhost:3000/admin/upload`
2. Upload product images
3. Copy generated URLs
4. Use in Telegram messages

### Option 2: Direct Telegram Images (Advanced)
Update your n8n workflow to:
1. Detect images in Telegram messages
2. Download images from Telegram
3. Upload to Supabase
4. Save URLs to MongoDB

## 🔧 n8n Integration (Option 2)

### Add this to your n8n workflow:

1. **Add Function Node** after "Parse Product Message"
2. **Name**: "Process Telegram Images"
3. **Code**: Use the code in `process-telegram-images.js`

### Set up n8n credentials:
1. Go to n8n → Credentials
2. Add "Header Auth" credential
3. Name: "Supabase"
4. Header Name: "Authorization"
5. Header Value: "Bearer YOUR_SERVICE_ROLE_KEY"

### Update the function with your values:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your service role key
- `BOT_TOKEN`: Your Telegram bot token

## 📋 Telegram Message Format

### With Manual Upload URLs:
```
#NewArrival
Product Name: Kerala Kasavu Saree
Fabric: Pure Cotton
Color: Cream with Gold
Price: ₹3,500
Stock: In Stock
Images: https://your-project.supabase.co/storage/v1/object/public/product-images/products/1234567890-abc123.jpg
#kasavu #traditional #cotton
```

### With Direct Image Upload:
1. Send image to Telegram bot
2. Send product details in next message
3. n8n will automatically upload image to Supabase
4. URL will be saved to MongoDB

## 🎯 Benefits

✅ **Free Storage**: Supabase free tier includes 1GB storage
✅ **CDN Included**: Fast image delivery globally
✅ **Automatic Resizing**: Built-in image optimization
✅ **Secure**: Signed URLs for private images
✅ **Scalable**: Pay as you grow
✅ **Easy Management**: Web interface for files

## 🔄 Testing

### Test Upload Interface:
1. Start your app: `npm run dev`
2. Go to: `http://localhost:3000/admin/upload`
3. Upload a test image
4. Copy the URL
5. Test in Telegram message

### Test n8n Integration:
1. Update your n8n workflow
2. Send an image to your Telegram bot
3. Check if it appears in Supabase storage
4. Verify URL is saved to MongoDB

## 🚨 Important Notes

- **Service Role Key**: Gives full access - keep it secret!
- **Public Bucket**: Anyone can access images (good for products)
- **File Limits**: Free tier has bandwidth limits
- **Backup**: Supabase handles backups automatically

## 📞 Support

If you need help:
1. Check Supabase docs: [supabase.com/docs](https://supabase.com/docs)
2. Review this guide
3. Check n8n workflow logs
4. Test with small images first
