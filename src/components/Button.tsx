import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'

  const variantClasses = {
    primary:
      'bg-[#3B5AF7] !text-white hover:bg-[#2E48C5] focus:ring-[#3B5AF7] disabled:bg-blue-300 rounded-full border-0',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100 border border-gray-300',
    danger:
      'bg-red-600 !text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300 border-0',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border-0',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm h-9',
    md: 'px-4 py-[5px] text-sm h-[44px] gap-1',
    lg: 'px-6 py-3 text-lg h-14',
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
        disabled ? 'cursor-not-allowed opacity-60' : ''
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
