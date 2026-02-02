import mongoose from 'mongoose'

interface IWishlistItem {
  productId: mongoose.Types.ObjectId
  name: string
  price: string
  image: string
  fabric: string
  color: string
}

interface IWishlist {
  userId?: string
  sessionId: string
  items: IWishlistItem[]
  itemCount: number
  createdAt: Date
  updatedAt: Date
}

const WishlistItemSchema = new mongoose.Schema<IWishlistItem>({
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
  fabric: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
})

const WishlistSchema = new mongoose.Schema<IWishlist>({
  userId: {
    type: String,
    sparse: true
  },
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  items: [WishlistItemSchema],
  itemCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

export default mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistSchema)
