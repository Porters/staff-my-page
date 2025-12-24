export interface User {
  id: string
  username: string
  email: string
  role: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface OtpVerification {
  username: string
  otp: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface TableData {
  id: string
  [key: string]: string | number | boolean | null | undefined
}

export interface PaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: Record<string, string | number | boolean>
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
}

export interface FormField {
  id: string
  type: 'text' | 'number' | 'date' | 'select' | 'textarea'
  label: string
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
  order: number
}
