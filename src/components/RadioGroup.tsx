import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface RadioOption {
  label: string
  value: string | number
}

interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  options: RadioOption[]
  error?: string
  name: string
}

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ label, options, error, name, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
        <div className="space-y-2">
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                ref={ref}
                type="radio"
                name={name}
                value={option.value}
                className={`h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 ${className}`}
                {...props}
              />
              <label className="ml-2 text-sm text-gray-700 cursor-pointer">{option.label}</label>
            </div>
          ))}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'
