"use client"

import Link from "next/link"
import Image from "next/image"
import Header from "../components/layout/Header"
import { useProducts } from "../hooks/useProducts"
import { Banner } from "@/components/ui"
import { useVariableValue } from "@devcycle/nextjs-sdk"

export default function Home() {
  const { data: products = [], isLoading, error, refetch } = useProducts()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }
  const bannerProperties = useVariableValue("banner-props", {
    title: "",
    message: "",
    discount: 0,
    colour: "green",
    enabled: false,
  })

  const PromoBanner = () => {
    return (
      <Banner
        title={bannerProperties.title}
        message={`${bannerProperties.message} ${bannerProperties.discount}% off all products.`}
        color={
          bannerProperties.colour as
            | "red"
            | "blue"
            | "green"
            | "yellow"
            | "purple"
            | "gray"
            | "indigo"
        }
      />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {bannerProperties.enabled && <PromoBanner />}

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Shopper
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover amazing products at great prices
          </p>
          <Link
            href="/products"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors"
          >
            Shop Now
          </Link>
        </section>

        {/* Featured Products */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Featured Products
          </h2>

          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <p className="text-red-600">Failed to load products</p>
              <button
                onClick={() => refetch()}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          )}

          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No products available</p>
            </div>
          )}

          {!isLoading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-w-1 aspect-h-1">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={300}
                        height={192}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-600">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {product.stock_quantity} in stock
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {!isLoading && !error && products.length > 8 && (
            <div className="text-center mt-8">
              <Link
                href="/products"
                className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
              >
                View All Products
              </Link>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Shopper</h3>
            <p className="text-gray-400">
              Your trusted online shopping destination
            </p>
            <p className="text-gray-400 mt-2">
              © 2024 Shopper. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
