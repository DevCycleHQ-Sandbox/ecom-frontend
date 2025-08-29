"use client"

import React, { ReactNode, useEffect } from "react"
import { useAuth } from "./AuthContext"

import { OpenFeatureProvider, OpenFeature, InMemoryProvider } from "@openfeature/react-sdk"
import DevCycleReactProvider from "@devcycle/openfeature-react-provider"
import { FirstMatchStrategy, WebMultiProvider } from '@openfeature/multi-provider-web'
import { LaunchDarklyClientProvider } from "@openfeature/launchdarkly-client-provider"

interface FeatureFlagProviderProps {
  children: ReactNode
}

export function FeatureFlagProvider({ children }: FeatureFlagProviderProps) {
  const { user } = useAuth()
  
  useEffect(() => {
    OpenFeature.setContext({
      targetingKey: user?.username ?? "",
      isAnonymous: user?.username ? false : true,
    })

    const providers = [
      {
        provider: new DevCycleReactProvider(process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_KEY || "")
      }, 
      { 
        provider: new LaunchDarklyClientProvider(process.env.NEXT_PUBLIC_LD_CLIENT_KEY || "", {})
      },
      { 
        provider: new InMemoryProvider({ 
          "free-shipping": {
            variants: {
              enabled: true,
              disabled: false
            },
            defaultVariant: "enabled",
            disabled: false
          }
        })
      }
    ]
    const multiProvider = new WebMultiProvider(providers, new FirstMatchStrategy())

    OpenFeature.setProvider(multiProvider)
  }, [user?.username])

  return <OpenFeatureProvider>{children}</OpenFeatureProvider>
}


















