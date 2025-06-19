"use client"

import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import Link from "next/link"
import Image from "next/image"
import Header from "../../../components/layout/Header"
import { useProducts } from "../../../hooks/useProducts"
import { useAddToCart } from "../../../hooks/useCart"
import { useAuth } from "../../../contexts/AuthContext"

interface AddToCartFormData {
  quantity: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: products = [], isLoading } = useProducts()
  const addToCartMutation = useAddToCart()
  const { user } = useAuth()

  const productId = params.id as string
  const product = products.find((p) => p.id === productId)

  const { register, handleSubmit } = useForm<AddToCartFormData>({
    defaultValues: {
      quantity: 1,
    },
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const onSubmit = (data: AddToCartFormData) => {
    console.log("Form submitted with data:", data)
    console.log("User:", user)
    console.log("Product:", product)

    if (!user) {
      console.log("No user, redirecting to login")
      router.push("/login")
      return
    }
    if (!product) {
      console.log("No product found")
      return
    }

    console.log("Calling addToCartMutation.mutate with:", {
      productId: product.id,
      quantity: data.quantity,
    })

    addToCartMutation.mutate({
      productId: product.id,
      quantity: data.quantity,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Back to Products
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
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-gray-800">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/products" className="hover:text-gray-800">
                Products
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800">{product.name}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2">
              <Image
                src={product.image_url}
                alt={product.name}
                width={600}
                height={384}
                className="w-full h-96 md:h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Stock: {product.stock_quantity} available
                  </span>
                  {product.stock_quantity > 0 ? (
                    <span className="text-green-600 text-sm font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-red-600 text-sm font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
              </div>

              {product.stock_quantity > 0 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Quantity
                    </label>
                    <select
                      id="quantity"
                      {...register("quantity", {
                        required: "Please select a quantity",
                        min: { value: 1, message: "Minimum quantity is 1" },
                        max: {
                          value: product.stock_quantity,
                          message: `Maximum quantity is ${product.stock_quantity}`,
                        },
                      })}
                      className="block w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Array.from(
                        { length: Math.min(10, product.stock_quantity) },
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={addToCartMutation.isPending}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addToCartMutation.isPending
                        ? "Adding..."
                        : "Add to Cart"}
                    </button>
                  </div>
                </form>
              )}

              {product.stock_quantity === 0 && (
                <div className="flex space-x-4">
                  <button
                    disabled
                    className="flex-1 bg-gray-400 text-white px-6 py-3 rounded-lg cursor-not-allowed"
                  >
                    Out of Stock
                  </button>
                </div>
              )}

              {addToCartMutation.error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">
                    {addToCartMutation.error instanceof Error
                      ? addToCartMutation.error.message
                      : "Failed to add to cart"}
                  </p>
                </div>
              )}

              <div className="mt-8 pt-8 border-t border-gray-200">
                <Link
                  href="/products"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  ← Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
