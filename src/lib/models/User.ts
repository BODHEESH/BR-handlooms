import mongoose from 'mongoose'

interface IUser {
  phone: string
  name?: string
  email?: string
  otp?: string
  otpExpiry?: Date
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema<IUser>({
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  otp: {
    type: String
  },
  otpExpiry: {
    type: Date
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
