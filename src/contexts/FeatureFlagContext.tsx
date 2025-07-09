"use client"

import React, { ReactNode } from "react"
import { OpenFeatureProvider, OpenFeature } from "@openfeature/react-sdk"
import DevCycleReactProvider from "@devcycle/openfeature-react-provider"
import { useAuth } from "./AuthContext"
interface FeatureFlagProviderProps {
  children: ReactNode
}

export function FeatureFlagProvider({ children }: FeatureFlagProviderProps) {
  const { user } = useAuth()
  OpenFeature.setContext({
    user_id: user?.username ?? "",
    isAnonymous: user?.username ? false : true,
    country: "CA",
    privateCustomData: {
      "is-premium-user": true,
    },
  })
  OpenFeature.setProvider(
    new DevCycleReactProvider(process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_KEY || "")
  )

  return <OpenFeatureProvider>{children}</OpenFeatureProvider>
}
