"use client"

import Link from "next/link"
import Image from "next/image"
import Header from "../../components/layout/Header"
import { useCartContext } from "../../contexts/CartContext"
import { useAuth } from "../../contexts/AuthContext"
import { useBooleanFlagValue } from "@openfeature/react-sdk"

export default function CartPage() {
  const { user } = useAuth()
  const {
    cartItems,
    updateCartItem,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
    isLoading,
  } = useCartContext()

  // Feature flag for free shipping
  const isFreeShippingEnabled = useBooleanFlagValue(
    "free-shipping",
    false
  )

  const showBanner = useBooleanFlagValue(
    "show-banner",
    false
  )

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Please Log In
            </h1>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view your cart.
            </p>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Log In
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {isFreeShippingEnabled && showBanner && (
          <div className="mb-8 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-4 px-6 rounded-lg shadow-md">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">🚚</span>
              <span className="text-lg font-semibold">
                Free shipping now on all orders for a limited time!
              </span>
              <span className="text-2xl">✨</span>
            </div>
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading cart...</p>
          </div>
        )}

        {!isLoading && cartItems && cartItems.length === 0 && (
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Add some products to get started!
              </p>
              <Link
                href="/products"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {!isLoading && cartItems && cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.product?.image_url || "/placeholder.jpg"}
                      alt={item.product?.name || "Product"}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.product?.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {formatPrice(item.product?.price ?? 0)} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateCartItem(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-gray-900 font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItem(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          {formatPrice(
                            item.product?.price ?? 0 * item.quantity
                          )}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 text-sm hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800"
                >
                  Clear Cart
                </button>
                <p className="text-gray-600">
                  {totalItems} {totalItems === 1 ? "item" : "items"} in cart
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {isFreeShippingEnabled ? (
                    <span className="text-green-600 font-bold">Free</span>
                  ) : (
                    <span className="text-gray-800">{formatPrice(totalItems * 12)}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800">
                    {formatPrice(totalPrice * 0.08)}
                  </span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <span>{formatPrice((totalPrice + (isFreeShippingEnabled ? 0 : totalItems * 12)) * 1.08)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold text-center"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-4 text-center">
                <Link
                  href="/products"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
