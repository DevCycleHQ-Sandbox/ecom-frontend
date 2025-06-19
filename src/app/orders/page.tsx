"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Header from "../../components/layout/Header"
import { useAuth } from "../../contexts/AuthContext"
import { useOrders } from "../../hooks/useOrders"

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const { data: orders = [], isLoading, error, refetch } = useOrders()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!user) {
    if (typeof window !== "undefined") {
      router.push("/login")
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <Link
            href="/products"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your orders...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Failed to load orders
              </h3>
              <p className="text-red-600 mb-4">
                There was an error loading your orders. Please try again.
              </p>
              <button
                onClick={() => refetch()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && orders.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                No orders yet
              </h2>
              <p className="text-gray-600 mb-6">
                When you make your first purchase, it will appear here.
              </p>
              <Link
                href="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        )}

        {!isLoading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
                      <div>
                        <p className="text-sm text-gray-600">Order ID</p>
                        <p className="font-mono text-sm font-medium text-gray-900">
                          {order.id}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatPrice(order.total_amount)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  {order.items && order.items.length > 0 ? (
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4"
                        >
                          <div className="flex-shrink-0">
                            <Image
                              src={
                                item.product?.image_url ||
                                item.image_url ||
                                "/placeholder.jpg"
                              }
                              alt={item.product?.name || item.name || "Product"}
                              width={64}
                              height={64}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {item.product?.name ||
                                item.name ||
                                "Unknown Product"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity} ×{" "}
                              {formatPrice(item.price)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      No items found for this order.
                    </p>
                  )}
                </div>

                {/* Order Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {order.shipping_address && (
                        <div>
                          <p className="font-medium">Shipping Address:</p>
                          <p className="whitespace-pre-line">
                            {order.shipping_address}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Details
                      </Link>
                      {order.status === "delivered" && (
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          Reorder
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
