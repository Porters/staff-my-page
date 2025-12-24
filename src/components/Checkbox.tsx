import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="flex items-center">
          <input
            ref={ref}
            type="checkbox"
            className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
          />
          {label && <label className="ml-2 text-sm text-gray-700 cursor-pointer">{label}</label>}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'
