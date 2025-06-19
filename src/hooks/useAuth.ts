import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authApi } from "../services/api"
import { LoginRequest, RegisterRequest } from "../types"

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data: any) => {
      if (data.token) {
        localStorage.setItem("token", data.token)
        // Invalidate and refetch cart data after login
        queryClient.invalidateQueries({ queryKey: ["cart"] })
      }
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (data: any) => {
      if (data.token) {
        localStorage.setItem("token", data.token)
        // Invalidate and refetch cart data after registration
        queryClient.invalidateQueries({ queryKey: ["cart"] })
      }
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      localStorage.removeItem("token")
      return Promise.resolve()
    },
    onSuccess: () => {
      // Clear all cached data on logout
      queryClient.clear()
    },
  })
}
