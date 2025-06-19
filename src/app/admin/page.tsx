"use client"

import { useRouter } from "next/navigation"
import Header from "../../components/layout/Header"
import { useAuth } from "../../contexts/AuthContext"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

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

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Access Denied
            </h1>
            <p className="text-gray-600 mb-6">
              You don&apos;t have permission to access this page.
            </p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Product Management
            </h2>
            <p className="text-gray-600 mb-4">
              Add, edit, and remove products from the catalog.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Manage Products
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Management
            </h2>
            <p className="text-gray-600 mb-4">
              View and manage customer orders.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              View Orders
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              User Management
            </h2>
            <p className="text-gray-600 mb-4">
              Manage user accounts and permissions.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Manage Users
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
