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

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string
  ) {
    super(message || `API Error: ${status} ${statusText}`)
    this.name = "ApiError"
  }
}

// Helper function to get auth headers
const getAuthHeaders = (): HeadersInit => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

// Helper function to handle fetch responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  // Handle 401 errors (unauthorized)
  if (response.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      // Only redirect if not already on login/register pages
      if (
        !window.location.pathname.includes("/login") &&
        !window.location.pathname.includes("/register")
      ) {
        window.location.href = "/login"
      }
    }
    throw new ApiError(response.status, response.statusText, "Unauthorized")
  }

  let data: any
  const contentType = response.headers.get("content-type")

  try {
    if (contentType && contentType.includes("application/json")) {
      data = await response.json()
    } else {
      data = await response.text()
    }
  } catch {
    throw new ApiError(
      response.status,
      response.statusText,
      "Failed to parse response"
    )
  }

  if (!response.ok) {
    const errorMessage =
      typeof data === "object" && data.error
        ? data.error
        : typeof data === "string"
          ? data
          : `HTTP ${response.status}: ${response.statusText}`

    throw new ApiError(response.status, response.statusText, errorMessage)
  }

  return data
}

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`

  const config: RequestInit = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    return await handleResponse<T>(response)
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError(0, "Network Error", "Unable to connect to server")
    }

    // Handle other unexpected errors
    throw new ApiError(
      500,
      "Unknown Error",
      error instanceof Error ? error.message : "An unexpected error occurred"
    )
  }
}

// Auth API
export const authApi = {
  login: async (data: LoginRequest) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  register: async (data: RegisterRequest) => {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  verifyToken: async () => {
    return apiRequest("/auth/verify", {
      method: "GET",
    })
  },
}

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    return apiRequest<Product[]>("/products", {
      method: "GET",
    })
  },

  getById: async (id: string): Promise<Product> => {
    return apiRequest<Product>(`/products/${id}`, {
      method: "GET",
    })
  },

  create: async (data: CreateProductRequest) => {
    return apiRequest("/products", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: Partial<CreateProductRequest>) => {
    return apiRequest(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return apiRequest(`/products/${id}`, {
      method: "DELETE",
    })
  },
}

// Cart API
export const cartApi = {
  getItems: async (): Promise<CartItem[]> => {
    return apiRequest<CartItem[]>("/cart", {
      method: "GET",
    })
  },

  addItem: async (productId: string, quantity: number) => {
    console.log("Adding to cart:", { productId, quantity })
    const result = await apiRequest("/cart", {
      method: "POST",
      body: JSON.stringify({
        product_id: productId,
        quantity,
      }),
    })
    console.log("Add to cart response:", result)
    return result
  },

  updateItem: async (itemId: string, quantity: number) => {
    return apiRequest(`/cart/${itemId}`, {
      method: "PATCH",
      body: JSON.stringify({ quantity }),
    })
  },

  removeItem: async (itemId: string) => {
    return apiRequest(`/cart/${itemId}`, {
      method: "DELETE",
    })
  },

  clearCart: async () => {
    return apiRequest("/cart", {
      method: "DELETE",
    })
  },
}

// Orders API
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    return apiRequest<Order[]>("/orders", {
      method: "GET",
    })
  },

  getById: async (id: string): Promise<Order> => {
    return apiRequest<Order>(`/orders/${id}`, {
      method: "GET",
    })
  },

  create: async (data: CreateOrderRequest) => {
    return apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  updateStatus: async (id: string, status: string) => {
    return apiRequest(`/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  },
}

// Users API
export const usersApi = {
  getProfile: async (): Promise<User> => {
    return apiRequest<User>("/users/profile", {
      method: "GET",
    })
  },

  getStats: async () => {
    return apiRequest("/users/stats", {
      method: "GET",
    })
  },
}

// Export the ApiError class for use in components
export { ApiError as default }
