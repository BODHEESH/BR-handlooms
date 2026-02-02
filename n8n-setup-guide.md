# n8n Setup Guide for BR Handlooms

## 🎯 Business Use Cases for BR Handlooms

### 1. Order Management Workflows
- **New Order Alert**: Send WhatsApp message when new order comes in
- **Inventory Update**: Automatically update stock levels
- **Order Confirmation**: Send email/SMS to customers
- **Shipping Notifications**: Track and notify shipping status

### 2. Customer Management
- **Lead Capture**: Capture inquiries from website forms
- **Customer Segmentation**: Categorize customers by purchase history
- **Follow-up Reminders**: Automated follow-up messages
- **WhatsApp Marketing**: Send promotional messages

### 3. Inventory & Operations
- **Stock Alerts**: Notify when products run low
- **Price Updates**: Sync prices across platforms
- **Product Catalog**: Auto-update website inventory
- **Supplier Management**: Order raw materials automatically

## 🚀 Setup Options

### Option 1: Self-Hosted (Recommended)
**Requirements:**
- Docker installed
- 2GB+ RAM
- 10GB+ storage
- Domain (optional)

**Installation Steps:**
```bash
# Create n8n directory
mkdir n8n && cd n8n

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your_secure_password
      - WEBHOOK_URL=https://your-domain.com/
      - GENERIC_TIMEZONE=Asia/Kolkata
    volumes:
      - n8n_data:/home/node/.n8n
    restart: always

volumes:
  n8n_data:
EOF

# Start n8n
docker-compose up -d
```

**Access:** http://localhost:5678

### Option 2: n8n Cloud (Easy Setup)
1. Visit https://app.n8n.cloud/
2. Sign up for free account
3. Choose workflow templates
4. Connect your services

**Pricing:** Free tier available, paid plans from $20/month

### Option 3: Vercel Deployment (Advanced)
```bash
# Deploy n8n to Vercel
npx vercel --prod https://github.com/n8n-io/n8n
```

## 🔗 Essential Integrations for BR Handlooms

### 1. WhatsApp Business API
```json
{
  "name": "WhatsApp Order Notification",
  "trigger": "Webhook (from website)",
  "actions": [
    {
      "type": "Send WhatsApp Message",
      "phone": "+917907730095",
      "message": "New order: {{$json.product_name}} - {{$json.price}}"
    }
  ]
}
```

### 2. Email Service (Gmail/Outlook)
- **Order confirmations**
- **Shipping notifications**
- **Marketing campaigns**
- **Customer support**

### 3. Google Sheets
- **Order tracking**
- **Inventory management**
- **Customer database**
- **Sales analytics**

### 4. Website Integration
```javascript
// Add to your website form
fetch('https://your-n8n-domain.com/webhook/order', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    customer_name: document.getElementById('name').value,
    product: document.getElementById('product').value,
    phone: document.getElementById('phone').value
  })
})
```

## 📋 Step-by-Step Setup

### Step 1: Choose Platform
- **Beginner**: n8n Cloud (free)
- **Intermediate**: Self-hosted Docker
- **Advanced**: Vercel deployment

### Step 2: Install n8n
```bash
# For self-hosted
git clone https://github.com/n8n-io/n8n.git
cd n8n
npm install
npm run start
```

### Step 3: Configure Environment
```bash
# Create .env file
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password
WEBHOOK_URL=https://your-domain.com/
GENERIC_TIMEZONE=Asia/Kolkata
```

### Step 4: Create First Workflow
1. **Trigger**: Webhook from website
2. **Action**: Send WhatsApp message
3. **Action**: Update Google Sheets
4. **Action**: Send email confirmation

### Step 5: Test Integration
- Submit test order on website
- Check n8n workflow execution
- Verify WhatsApp message received
- Confirm Google Sheets updated

## 🛠️ Recommended Workflows

### Workflow 1: Order Processing
```
Website Form → WhatsApp Alert → Email Confirmation → Inventory Update → Google Sheets
```

### Workflow 2: Customer Inquiry
```
Contact Form → Lead Classification → Follow-up Schedule → WhatsApp Message
```

### Workflow 3: Inventory Management
```
Stock Check → Low Stock Alert → Supplier Email → Purchase Order
```

## 🔧 Configuration Files

### Docker Compose (Recommended)
```yaml
version: '3.8'
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    container_name: n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=br_handlooms_2024
      - WEBHOOK_URL=https://br-handlooms.vercel.app/
      - GENERIC_TIMEZONE=Asia/Kolkata
      - N8N_HOST=localhost
      - N8N_PORT=5678
      - N8N_PROTOCOL=http
    volumes:
      - n8n_data:/home/node/.n8n
      - ./custom-nodes:/home/node/.n8n/custom-nodes
    networks:
      - n8n_network

  postgres:
    image: postgres:13
    container_name: n8n_postgres
    restart: always
    environment:
      - POSTGRES_DB=n8n
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=n8n_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - n8n_network

volumes:
  n8n_data:
  postgres_data:

networks:
  n8n_network:
```

### Environment Variables
```bash
# .env file
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=br_handlooms_2024
WEBHOOK_URL=https://br-handlooms.vercel.app/
GENERIC_TIMEZONE=Asia/Kolkata
N8N_HOST=localhost
N8N_PORT=5678
N8N_PROTOCOL=http

# Database (optional, for production)
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=postgres
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=n8n_password
```

## 🚀 Quick Start Commands

```bash
# 1. Create project directory
mkdir br-handlooms-n8n && cd br-handlooms-n8n

# 2. Create docker-compose file
# (copy the docker-compose.yml from above)

# 3. Start n8n
docker-compose up -d

# 4. Access n8n
# Open http://localhost:5678 in browser
# Login with admin/br_handlooms_2024

# 5. Create first workflow
# - Trigger: Webhook
# - Action: WhatsApp Business
# - Action: Google Sheets
```

## 📱 WhatsApp Business Setup

### Option 1: WhatsApp Business API
1. **Register** at https://business.facebook.com/whatsapp
2. **Verify** business documents
3. **Get API key** and phone number
4. **Configure** in n8n

### Option 2: WhatsApp Gateway (Easier)
1. **Use services** like:
   - WATI (https://wati.io/)
   - Twilio WhatsApp
   - MessageBird
2. **Get API key**
3. **Configure in n8n**

## 🎯 Next Steps

1. **Choose setup option** (Cloud vs Self-hosted)
2. **Install n8n** using preferred method
3. **Create first workflow** for order notifications
4. **Test with website integration**
5. **Expand to more workflows** as needed

## 📞 Support & Resources

- **n8n Documentation**: https://docs.n8n.io/
- **Community Forum**: https://community.n8n.io/
- **Video Tutorials**: https://www.youtube.com/c/n8nio
- **Templates**: https://n8n.io/workflows/

## 💡 Pro Tips for BR Handlooms

1. **Start Simple**: Begin with order notifications
2. **Use Templates**: Leverage existing workflow templates
3. **Test Thoroughly**: Test all workflows before going live
4. **Monitor Regularly**: Check workflow execution logs
5. **Backup Data**: Regular backups of n8n configurations
6. **Security**: Use strong passwords and HTTPS
7. **Scaling**: Start with essential workflows, expand gradually
