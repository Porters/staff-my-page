import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Input, Button, LanguageSwitcher } from '../components'
import { useAuthStore } from '../store/authStore'
import img from '../assets/icon.svg'
import type { LoginCredentials, OtpVerification } from '../types'

export const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials')
  const [username, setUsername] = useState('')
  const [isLoginSumbitting, setIsLoginSubmitting] = useState(false)
  const [userType, setUserType] = useState<'staff' | 'staffingAgency'>('staffingAgency')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(120)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer for OTP
  useEffect(() => {
    console.log('step', step, 'countdown', countdown)
    if (step === 'otp' && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, countdown])

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

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char
      }
    })
    setOtp(newOtp)

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((val) => !val)
    const focusIndex = nextEmptyIndex === -1 ? 5 : Math.min(nextEmptyIndex, 5)
    otpInputRefs.current[focusIndex]?.focus()
  }

  const loginMutation = useMutation({
    mutationFn: async (_credentials: LoginCredentials) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { requiresOtp: true }
    },
    onSuccess: (data) => {
      if (data.requiresOtp && step === 'credentials' && isLoginSumbitting) {
        setCountdown(120)
        setOtp(['', '', '', '', '', ''])
        setStep('otp')
        // Focus first input after state update
        setTimeout(() => otpInputRefs.current[0]?.focus(), 0)
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

  const handleCancelOtp = () => {
    setStep('credentials')
    setCountdown(0)
    setOtp(['', '', '', '', '', ''])
    setIsLoginSubmitting(false)
    loginMutation.reset()
  }

  const triggerLogin = () => {
    setIsLoginSubmitting(true)
  }

  const onOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join('')
    if (otpCode.length !== 6) return

    const otpData: OtpVerification = {
      username,
      otp: otpCode,
    }
    otpMutation.mutate(otpData)
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#F8F9FB] dark:bg-gray-900 flex items-center justify-center relative transition-colors">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img width={80} height={80} src={img} alt="Logo Text" />
          </div>
          <h1 className="text-4xl font-bold  mb-2">{t('staffManagement')}</h1>
        </div>
      </div>
      <div className="w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center transition-colors relative">
      <div className="absolute top-4 right-4">
         <LanguageSwitcher />
      </div>
        <div className="w-[320px] flex flex-col gap-6">
          <h2 className="text-base font-bold text-center text-black dark:text-white">
            {step === 'credentials' ? t('login') : t('verifyOtp')}
          </h2>
          {step === 'otp' && (
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Please input the OTP code has been sent to your email.
            </p>
          )}
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
                  onClick={triggerLogin}
                >
                  {loginMutation.isPending ? `${t('loading')}` : t('login')}
                </Button>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-green-600 hover:opacity-80"
                >
                  {t('forgotPassword')}
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={onOtpSubmit} className="flex flex-col gap-6">
              {/* OTP Input Boxes */}
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    className="w-12 h-12 text-center text-xl font-semibold rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="•"
                  />
                ))}
              </div>

              {/* Countdown Timer */}
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Expires in{' '}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {countdown}s
                  </span>
                </p>
              </div>

              {otpMutation.isError && (
                <p className="text-sm text-center text-red-600 dark:text-red-400">{t('error')}</p>
              )}

              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  onClick={handleCancelOtp}
                  className="flex-1"
                  type="button"
                >
                  {t('cancel')}
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={otpMutation.isPending || otp.join('').length !== 6 || countdown === 0}
                >
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
