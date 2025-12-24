import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Input, Button } from '../components'
import { useAuthStore } from '../store/authStore'
import type { LoginCredentials, OtpVerification } from '../types'

export const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials')
  const [username, setUsername] = useState('')
  const [userType, setUserType] = useState<'staff' | 'staffingAgency'>('staffingAgency')

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginCredentials>()

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<{ otp: string }>()

  const loginMutation = useMutation({
    mutationFn: async (_credentials: LoginCredentials) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { requiresOtp: true }
    },
    onSuccess: (data) => {
      if (data.requiresOtp) {
        setStep('otp')
      }
    },
  })

  const otpMutation = useMutation({
    mutationFn: async (data: OtpVerification) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const mockUser = {
        id: '1',
        username: data.username,
        email: `${data.username}@example.com`,
        role: 'admin',
      }
      const mockToken = 'mock-token-' + Date.now()
      localStorage.setItem('authToken', mockToken)
      return { user: mockUser, token: mockToken }
    },
    onSuccess: (data) => {
      setUser(data.user)
      navigate('/dashboard')
    },
  })

  const onLoginSubmit = (data: LoginCredentials) => {
    setUsername(data.username)
    loginMutation.mutate(data)
  }

  const onOtpSubmit = (data: { otp: string }) => {
    const otpData: OtpVerification = {
      username,
      otp: data.otp,
    }
    otpMutation.mutate(otpData)
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#F8F9FB] dark:bg-gray-900 flex items-center justify-center relative transition-colors">
        <div className="text-center">
          <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg transition-colors">
            <svg
              className="w-20 h-20 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold  mb-2">{t('staffManagement')}</h1>
        </div>
      </div>
      <div className="w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center transition-colors relative">
        <div className="w-[320px] flex flex-col gap-6">
          <h2 className="text-base font-bold text-center text-black dark:text-white">
            {step === 'credentials' ? t('login') : t('enterOtp')}
          </h2>
          {step === 'credentials' && (
            <>
              <div className="p-1 bg-[#F8F9FB] dark:bg-gray-800 rounded-full inline-flex">
                <button
                  type="button"
                  onClick={() => setUserType('staff')}
                  className={`w-[145px] px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                    userType === 'staff'
                      ? 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      : 'bg-transparent text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {t('staff')}
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('staffingAgency')}
                  className={`px-4 py-1 rounded-full text-sm font-bold transition-colors ${
                    userType === 'staffingAgency'
                      ? 'bg-white dark:bg-gray-700 text-black dark:text-white opacity-20'
                      : 'bg-transparent text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {t('staffingAgency')}
                </button>
              </div>
            </>
          )}
          {step === 'credentials' ? (
            <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="flex flex-col gap-6">
              <Input
                label={t('email')}
                type="email"
                {...registerLogin('username', { required: t('required') })}
                error={loginErrors.username?.message}
                placeholder={t('emailPlaceholder')}
              />
              <Input
                label={t('password')}
                type="password"
                {...registerLogin('password', { required: t('required') })}
                error={loginErrors.password?.message}
              />
              {loginMutation.isError && (
                <p className="text-sm text-red-600 dark:text-red-400">{t('error')}</p>
              )}
              <div className="flex flex-col gap-4 items-center">
                <Button
                  type="submit"
                  className="w-full"
                  style={{ color: 'white' }}
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? `${t('loading')}` : t('login')}
                </Button>
                <a href="#" className="text-xs font-medium text-green-600 hover:opacity-80">
                  {t('forgotPassword')}
                </a>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit(onOtpSubmit)} className="space-y-6">
              <Input
                label={t('otp')}
                {...registerOtp('otp', { required: t('required') })}
                error={otpErrors.otp?.message}
                placeholder={t('otp')}
                maxLength={6}
              />
              {otpMutation.isError && (
                <p className="text-sm text-red-600 dark:text-red-400">{t('error')}</p>
              )}
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  onClick={() => setStep('credentials')}
                  className="flex-1"
                >
                  {t('cancel')}
                </Button>
                <Button type="submit" className="flex-1" disabled={otpMutation.isPending}>
                  {otpMutation.isPending ? `${t('loading')}` : t('verifyOtp')}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
