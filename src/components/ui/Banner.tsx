"use client"

import React, { useState } from "react"

interface BannerProps {
  title: string
  message?: string
  color?: "blue" | "green" | "yellow" | "red" | "purple" | "gray" | "indigo"
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
}

const Banner: React.FC<BannerProps> = ({
  title,
  message,
  color = "blue",
  dismissible = false,
  onDismiss,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    if (onDismiss) {
      onDismiss()
    }
  }

  if (!isVisible) {
    return null
  }

  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    red: "bg-red-50 border-red-200 text-red-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    gray: "bg-gray-50 border-gray-200 text-gray-800",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-800",
  }

  const iconColorClasses = {
    blue: "text-blue-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
    purple: "text-purple-400",
    gray: "text-gray-400",
    indigo: "text-indigo-400",
  }

  return (
    <div
      className={`relative rounded-lg border p-4 ${colorClasses[color]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 text-center">
          <h3 className="font-bold text-sm">{title}</h3>
          {message && <p className="mt-1 text-sm opacity-90">{message}</p>}
        </div>

        {dismissible && (
          <button
            onClick={handleDismiss}
            className={`ml-4 inline-flex rounded-md p-1.5 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${iconColorClasses[color]} focus:ring-current`}
            aria-label="Dismiss banner"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default Banner
