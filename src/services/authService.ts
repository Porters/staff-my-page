import { api } from './api'
import type { LoginCredentials, OtpVerification, AuthResponse } from '../types'

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<{ requiresOtp: boolean }>('/auth/login', credentials)
    return response.data
  },

  verifyOtp: async (data: OtpVerification) => {
    const response = await api.post<AuthResponse>('/auth/verify-otp', data)
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token)
    }
    return response.data
  },

  logout: () => {
    localStorage.removeItem('authToken')
  },

  getCurrentUser: async () => {
    const response = await api.get<AuthResponse['user']>('/auth/me')
    return response.data
  },
}
