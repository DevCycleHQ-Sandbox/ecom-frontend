"use client"

import React from "react"
import { AuthProvider } from "../../contexts/AuthContext"
import { CartProvider } from "../../contexts/CartContext"
import { FeatureFlagProvider } from "@/contexts/FeatureFlagContext"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FeatureFlagProvider>
        <CartProvider>{children}</CartProvider>
      </FeatureFlagProvider>
    </AuthProvider>
  )
}
