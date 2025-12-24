import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  title?: string
  subtitle?: string
  footer?: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  padding = 'md',
}: CardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {(title || subtitle) && (
        <div className={`border-b ${paddingClasses[padding]}`}>
          {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className={paddingClasses[padding]}>{children}</div>
      {footer && <div className={`border-t ${paddingClasses[padding]}`}>{footer}</div>}
    </div>
  )
}
