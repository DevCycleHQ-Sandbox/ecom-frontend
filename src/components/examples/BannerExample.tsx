"use client"

import React from "react"
import { Banner } from "../ui"

const BannerExample: React.FC = () => {
  const handleDismiss = (bannerType: string) => {
    console.log(`${bannerType} banner dismissed`)
  }

  return (
    <div className="space-y-6 p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Banner Component Examples
      </h2>

      {/* Basic Banner */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Basic Banner</h3>
        <Banner
          title="Welcome to our store!"
          message="Check out our latest deals and offers."
        />
      </div>

      {/* Different Colors */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Different Colors</h3>
        <div className="space-y-4">
          <Banner
            title="Information"
            message="This is a blue banner (default color)."
            color="blue"
          />
          <Banner
            title="Success"
            message="Your order has been processed successfully!"
            color="green"
          />
          <Banner
            title="Warning"
            message="Your session will expire in 5 minutes."
            color="yellow"
          />
          <Banner
            title="Error"
            message="Something went wrong. Please try again."
            color="red"
          />
          <Banner
            title="Feature"
            message="New features are now available!"
            color="purple"
          />
        </div>
      </div>

      {/* Dismissible Banners */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Dismissible Banners</h3>
        <div className="space-y-4">
          <Banner
            title="Cookie Notice"
            message="We use cookies to improve your experience. Click to dismiss."
            color="gray"
            dismissible={true}
            onDismiss={() => handleDismiss("Cookie Notice")}
          />
          <Banner
            title="Newsletter Signup"
            message="Subscribe to our newsletter for updates and exclusive offers!"
            color="indigo"
            dismissible={true}
            onDismiss={() => handleDismiss("Newsletter")}
          />
        </div>
      </div>

      {/* Title Only */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Title Only</h3>
        <Banner
          title="System maintenance scheduled for tonight"
          color="yellow"
          dismissible={true}
        />
      </div>

      {/* Custom Styling */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Custom Styling</h3>
        <Banner
          title="Custom Banner"
          message="This banner has custom margin and shadow."
          color="blue"
          dismissible={true}
          className="shadow-lg my-4"
        />
      </div>
    </div>
  )
}

export default BannerExample
