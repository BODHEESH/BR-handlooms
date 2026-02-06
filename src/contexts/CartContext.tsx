'use client'

import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react'

const CART_STORAGE_KEY = 'br_handlooms_cart'

export interface CartItem {
  _id: string
  name: string
  price: string | number
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
  | { type: 'CLEAR_CART' }

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: true
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const price = parseFloat(String(item.price).replace(/[₹,]/g, '')) || 0
    return sum + price * item.quantity
  }, 0)
}

function calculateItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

function saveToLocalStorage(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

function loadFromLocalStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
  }
  return []
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }

    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        itemCount: action.payload.itemCount,
        loading: false
      }

    case 'CLEAR_CART':
      return { ...state, items: [], total: 0, itemCount: 0, loading: false }

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

  const syncCart = useCallback((items: CartItem[]) => {
    saveToLocalStorage(items)
    dispatch({
      type: 'SET_CART',
      payload: {
        items,
        total: calculateTotal(items),
        itemCount: calculateItemCount(items)
      }
    })
  }, [])

  // Load cart from localStorage on mount
  const refreshCart = useCallback(async () => {
    const items = loadFromLocalStorage()
    syncCart(items)
  }, [syncCart])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addToCart = async (product: Omit<CartItem, 'quantity'>) => {
    const items = loadFromLocalStorage()
    const existingIndex = items.findIndex(item => item._id === product._id)

    if (existingIndex >= 0) {
      items[existingIndex].quantity += 1
    } else {
      items.push({ ...product, quantity: 1 })
    }

    syncCart(items)
  }

  const removeFromCart = async (id: string) => {
    const items = loadFromLocalStorage().filter(item => item._id !== id)
    syncCart(items)
  }

  const updateQuantity = async (id: string, quantity: number) => {
    const items = loadFromLocalStorage()
    const index = items.findIndex(item => item._id === id)

    if (index >= 0) {
      if (quantity <= 0) {
        items.splice(index, 1)
      } else {
        items[index].quantity = quantity
      }
    }

    syncCart(items)
  }

  const clearCart = async () => {
    saveToLocalStorage([])
    dispatch({ type: 'CLEAR_CART' })
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
