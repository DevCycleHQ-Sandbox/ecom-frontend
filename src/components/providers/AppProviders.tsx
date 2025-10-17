"use client"

import React from "react"
import { AuthProvider } from "../../contexts/AuthContext"
import { CartProvider } from "../../contexts/CartContext"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  )
}
