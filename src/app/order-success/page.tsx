"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Header from "../../components/layout/Header"
import { useCartContext } from "../../contexts/CartContext"

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const { clearCart } = useCartContext()
  const orderId = searchParams.get("orderId")

  // Clear cart when order is successful
  useEffect(() => {
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Remove clearCart from dependencies to prevent infinite loop

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
              <svg
                className="h-12 w-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed and is
              being processed.
            </p>

            {orderId && (
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">Order ID:</p>
                <p className="text-lg font-mono font-semibold text-gray-900">
                  {orderId}
                </p>
              </div>
            )}
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              What happens next?
            </h2>
            <div className="text-left space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    Order Confirmation
                  </h3>
                  <p className="text-sm text-gray-600">
                    You&apos;ll receive an email confirmation with your order
                    details shortly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Processing</h3>
                  <p className="text-sm text-gray-600">
                    We&apos;ll prepare your order for shipment within 1-2
                    business days.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Shipping</h3>
                  <p className="text-sm text-gray-600">
                    Your order will be shipped and you&apos;ll receive tracking
                    information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/orders"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Order History
            </Link>
            <Link
              href="/products"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Support Information */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about your order, please don&apos;t
              hesitate to contact us.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a
                href="mailto:support@shopper.com"
                className="text-blue-600 hover:text-blue-800"
              >
                Email Support
              </a>
              <span className="text-gray-300">|</span>
              <a
                href="tel:+1-555-0123"
                className="text-blue-600 hover:text-blue-800"
              >
                Call Us
              </a>
              <span className="text-gray-300">|</span>
              <Link href="/help" className="text-blue-600 hover:text-blue-800">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </main>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  )
}
