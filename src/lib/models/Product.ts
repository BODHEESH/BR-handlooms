import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  fabric: {
    type: String,
    required: [true, 'Fabric type is required'],
    trim: true,
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    trim: true,
  },
  price: {
    type: String,
    required: [true, 'Price is required'],
    trim: true,
  },
  stock: {
    type: String,
    required: [true, 'Stock information is required'],
    trim: true,
  },
  shipping: {
    type: String,
    default: 'All India',
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  images: [{
    type: String,
    trim: true,
  }],
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
}, {
  timestamps: true,
});

// Prevent duplicate model compilation in development
const Product = models.Product || model('Product', ProductSchema);

export default Product;
