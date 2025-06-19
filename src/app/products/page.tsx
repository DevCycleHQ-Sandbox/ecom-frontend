"use client"

import { useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Header from "../../components/layout/Header"
import { useProducts } from "../../hooks/useProducts"

function ProductsContent() {
  const { data: products = [], isLoading, error, refetch } = useProducts()
  const searchParams = useSearchParams()
  const router = useRouter()

  const searchTerm = searchParams.get("search") || ""
  const sortBy = searchParams.get("sort") || "name"

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set("search", value)
    } else {
      params.delete("search")
    }
    router.push(`/products?${params.toString()}`)
  }

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value && value !== "name") {
      params.set("sort", value)
    } else {
      params.delete("sort")
    }
    router.push(`/products?${params.toString()}`)
  }

  // Memoize filtered and sorted products for better performance
  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "name":
          default:
            return a.name.localeCompare(b.name)
        }
      })
  }, [products, searchTerm, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            All Products
          </h1>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">Failed to load products</p>
            <button
              onClick={() => refetch()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {searchTerm
                ? "No products found matching your search"
                : "No products available"}
            </p>
          </div>
        )}

        {!isLoading && !error && filteredProducts.length > 0 && (
          <>
            <div className="mb-4 text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
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
          </>
        )}
      </main>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </main>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  )
}
