interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  }

  return (
    <div
      className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizeClasses[size]} ${className}`}
    />
  )
}

export const Loading = ({ text = 'Loading...' }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <Spinner size="lg" />
      <p className="mt-4 text-gray-600">{text}</p>
    </div>
  )
}
