# 🚀 Supabase Products Setup Guide

## Overview
Moving from MongoDB to Supabase for all product data, including n8n integration.

## 📋 Setup Steps

### 1. Create Products Table
```bash
# Run the setup API
curl -X POST http://localhost:3002/api/setup-products-table
```

### 2. Update n8n Workflow
Change your n8n HTTP Request node from:
```
POST http://localhost:3000/api/products
```
To:
```
POST http://localhost:3002/api/n8n/products
```

### 3. Update Environment Variables
Make sure these are in your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🗄️ Table Structure

### Products Table
```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT,
  fabric TEXT,
  color TEXT,
  size TEXT,
  stock INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  telegram_message_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🔗 API Endpoints

### Products API
- `GET /api/supabase/products` - List all products
- `POST /api/supabase/products` - Create new product
- `GET /api/supabase/products/[id]` - Get single product
- `PUT /api/supabase/products/[id]` - Update product
- `DELETE /api/supabase/products/[id]` - Delete product (soft delete)

### n8n Webhook
- `POST /api/n8n/products` - n8n webhook for product creation/updates

## 🤖 n8n Integration

### Webhook Payload
```json
{
  "name": "Beautiful Kasavu Saree",
  "description": "Traditional Kerala saree",
  "price": "3500.00",
  "category": "sarees",
  "fabric": "Pure Cotton",
  "color": "Cream with Gold",
  "size": "Standard",
  "stock": "5",
  "images": ["https://supabase-url/storage/v1/..."],
  "tags": ["kasavu", "traditional", "kerala"],
  "featured": false,
  "telegram_message_id": "123456789"
}
```

### n8n Workflow Update
1. Open your n8n workflow
2. Find the HTTP Request node
3. Update URL to: `http://localhost:3002/api/n8n/products`
4. Keep the same JSON payload structure
5. Test the workflow

## 🔄 Migration from MongoDB

### Data Types
| MongoDB | Supabase |
|---------|----------|
| ObjectId | UUID |
| String | TEXT |
| Number | DECIMAL/INTEGER |
| Array | TEXT[] |
| Boolean | BOOLEAN |
| Date | TIMESTAMP |

### Field Mapping
| MongoDB Field | Supabase Field |
|--------------|----------------|
| _id | id (UUID) |
| name | name |
| description | description |
| price | price |
| category | category |
| fabric | fabric |
| color | color |
| size | size |
| stock | stock |
| images | images |
| tags | tags |
| featured | featured |
| telegram_message_id | telegram_message_id |
| createdAt | created_at |
| updatedAt | updated_at |

## 🛡️ Security Features

### Row Level Security (RLS)
- ✅ Public can view active products
- ✅ Admin can insert/update/delete products
- ✅ Soft delete for products (active = false)

### Policies
```sql
-- Public View
CREATE POLICY "Public View Products" ON products
  FOR SELECT USING (active = true);

-- Admin Operations
CREATE POLICY "Admin Insert Products" ON products
  FOR INSERT WITH CHECK (true);
```

## 📱 Benefits

### Why Supabase?
1. **Single Platform** - All data in one place
2. **Real-time** - Automatic updates
3. **Security** - Built-in RLS and auth
4. **Performance** - Optimized queries
5. **Scalability** - Auto-scaling infrastructure
6. **Cost** - Generous free tier

### n8n Integration Benefits
1. **Direct Integration** - No MongoDB needed
2. **Reliability** - Supabase handles scaling
3. **Security** - Service role key protection
4. **Performance** - Faster than MongoDB
5. **Maintenance** - One less service to manage

## 🚀 Next Steps

1. **Create the products table** using the setup API
2. **Update n8n workflow** to use new endpoint
3. **Test the integration** with a sample product
4. **Verify website** displays products correctly
5. **Remove MongoDB** dependencies (optional)

## 📞 Support

If you need help:
1. Check the API responses in browser dev tools
2. Verify Supabase table creation in dashboard
3. Test n8n webhook with sample data
4. Check environment variables are correct

**Ready to migrate! 🎉**
