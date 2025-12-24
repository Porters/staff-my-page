import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs text-gray-400 dark:text-gray-500 mb-1">{label}</label>
        )}
        <input
          ref={ref}
          className={`w-full h-10 px-2 py-1 bg-[#F8F9FB] dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
            error ? 'ring-2 ring-red-500 dark:ring-red-400' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
