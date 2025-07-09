import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { productsApi } from "../services/api"
import { Product } from "../types"

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: productsApi.getAll,
  })
}

interface ProductUpdateData {
  price?: number
  stock_quantity?: number
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductUpdateData }) =>
      productsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error) => {
      console.error("Failed to update product:", error)
    },
  })
}

export const useBulkUpdateProducts = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      productIds,
      data,
    }: {
      productIds: string[]
      data: ProductUpdateData
    }) => {
      // Update all products in parallel
      const updatePromises = productIds.map((id) =>
        productsApi.update(id, data)
      )
      return Promise.all(updatePromises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
    onError: (error) => {
      console.error("Failed to bulk update products:", error)
    },
  })
}

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  })
}
