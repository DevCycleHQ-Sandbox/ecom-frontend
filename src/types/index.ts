export interface User {
  id: string
  username: string
  email: string
  role: "admin" | "user"
  created_at?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock_quantity: number
  created_at?: string
  updated_at?: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at?: string
  updated_at?: string
  product?: Product
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shipping_address: string
  card_number: string
  created_at: string
  updated_at: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  name?: string
  image_url?: string
  created_at?: string
  product?: Product
}

export interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

export interface CartContextType {
  cartItems: CartItem[]
  addToCart: (productId: string, quantity: number) => Promise<void>
  updateCartItem: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  loading: boolean
  cartTotal: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  image_url: string
  category: string
  stock_quantity: number
}

export interface CreateOrderRequest {
  shipping_address: string
  card_number: string
  items: {
    product_id: string
    quantity: number
    price: number
  }[]
}
