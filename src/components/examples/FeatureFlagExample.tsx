"use client"

import React from "react"
import { useVariableValue } from "@devcycle/nextjs-sdk"
import {
  FREE_SHIPPING,
  EXAMPLE_TEXT,
  TOGGLEBOT_SPEED,
} from "@/../dvcVariableTypes"

export function FeatureFlagExample() {
  // Example boolean feature flag
  const freeShipping = useVariableValue(FREE_SHIPPING, false)

  // Example string feature flag
  const exampleText = useVariableValue(EXAMPLE_TEXT, "light")

  // Example string feature flag
  const togglebotSpeed = useVariableValue(TOGGLEBOT_SPEED, "slow")

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Feature Flag Examples</h2>

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h3 className="font-semibold">Boolean Flag: Free Shipping</h3>
          <p>
            Flag: <code>{FREE_SHIPPING}</code>
          </p>
          <p>
            Value:{" "}
            <span className={freeShipping ? "text-green-600" : "text-red-600"}>
              {freeShipping ? "Enabled" : "Disabled"}
            </span>
          </p>
          {freeShipping && (
            <div className="mt-2 p-2 bg-green-100 rounded">
              ✅ Free shipping applied!
            </div>
          )}
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">String Flag: Example Text</h3>
          <p>
            Flag: <code>{EXAMPLE_TEXT}</code>
          </p>
          <p>
            Value:{" "}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {exampleText}
            </span>
          </p>
          <div
            className={`mt-2 p-2 rounded ${
              exampleText === "dark" ? "bg-gray-800 text-white" : "bg-gray-100"
            }`}
          >
            Example text: {exampleText}
          </div>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-semibold">String Flag: Togglebot Speed</h3>
          <p>
            Flag: <code>{TOGGLEBOT_SPEED}</code>
          </p>
          <p>
            Value:{" "}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {togglebotSpeed}
            </span>
          </p>
          <div className="mt-2 p-2 bg-blue-100 rounded">
            Speed: {togglebotSpeed}
          </div>
        </div>
      </div>
    </div>
  )
}
