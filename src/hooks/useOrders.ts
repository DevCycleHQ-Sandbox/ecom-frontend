import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { ordersApi } from "../services/api"
import { Order, CreateOrderRequest } from "../types"

export const useOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: ordersApi.getAll,
  })
}

export const useOrder = (id: string) => {
  return useQuery<Order>({
    queryKey: ["order", id],
    queryFn: () => ordersApi.getById(id),
    enabled: !!id,
  })
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateOrderRequest) => ordersApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
  })
}
