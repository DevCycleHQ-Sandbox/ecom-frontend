"use client"

import React from "react"
import {
  useBooleanFlag,
  useStringFlag,
  useNumberFlag,
} from "../../hooks/useFeatureFlag"

export function FeatureFlagExample() {
  // Example boolean feature flag
  const { value: showNewFeature, loading: loadingNew } = useBooleanFlag(
    "show-new-feature",
    false
  )

  // Example string feature flag for theme
  const { value: theme, loading: loadingTheme } = useStringFlag(
    "app-theme",
    "light"
  )

  // Example number feature flag for max items
  const { value: maxItems, loading: loadingMax } = useNumberFlag(
    "max-cart-items",
    10
  )

  if (loadingNew || loadingTheme || loadingMax) {
    return <div>Loading feature flags...</div>
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Feature Flag Examples</h2>

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Boolean Flag: New Feature</h3>
          <p>
            Flag: <code>show-new-feature</code>
          </p>
          <p>
            Value:{" "}
            <span
              className={showNewFeature ? "text-green-600" : "text-red-600"}
            >
              {showNewFeature ? "Enabled" : "Disabled"}
            </span>
          </p>
          {showNewFeature && (
            <div className="mt-2 p-2 bg-green-100 rounded">
              🎉 New feature is enabled!
            </div>
          )}
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">String Flag: Theme</h3>
          <p>
            Flag: <code>app-theme</code>
          </p>
          <p>
            Value:{" "}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {theme}
            </span>
          </p>
          <div
            className={`mt-2 p-2 rounded ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100"
            }`}
          >
            Current theme: {theme}
          </div>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">Number Flag: Max Cart Items</h3>
          <p>
            Flag: <code>max-cart-items</code>
          </p>
          <p>
            Value:{" "}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {maxItems}
            </span>
          </p>
          <div className="mt-2 p-2 bg-blue-100 rounded">
            Maximum cart items allowed: {maxItems}
          </div>
        </div>
      </div>
    </div>
  )
}
