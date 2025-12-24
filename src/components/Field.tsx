import { forwardRef } from 'react'
import type {
  ReactNode,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

interface BaseFieldProps {
  label?: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
}

interface InputFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
}

interface TextareaFieldProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number
}

interface SelectFieldProps extends BaseFieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode
}

// Input Field with built-in label, error, and hint
export const Field = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, hint, required, className = '', type = 'text', ...props }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-500' : ''
          }`}
          {...props}
        />
        {hint && !error && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

Field.displayName = 'Field'

// Textarea Field
export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, hint, required, className = '', rows = 4, ...props }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
            error ? 'border-red-500' : ''
          }`}
          {...props}
        />
        {hint && !error && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

TextareaField.displayName = 'TextareaField'

// Select Field
export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, hint, required, className = '', children, ...props }, ref) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-500' : ''
          }`}
          {...props}
        >
          {children}
        </select>
        {hint && !error && <p className="mt-1 text-sm text-gray-500">{hint}</p>}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

SelectField.displayName = 'SelectField'
