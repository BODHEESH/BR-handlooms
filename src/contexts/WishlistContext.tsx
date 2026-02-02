'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export interface WishlistItem {
  _id: string
  name: string
  price: string
  image: string
  fabric: string
  color: string
}

interface WishlistState {
  items: WishlistItem[]
  itemCount: number
  loading: boolean
}

type WishlistAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_WISHLIST'; payload: { items: WishlistItem[]; itemCount: number } }
  | { type: 'ADD_TO_WISHLIST'; payload: WishlistItem }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }

const initialState: WishlistState = {
  items: [],
  itemCount: 0,
  loading: true
}

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_WISHLIST':
      return { ...state, items: action.payload.items, itemCount: action.payload.itemCount, loading: false }
    
    default:
      return state
  }
}

interface WishlistContextType {
  wishlist: WishlistState
  addToWishlist: (product: WishlistItem) => Promise<void>
  removeFromWishlist: (id: string) => Promise<void>
  clearWishlist: () => Promise<void>
  isInWishlist: (id: string) => boolean
  refreshWishlist: () => Promise<void>
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, initialState)
  
  // Load wishlist from API on mount
  const refreshWishlist = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/wishlist')
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'SET_WISHLIST', payload: data.wishlist })
      }
    } catch (error) {
      console.error('Error loading wishlist:', error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }
  
  useEffect(() => {
    refreshWishlist()
  }, [])
  
  const addToWishlist = async (product: WishlistItem) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          item: { ...product, productId: product._id }
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'SET_WISHLIST', payload: data.wishlist })
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error)
    }
  }
  
  const removeFromWishlist = async (id: string) => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'remove',
          item: { productId: id }
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'SET_WISHLIST', payload: data.wishlist })
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error)
    }
  }
  
  const clearWishlist = async () => {
    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear' })
      })
      
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'SET_WISHLIST', payload: data.wishlist })
      }
    } catch (error) {
      console.error('Error clearing wishlist:', error)
    }
  }
  
  const isInWishlist = (id: string) => {
    return wishlist.items.some(item => item._id === id)
  }
  
  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist,
      refreshWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
