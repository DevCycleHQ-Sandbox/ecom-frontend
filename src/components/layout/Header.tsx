"use client"

import Link from "next/link"
import { useAuth } from "../../contexts/AuthContext"
import { useCartContext } from "../../contexts/CartContext"

export default function Header() {
  const { user, logout } = useAuth()
  const { totalItems } = useCartContext()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Shopper
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-800"
            >
              Products
            </Link>
            {user?.role === "admin" && (
              <Link href="/admin" className="text-gray-600 hover:text-gray-800">
                Admin
              </Link>
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Cart */}
                <Link href="/cart" className="relative">
                  <div className="flex items-center text-gray-600 hover:text-gray-800">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"
                      />
                    </svg>
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {totalItems}
                      </span>
                    )}
                  </div>
                </Link>

                {/* User Menu */}
                <div className="relative group">
                  <button className="text-gray-600 hover:text-gray-800">
                    {user.username}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
