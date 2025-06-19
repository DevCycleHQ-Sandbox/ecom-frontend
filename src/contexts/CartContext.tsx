"use client"

import React, { createContext, useContext } from "react"
import {
  useCart,
  useAddToCart,
  useUpdateCartItem,
  useRemoveCartItem,
  useClearCart,
} from "../hooks/useCart"
import { CartItem } from "../types"

interface CartContextType {
  cartItems: CartItem[]
  isLoading: boolean
  error: Error | null
  addToCart: (productId: string, quantity: number) => void
  updateCartItem: (itemId: string, quantity: number) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  refetch: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider")
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: cartItems = [], isLoading, error, refetch } = useCart()
  const addToCartMutation = useAddToCart()
  const updateCartItemMutation = useUpdateCartItem()
  const removeCartItemMutation = useRemoveCartItem()
  const clearCartMutation = useClearCart()

  const addToCart = (productId: string, quantity: number) => {
    addToCartMutation.mutate({ productId, quantity })
  }

  const updateCartItem = (itemId: string, quantity: number) => {
    updateCartItemMutation.mutate({ itemId, quantity })
  }

  const removeFromCart = (itemId: string) => {
    removeCartItemMutation.mutate(itemId)
  }

  const clearCart = () => {
    clearCartMutation.mutate()
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
