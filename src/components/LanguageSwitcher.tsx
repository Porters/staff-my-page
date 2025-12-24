import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppSettings } from '../store/appSettings'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const { language, setLanguage } = useAppSettings()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = {
    en: 'English',
    ja: 'Japanese',
  }

  const handleLanguageChange = (lang: 'en' | 'ja') => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <span>{languages[language]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
              language === 'en'
                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange('ja')}
            className={`w-full text-left px-4 py-2 text-sm transition-colors ${
              language === 'ja'
                ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Japanese
          </button>
        </div>
      )}
    </div>
  )
}
