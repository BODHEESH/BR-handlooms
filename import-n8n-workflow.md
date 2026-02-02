# Import n8n Workflow Guide

## 🚀 How to Import Your Workflow

### Step 1: Open n8n
1. Go to http://localhost:5678
2. Login with your credentials

### Step 2: Import Workflow
1. Click **"Workflows"** in the left menu
2. Click **"Import from file"** (or drag & drop)
3. Select your `workflow.json` file
4. Click **"Import"**

### Step 3: Configure Credentials
You'll need to set up:

#### Telegram API Credentials
1. Click **"Credentials"** in left menu
2. Click **"Add Credential"**
3. Search for **"Telegram API"**
4. Fill in:
   - **Bot Token**: Get from @BotFather on Telegram
   - **Chat ID**: Your Telegram chat ID

#### Get Telegram Bot Token:
1. Open Telegram
2. Search for **@BotFather**
3. Send `/newbot`
4. Name your bot: "BR Handlooms Bot"
5. Username: "br_handlooms_bot"
6. Copy the bot token

#### Get Your Chat ID:
1. Start a chat with your bot
2. Send any message
3. Visit: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Find your `chat.id` in the response

### Step 4: Test the Workflow

#### Test Message Format:
Send this message to your Telegram bot:

```
#NewArrival

Product Name: Traditional Kerala Kasavu Saree
Fabric: Pure Cotton
Color: White with Gold Border
Price: ₹3,500
Stock: In Stock
Shipping: Free shipping across India

#kasavu #traditional #cotton
```

### Step 5: Activate Workflow
1. In n8n, click the workflow
2. Click the **"Active"** toggle (top right)
3. Workflow should turn **green** (active)

### Step 6: Monitor Execution
1. Click **"Executions"** in left menu
2. Watch for workflow runs
3. Check for any errors

## 🔧 Configuration Updates Needed

### Update API Endpoint
In the "Send to Website API" node:
- Change URL from `http://localhost:3000/api/products` 
- To: `https://br-handlooms.vercel.app/api/products`

### Add Error Handling
Add an "Error Trigger" node to catch failed executions.

## 📱 Alternative: WhatsApp Integration

If you prefer WhatsApp over Telegram:

### Option 1: Use WATI (Easy)
1. Sign up at https://wati.io/
2. Get API key
3. Replace Telegram nodes with HTTP Request nodes
4. Configure WATI webhook

### Option 2: WhatsApp Business API
1. Apply at https://business.facebook.com/whatsapp
2. Get phone number and API access
3. More complex setup but official

## 🎯 Workflow Benefits

✅ **Instant Product Updates** - Add products via Telegram
✅ **No Login Required** - Message and it's live
✅ **Mobile Friendly** - Update from anywhere
✅ **Validation** - Checks required fields
✅ **Confirmation** - Success/error messages
✅ **Tags Support** - Automatic hashtag extraction

## 🔄 Next Steps

1. **Import and activate** the current workflow
2. **Test with sample product**
3. **Monitor website** for new products
4. **Consider WhatsApp** if preferred
5. **Add more workflows** for orders, inquiries

## 📞 Support

- Check n8n executions for errors
- Verify Telegram bot token is correct
- Ensure website API is accessible
- Test message format exactly as shown
