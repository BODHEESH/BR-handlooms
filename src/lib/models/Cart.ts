import mongoose from 'mongoose'

interface ICartItem {
  productId: mongoose.Types.ObjectId
  name: string
  price: string
  image: string
  quantity: number
  fabric: string
  color: string
}

interface ICart {
  userId?: string
  sessionId: string
  items: ICartItem[]
  total: number
  itemCount: number
  createdAt: Date
  updatedAt: Date
}

const CartItemSchema = new mongoose.Schema<ICartItem>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  fabric: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})

const CartSchema = new mongoose.Schema<ICart>({
  userId: {
    type: String,
    sparse: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  items: [CartItemSchema],
  total: {
    type: Number,
    default: 0
  },
  itemCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema)
