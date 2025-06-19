"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import Image from "next/image"
import Header from "../../components/layout/Header"
import { useCartContext } from "../../contexts/CartContext"
import { useAuth } from "../../contexts/AuthContext"
import { ordersApi } from "../../services/api"

interface ShippingFormData {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  phone?: string
}

export default function CheckoutPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { cartItems, totalPrice, totalItems } = useCartContext()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    },
  })

  const createOrderMutation = useMutation({
    mutationFn: async (formData: ShippingFormData) => {
      const orderData = {
        shipping_address: `${formData.firstName} ${formData.lastName}\n${formData.address}\n${formData.city}, ${formData.state} ${formData.zipCode}`,
        card_number: "4111111111111111", // Default test card number
        items: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product?.price ?? 0,
        })),
      }
      return ordersApi.create(orderData)
    },
    onSuccess: (response) => {
      console.log("Order created successfully:", response)
      // Redirect to success page with order ID
      const orderId = response.id || response.order?.id
      if (orderId) {
        router.push(`/order-success?orderId=${orderId}`)
      } else {
        router.push("/order-success")
      }
    },
    onError: (error) => {
      console.error("Order processing failed:", error)
      alert("Failed to process order. Please try again.")
    },
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const onSubmit = (data: ShippingFormData) => {
    createOrderMutation.mutate(data)
  }

  if (loading) {
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

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6">
              Add some items to your cart before checking out.
            </p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Continue Shopping
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Shipping Information
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address", { required: "Address is required" })}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    {...register("city", { required: "City is required" })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    {...register("state", { required: "State is required" })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    {...register("zipCode", {
                      required: "ZIP code is required",
                    })}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.zipCode ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Order Summary
            </h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Image
                    src={item.product?.image_url || "/placeholder.jpg"}
                    alt={item.product?.name || "Product"}
                    width={60}
                    height={60}
                    className="w-15 h-15 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 text-sm">
                      {item.product?.name}
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Qty: {item.quantity} ×{" "}
                      {formatPrice(item.product?.price ?? 0)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800 text-sm">
                      {formatPrice((item.product?.price ?? 0) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 mb-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Subtotal ({totalItems} items)
                </span>
                <span className="text-gray-800">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-800">Free</span>
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
                <span>{formatPrice(totalPrice * 1.08)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={createOrderMutation.isPending}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createOrderMutation.isPending ? "Processing..." : "Place Order"}
            </button>

            <div className="mt-4 text-center">
              <Link
                href="/cart"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                ← Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
