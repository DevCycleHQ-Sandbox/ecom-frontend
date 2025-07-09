"use client"

import React, { useState } from "react"
import { useBooleanFlagDetails } from "@openfeature/react-sdk"
import {
  useProducts,
  useUpdateProduct,
  useBulkUpdateProducts,
} from "@/hooks/useProducts"
import { Product } from "@/types"

interface ProductUpdateData {
  price?: number
  stock_quantity?: number
}

export default function AdminProductManagement() {
  const { value: enableAdminProductManagement } = useBooleanFlagDetails(
    "enable-admin-product-management",
    false
  )
  const { value: enableBulkActions } = useBooleanFlagDetails(
    "enable-admin-bulk-actions",
    false
  )
  // Future feature: const { value: enableAdvancedFilters } = useBooleanFlag(
  //   "enable-admin-product-filters",
  //   false
  // )

  const { data: products = [], isLoading, error } = useProducts()
  const updateProductMutation = useUpdateProduct()
  const bulkUpdateMutation = useBulkUpdateProducts()

  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<
    Record<string, ProductUpdateData>
  >({})
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [bulkUpdateData, setBulkUpdateData] = useState<ProductUpdateData>({})
  const [showBulkModal, setShowBulkModal] = useState(false)

  // Feature flag loading is handled by the provider

  // Early return for disabled features
  if (!enableAdminProductManagement) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Product Management
        </h2>
        <p className="text-gray-600">
          This feature is not available in your current configuration.
        </p>
      </div>
    )
  }

  const handleEdit = (productId: string, product: Product) => {
    setEditingProduct(productId)
    setEditValues({
      ...editValues,
      [productId]: {
        price: product.price,
        stock_quantity: product.stock_quantity,
      },
    })
  }

  const handleSave = (productId: string) => {
    const updateData = editValues[productId]
    if (updateData) {
      updateProductMutation.mutate(
        { id: productId, data: updateData },
        {
          onSuccess: () => {
            setEditingProduct(null)
            setEditValues({})
          },
        }
      )
    }
  }

  const handleBulkUpdate = (type: "price" | "quantity") => {
    setShowBulkModal(true)
    setBulkUpdateData(type === "price" ? { price: 0 } : { stock_quantity: 0 })
  }

  const handleBulkSave = () => {
    if (selectedProducts.length > 0 && Object.keys(bulkUpdateData).length > 0) {
      bulkUpdateMutation.mutate(
        {
          productIds: selectedProducts,
          data: bulkUpdateData,
        },
        {
          onSuccess: () => {
            setShowBulkModal(false)
            setSelectedProducts([])
            setBulkUpdateData({})
          },
        }
      )
    }
  }

  const handleCancel = () => {
    setEditingProduct(null)
    setEditValues({})
  }

  const handleInputChange = (
    productId: string,
    field: keyof ProductUpdateData,
    value: string
  ) => {
    setEditValues({
      ...editValues,
      [productId]: {
        ...editValues[productId],
        [field]:
          field === "price" ? parseFloat(value) || 0 : parseInt(value) || 0,
      },
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const handleBulkSelect = (productId: string, selected: boolean) => {
    if (selected) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    }
  }

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedProducts(products.map((p) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Product Management
        </h2>
        <p className="text-red-600">
          Failed to load products. Please try again.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Product Management
        </h2>
        {enableBulkActions && selectedProducts.length > 0 && (
          <div className="flex space-x-2">
            <button
              onClick={() => handleBulkUpdate("price")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
            >
              Bulk Update Price
            </button>
            <button
              onClick={() => handleBulkUpdate("quantity")}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
            >
              Bulk Update Quantity
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {enableBulkActions && (
                <th className="text-left py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === products.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                </th>
              )}
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Product
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Price
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Stock
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                {enableBulkActions && (
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={(e) =>
                        handleBulkSelect(product.id, e.target.checked)
                      }
                      className="rounded border-gray-300"
                    />
                  </td>
                )}
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg"></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {editingProduct === product.id ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editValues[product.id]?.price || ""}
                      onChange={(e) =>
                        handleInputChange(product.id, "price", e.target.value)
                      }
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {editingProduct === product.id ? (
                    <input
                      type="number"
                      value={editValues[product.id]?.stock_quantity || ""}
                      onChange={(e) =>
                        handleInputChange(
                          product.id,
                          "stock_quantity",
                          e.target.value
                        )
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span
                      className={`text-gray-900 ${product.stock_quantity === 0 ? "text-red-600" : ""}`}
                    >
                      {product.stock_quantity}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {editingProduct === product.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(product.id)}
                        disabled={updateProductMutation.isPending}
                        className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm disabled:opacity-50"
                      >
                        {updateProductMutation.isPending ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={updateProductMutation.isPending}
                        className="bg-gray-600 text-white px-3 py-1 rounded-md hover:bg-gray-700 text-sm disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(product.id, product)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}

      {/* Bulk Update Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Bulk Update{" "}
              {bulkUpdateData.price !== undefined ? "Price" : "Quantity"}
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New {bulkUpdateData.price !== undefined ? "Price" : "Quantity"}
              </label>
              <input
                type="number"
                step={bulkUpdateData.price !== undefined ? "0.01" : "1"}
                value={
                  bulkUpdateData.price || bulkUpdateData.stock_quantity || ""
                }
                onChange={(e) => {
                  const value = parseFloat(e.target.value) || 0
                  setBulkUpdateData(
                    bulkUpdateData.price !== undefined
                      ? { price: value }
                      : { stock_quantity: value }
                  )
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={bulkUpdateData.price !== undefined ? "0.00" : "0"}
              />
            </div>
            <div className="text-sm text-gray-600 mb-4">
              This will update {selectedProducts.length} selected product(s).
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowBulkModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkSave}
                disabled={bulkUpdateMutation.isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {bulkUpdateMutation.isPending ? "Updating..." : "Update All"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
