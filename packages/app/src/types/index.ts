export interface Category {
  id: number
  name: string
  slug: string
  description: string
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  stock: number
  images: string[]
  categoryId: number
  category?: Category
  reviews?: Review[]
}

export interface User {
  id: number
  name: string
  email: string
  role: 'customer' | 'admin'
}

export interface CartItem {
  id: number
  productId: number
  product: Product
  quantity: number
}

export interface Cart {
  id: number
  items: CartItem[]
  total: number
}

export interface OrderItem {
  id: number
  productId: number
  product: Product
  quantity: number
  unit_price: number
}

export interface Order {
  id: number
  userId: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
  createdAt: string
}

export interface Review {
  id: number
  userId: number
  productId: number
  rating: number
  comment: string
  user?: Pick<User, 'name'>
  createdAt: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}
