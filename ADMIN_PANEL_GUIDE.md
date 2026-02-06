# 🏢 BR Handlooms Admin Panel Guide

## Overview
A comprehensive admin panel for managing products, orders, users, and analytics for BR Handlooms e-commerce platform.

## 🚀 Getting Started

### 1. Access the Admin Panel
```
http://localhost:3002/admin
```

### 2. Prerequisites
- ✅ Supabase database with e-commerce schema
- ✅ Environment variables configured
- ✅ Admin user created in database

## 📊 Dashboard Features

### Main Dashboard (`/admin`)
- **Overview Stats**: Products, Orders, Users, Revenue
- **Recent Orders**: Latest 5 orders with status
- **Low Stock Alert**: Products with stock ≤ 5
- **Top Products**: Featured and best-selling items

### Quick Actions
- Click any stat card to jump to relevant section
- Real-time data updates
- Responsive design for mobile/tablet

## 📦 Products Management

### Products List (`/admin/products`)
- **View all products** with pagination
- **Search** by name or SKU
- **Filter** by status, featured, low stock
- **Quick actions**: Edit, View, Delete

### Product Features
- **Image thumbnails** with fallback
- **Stock status** indicators
- **Category badges**
- **Featured/Best Seller** tags
- **Active/Inactive** status

### Product Operations
- **Add New Product**: `/admin/products/new`
- **Edit Product**: `/admin/products/[id]`
- **View on Store**: Opens product in new tab
- **Delete**: Soft delete (sets active = false)

## 🛒 Orders Management

### Orders List (`/admin/orders`)
- **View all orders** with customer info
- **Search** by order number, email, customer name
- **Filter** by order status
- **Quick status updates** via dropdown

### Order Details Modal
- **Customer Information**: Name, email, phone
- **Order Information**: Status, payment, total, date
- **Shipping Address**: Complete delivery details
- **Tracking Information**: Tracking number and dates

### Order Status Workflow
```
Pending → Confirmed → Processing → Shipped → Delivered
                ↓
            Cancelled
```

### Order Features
- **Status indicators** with icons
- **Payment status** badges
- **Customer details** with user lookup
- **Date formatting** for readability

## 🔧 API Endpoints

### Dashboard Stats
```
GET /api/admin/dashboard-stats
```
Returns: Total products, orders, users, revenue, recent orders, top products, low stock

### Products
```
GET    /api/admin/products          # List products
POST   /api/admin/products          # Create product
GET    /api/admin/products/[id]     # Get single product
PATCH  /api/admin/products/[id]     # Update product
DELETE /api/admin/products/[id]     # Delete product (soft)
```

### Orders
```
GET    /api/admin/orders            # List orders
POST   /api/admin/orders            # Create order
GET    /api/admin/orders/[id]       # Get single order
PATCH  /api/admin/orders/[id]       # Update order
DELETE /api/admin/orders/[id]       # Delete order
```

## 🎨 UI Components

### Design System
- **Primary Color**: `#059669` (Emerald-600)
- **Gray Scale**: Full range for text/ backgrounds
- **Icons**: Lucide React
- **Responsive**: Mobile-first design

### Common Components
- **Stat Cards**: Clickable with hover effects
- **Data Tables**: Sortable, searchable, filterable
- **Modals**: For confirmations and details
- **Status Badges**: Color-coded indicators
- **Loading States**: Skeleton loaders

### Navigation
- **Sidebar**: Collapsible on mobile
- **Breadcrumbs**: For nested pages
- **Quick Links**: Back to store option

## 📱 Mobile Responsiveness

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile Features
- **Collapsible sidebar** with hamburger menu
- **Horizontal scroll** for data tables
- **Touch-friendly** buttons and controls
- **Simplified layouts** for small screens

## 🔐 Security Features

### Authentication
- **Admin-only access** required
- **Session management** via JWT
- **Role-based permissions** (is_admin flag)

### Data Protection
- **Input validation** on all forms
- **SQL injection prevention** via Supabase
- **XSS protection** with proper sanitization
- **Soft deletes** for data recovery

### API Security
- **Service role key** for admin operations
- **Row Level Security** policies
- **Request validation** and error handling

## 📊 Analytics & Reports

### Available Metrics
- **Total Revenue**: Sum of paid orders
- **Order Count**: By status and date range
- **Product Performance**: Views, sales, stock
- **Customer Analytics**: New vs returning users
- **Inventory Reports**: Low stock alerts

### Dashboard Widgets
- **Real-time counters** with trend indicators
- **Recent activity** feeds
- **Performance charts** (future enhancement)
- **Quick filters** for date ranges

## 🚀 Performance Optimizations

### Database Queries
- **Optimized selects** with specific fields
- **Proper indexing** on frequently queried columns
- **Pagination** for large datasets
- **Caching** for dashboard stats

### Frontend Optimizations
- **Lazy loading** for images
- **Debounced search** inputs
- **Memoized components** where needed
- **Efficient re-renders** with React hooks

## 🛠️ Development Guide

### File Structure
```
src/app/admin/
├── layout.tsx              # Admin layout wrapper
├── page.tsx                # Dashboard
├── products/
│   ├── page.tsx           # Products list
│   └── [id]/
│       └── page.tsx        # Product details/edit
├── orders/
│   ├── page.tsx           # Orders list
│   └── [id]/
│       └── page.tsx        # Order details
└── api/
    ├── dashboard-stats/
    ├── products/
    └── orders/
```

### Adding New Features
1. **Create API route** in `/api/admin/`
2. **Build UI component** in appropriate section
3. **Add navigation** item to layout
4. **Update permissions** if needed
5. **Test with sample data**

### Best Practices
- **Consistent styling** with design tokens
- **Error boundaries** for graceful failures
- **Loading states** for better UX
- **Type safety** with TypeScript interfaces
- **Accessible markup** with ARIA labels

## 🔧 Troubleshooting

### Common Issues

#### "Access Denied"
- Check user `is_admin` flag in database
- Verify JWT token is valid
- Ensure service role key is correct

#### "No Data Found"
- Run Supabase schema setup
- Check RLS policies
- Verify table permissions

#### "Slow Loading"
- Check database indexes
- Optimize API queries
- Add pagination limits

#### "Mobile Issues"
- Test on actual devices
- Check responsive breakpoints
- Verify touch targets

### Debug Tools
- **Browser DevTools** for network requests
- **Supabase Dashboard** for database inspection
- **Console logs** for error tracking
- **React DevTools** for component debugging

## 📈 Future Enhancements

### Planned Features
- **Analytics Dashboard** with charts
- **User Management** with roles
- **Coupon Management** system
- **Inventory Management** with alerts
- **Email Templates** for notifications
- **Export/Import** functionality
- **Bulk Operations** for products
- **Order Tracking** integration
- **Payment Gateway** management

### Advanced Features
- **Multi-store support**
- **API rate limiting**
- **Advanced search** with filters
- **Real-time notifications**
- **Mobile app** for admin
- **Integration APIs** for third parties

## 📞 Support

### Getting Help
1. **Check this guide** first
2. **Review error messages** in console
3. **Test API endpoints** directly
4. **Verify database setup**
5. **Check environment variables**

### Contact
- **Technical issues**: Check logs and error messages
- **Feature requests**: Document requirements clearly
- **Bug reports**: Include steps to reproduce

---

**Admin Panel Version**: 1.0.0  
**Last Updated**: 2024  
**Compatible with**: Supabase E-commerce Schema
