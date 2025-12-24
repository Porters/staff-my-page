import { forwardRef } from 'react'
import { format } from 'date-fns'

interface DatePickerProps {
  label?: string
  value?: Date | null
  onChange: (date: Date | null) => void
  error?: string
  placeholder?: string
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, value, onChange, error, placeholder = 'Select date' }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateValue = e.target.value
      onChange(dateValue ? new Date(dateValue) : null)
    }

    const formattedValue = value ? format(value, 'yyyy-MM-dd') : ''

    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input
          ref={ref}
          type="date"
          value={formattedValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-red-500' : ''
          }`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

DatePicker.displayName = 'DatePicker'
