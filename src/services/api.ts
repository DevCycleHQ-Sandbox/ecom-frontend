import axios from "axios"
import {
  User,
  Product,
  CartItem,
  Order,
  LoginRequest,
  RegisterRequest,
  CreateProductRequest,
  CreateOrderRequest,
} from "../types"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      // Only redirect if not already on login/register pages
      if (
        typeof window !== "undefined" &&
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/register")
      ) {
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authApi = {
  login: async (data: LoginRequest) => {
    const response = await api.post("/auth/login", data)
    return response.data
  },

  register: async (data: RegisterRequest) => {
    const response = await api.post("/auth/register", data)
    return response.data
  },

  verifyToken: async () => {
    const response = await api.get("/auth/verify")
    return response.data
  },
}

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get("/products")
    return response.data
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  create: async (data: CreateProductRequest) => {
    const response = await api.post("/products", data)
    return response.data
  },

  update: async (id: string, data: Partial<CreateProductRequest>) => {
    const response = await api.put(`/products/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },
}

// Cart API
export const cartApi = {
  getItems: async (): Promise<CartItem[]> => {
    const response = await api.get("/cart")
    return response.data
  },

  addItem: async (productId: string, quantity: number) => {
    console.log("Adding to cart:", { productId, quantity })
    const response = await api.post("/cart", {
      product_id: productId,
      quantity,
    })
    console.log("Add to cart response:", response.data)
    return response.data
  },

  updateItem: async (itemId: string, quantity: number) => {
    const response = await api.patch(`/cart/${itemId}`, { quantity })
    return response.data
  },

  removeItem: async (itemId: string) => {
    const response = await api.delete(`/cart/${itemId}`)
    return response.data
  },

  clearCart: async () => {
    const response = await api.delete("/cart")
    return response.data
  },
}

// Orders API
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    const response = await api.get("/orders")
    return response.data
  },

  getById: async (id: string): Promise<Order> => {
    const response = await api.get(`/orders/${id}`)
    return response.data
  },

  create: async (data: CreateOrderRequest) => {
    const response = await api.post("/orders", data)
    return response.data
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.put(`/orders/${id}/status`, { status })
    return response.data
  },
}

// Users API
export const usersApi = {
  getProfile: async (): Promise<User> => {
    const response = await api.get("/users/profile")
    return response.data
  },

  getStats: async () => {
    const response = await api.get("/users/stats")
    return response.data
  },
}

export default api
