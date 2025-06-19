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
    user_id: user?.id ?? "",
    isAnonymous: user?.id ? false : true,
  })
  OpenFeature.setProvider(
    new DevCycleReactProvider(
      process.env.NEXT_PUBLIC_DEV_CYCLE_CLIENT_KEY || ""
    )
  )

  return <OpenFeatureProvider>{children}</OpenFeatureProvider>
}
