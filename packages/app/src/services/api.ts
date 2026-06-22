import axios from 'axios'
import type { Product, Category, Cart, Order, Review, PaginatedResponse, AuthTokens, User } from '@/types'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      const refresh = localStorage.getItem('refreshToken')
      if (refresh) {
        try {
          const { data } = await axios.post<AuthTokens>(
            `${import.meta.env.VITE_API_URL ?? '/api'}/auth/refresh`,
            { refreshToken: refresh },
          )
          localStorage.setItem('accessToken', data.accessToken)
          err.config.headers.Authorization = `Bearer ${data.accessToken}`
          return http(err.config)
        } catch {
          localStorage.clear()
          window.location.href = '/login'
        }
      }
    }
    return Promise.reject(err)
  },
)

export const authApi = {
  register: (body: { name: string; email: string; password: string }) =>
    http.post<AuthTokens>('/auth/register', body).then((r) => r.data),
  login: (body: { email: string; password: string }) =>
    http.post<AuthTokens>('/auth/login', body).then((r) => r.data),
  logout: () => http.delete('/auth/logout'),
}

export const productsApi = {
  list: (params?: { category?: string; page?: number; limit?: number; sort?: string }) =>
    http.get<PaginatedResponse<Product>>('/products', { params }).then((r) => r.data),
  get: (slug: string) => http.get<Product>(`/products/${slug}`).then((r) => r.data),
  create: (body: Partial<Product>) => http.post<Product>('/products', body).then((r) => r.data),
  update: (id: number, body: Partial<Product>) =>
    http.put<Product>(`/products/${id}`, body).then((r) => r.data),
  remove: (id: number) => http.delete(`/products/${id}`),
}

export const categoriesApi = {
  list: () => http.get<Category[]>('/categories').then((r) => r.data),
  get: (slug: string) => http.get<Category>(`/categories/${slug}`).then((r) => r.data),
}

export const cartApi = {
  get: () => http.get<Cart>('/cart').then((r) => r.data),
  addItem: (productId: number, quantity: number) =>
    http.post<Cart>('/cart/items', { productId, quantity }).then((r) => r.data),
  updateItem: (itemId: number, quantity: number) =>
    http.put<Cart>(`/cart/items/${itemId}`, { quantity }).then((r) => r.data),
  removeItem: (itemId: number) => http.delete<Cart>(`/cart/items/${itemId}`).then((r) => r.data),
  clear: () => http.delete('/cart'),
}

export const ordersApi = {
  list: () => http.get<Order[]>('/orders').then((r) => r.data),
  get: (id: number) => http.get<Order>(`/orders/${id}`).then((r) => r.data),
  checkout: () => http.post<Order>('/orders').then((r) => r.data),
}

export const reviewsApi = {
  list: (productId: number) =>
    http.get<Review[]>(`/products/${productId}/reviews`).then((r) => r.data),
  create: (productId: number, body: { rating: number; comment: string }) =>
    http.post<Review>(`/products/${productId}/reviews`, body).then((r) => r.data),
}

export const usersApi = {
  me: () => http.get<User>('/users/me').then((r) => r.data),
  update: (body: Partial<User>) => http.put<User>('/users/me', body).then((r) => r.data),
}
