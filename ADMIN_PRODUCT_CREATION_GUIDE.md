# 🏢 Admin Panel Product Creation Guide

## Overview
The BR Handlooms admin panel provides two ways to add products:
1. **Direct Admin Panel** - Upload images directly to Supabase and create products
2. **Telegram Bot + n8n** - Upload images via upload page and send to Telegram bot

---

## 🚀 Method 1: Direct Admin Panel Creation

### Step 1: Access Admin Panel
```
http://localhost:3001/admin
```

### Step 2: Navigate to Product Creation
1. Click "Products" in the sidebar
2. Click "Add New Product" button
3. Or go directly to: `http://localhost:3001/admin/products/new`

### Step 3: Fill Product Information

#### Basic Information
- **Product Name**: Enter the product name (required)
- **SKU**: Auto-generated if empty
- **Category**: Select product category (required)
- **Short Description**: Brief product description
- **Full Description**: Detailed product description

#### Images (Direct Upload)
- **Click to upload** or drag and drop images
- **Supported formats**: JPG, PNG, GIF, WebP
- **Max size**: 10MB per image
- **Multiple images** supported
- Images are automatically uploaded to Supabase storage
- URLs are generated automatically

#### Pricing
- **Selling Price**: Main product price (required)
- **Compare at Price**: For showing discounts
- **Cost Price**: Your internal cost

#### Product Details
- **Fabric**: e.g., Pure Cotton, Silk
- **Color**: e.g., Cream with Gold
- **Size**: e.g., Standard, Large
- **Material**: e.g., 100% Cotton
- **Weight**: Product weight in kg
- **Origin**: e.g., Kuthampully, Kerala
- **Care Instructions**: e.g., Hand wash cold
- **Artisan Notes**: Special craftsmanship details

#### Inventory
- **Stock Quantity**: Available units
- **Low Stock Threshold**: Alert level (default: 5)
- **Track Inventory**: Enable stock tracking
- **Requires Shipping**: Product needs delivery
- **Taxable**: Apply taxes

#### Tags & SEO
- **Tags**: Comma-separated (e.g., kasavu, traditional, kerala)
- **SEO Title**: Custom SEO title
- **SEO Description**: Meta description
- **Meta Keywords**: SEO keywords
- **WhatsApp Number**: Custom contact number

#### Product Status
- **Active**: Product is visible on store
- **Published**: Product is live
- **Featured**: Show in featured section
- **Trending**: Mark as trending
- **Best Seller**: Highlight as popular
- **New Arrival**: Show in new arrivals

### Step 4: Save Product
1. Click "Save Product" button
2. Product is created with all images uploaded to Supabase
3. Redirected to products list

---

## 📱 Method 2: Telegram Bot + n8n Workflow

### Step 1: Upload Images First
```
http://localhost:3001/upload
```

1. Upload product image using the upload form
2. Copy the generated Supabase URL
3. URL format: `https://axaepxurdgoebzmmrbxd.supabase.co/storage/v1/object/public/product-images/products/[timestamp]-[random].jpg`

### Step 2: Send to Telegram Bot
Send this format to your Telegram bot:

```
#NewArrival
Product Name: Your Product Name
Fabric: Cotton
Color: Red
Price: ₹2,500
Stock: In Stock
Images: https://axaepxurdgoebzmmrbxd.supabase.co/storage/v1/object/public/product-images/products/1738567890-abc123.jpg
#traditional #cotton
```

### Step 3: Automatic Processing
- n8n workflow processes the message
- Product is created in Supabase
- Image URL is saved with the product
- Product appears on website

---

## 🔄 Comparison: Admin Panel vs Telegram

| Feature | Admin Panel | Telegram Bot |
|---------|-------------|---------------|
| **Image Upload** | Direct to Supabase | Manual upload first |
| **Product Fields** | All fields available | Limited fields |
| **Multiple Images** | ✅ Supported | ❌ Single image |
| **SEO Options** | ✅ Full control | ❌ Basic only |
| **Inventory** | ✅ Advanced tracking | ❌ Basic only |
| **Categories** | ✅ Structured | ❌ Manual tags |
| **Speed** | Fast for bulk products | Quick for single items |
| **Mobile Friendly** | ✅ Responsive | ✅ Mobile app |

---

## 🎯 Recommended Usage

### Use Admin Panel For:
- **Bulk product creation**
- **Products with multiple images**
- **Detailed product information**
- **SEO optimization**
- **Inventory management**
- **Category organization**

### Use Telegram Bot For:
- **Quick single product additions**
- **Mobile-first workflow**
- **Simple products**
- **Social media integration**

---

## 🔧 Technical Details

### Image Storage
- **Bucket**: `product-images` (public)
- **URL Format**: `https://axaepxurdgoebzmmrbxd.supabase.co/storage/v1/object/public/product-images/products/[filename]`
- **File Size Limit**: 10MB
- **Supported Formats**: JPG, PNG, GIF, WebP

### API Endpoints Used
- **Image Upload**: `/api/upload-multiple`
- **Product Creation**: `/api/admin/products`
- **Product List**: `/api/admin/products`

### Database Tables
- **Products**: Main product information
- **Categories**: Product categorization
- **Orders**: Customer orders
- **Users**: Customer accounts

---

## 📞 Support & Troubleshooting

### Common Issues

#### "Upload Failed"
- Check file size (max 10MB)
- Verify file format (images only)
- Ensure Supabase credentials are correct

#### "Product Not Saving"
- Fill all required fields (name, price, category)
- Check network connection
- Verify admin permissions

#### "Images Not Showing"
- Wait for upload to complete
- Check Supabase bucket permissions
- Verify image URLs are accessible

### Quick Links
- **Admin Panel**: `http://localhost:3001/admin`
- **Upload Images**: `http://localhost:3001/upload`
- **Products List**: `http://localhost:3001/admin/products`
- **Website**: `http://localhost:3001`

---

## 🎉 Success!

Both methods are fully functional:
- ✅ Admin panel with direct Supabase image upload
- ✅ Telegram bot with n8n automation
- ✅ Products appear on website immediately
- ✅ Image URLs are properly stored and displayed

Choose the method that best fits your workflow!
