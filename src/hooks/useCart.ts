import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { cartApi } from "../services/api"
import { CartItem } from "../types"

export const useCart = () => {
  return useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await cartApi.getItems()
      return Array.isArray(response) ? response : []
    },
  })
}

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: string
      quantity: number
    }) => {
      console.log("useAddToCart mutationFn called with:", {
        productId,
        quantity,
      })
      return cartApi.addItem(productId, quantity)
    },
    onSuccess: (data) => {
      console.log("Add to cart success:", data)
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: (error) => {
      console.error("Add to cart error:", error)
    },
  })
}

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartApi.updateItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}

export const useClearCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => cartApi.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}
