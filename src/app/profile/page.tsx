"use client"

import { useRouter } from "next/navigation"
import Header from "../../components/layout/Header"
import { useAuth } from "../../contexts/AuthContext"

export default function ProfilePage() {
  const { user, logout, loading } = useAuth()
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <p className="mt-1 text-gray-900">{user.username}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <p className="mt-1 text-gray-900">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <p className="mt-1 text-gray-900 capitalize">{user.role}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
