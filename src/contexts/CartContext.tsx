'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export interface CartItem {
  _id: string
  name: string
  price: string
  image: string
  quantity: number
  fabric: string
  color: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
  loading: boolean
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: { items: CartItem[]; total: number; itemCount: number } }
  | { type: 'ADD_TO_CART'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: true
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    
    case 'SET_CART':
      return { ...state, items: action.payload.items, total: action.payload.total, itemCount: action.payload.itemCount, loading: false }
    
    default:
      return state
  }
}

interface CartContextType {
  cart: CartState
  addToCart: (product: Omit<CartItem, 'quantity'>) => Promise<void>
  removeFromCart: (id: string) => Promise<void>
  updateQuantity: (id: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState)
  
  // Load cart from API on mount
  const refreshCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'SET_CART', payload: data.cart })
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }
  
  useEffect(() => {
    refreshCart()
  }, [])
  
  const addToCart = async (product: Omit<CartItem, 'quantity'>) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add',
          item: { ...product, productId: product._id }
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'SET_CART', payload: data.cart })
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }
  
  const removeFromCart = async (id: string) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'remove',
          item: { productId: id }
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'SET_CART', payload: data.cart })
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }
  
  const updateQuantity = async (id: string, quantity: number) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update',
          item: { productId: id },
          quantity
        })
      })
      
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'SET_CART', payload: data.cart })
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }
  
  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear' })
      })
      
      if (response.ok) {
        const data = await response.json()
        dispatch({ type: 'SET_CART', payload: data.cart })
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }
  
  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      refreshCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
