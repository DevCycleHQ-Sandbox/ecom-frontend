import { useQuery } from "@tanstack/react-query"
import { productsApi } from "../services/api"
import { Product } from "../types"

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: productsApi.getAll,
  })
}

export const useProduct = (id: string) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  })
}
