import { create } from 'zustand'

type Theme = 'light' | 'dark'
type Language = 'en' | 'ja'

interface AppSettingsState {
  theme: Theme
  language: Language
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  toggleTheme: () => void
}

export const useAppSettings = create<AppSettingsState>((set) => ({
  theme: (localStorage.getItem('theme') as Theme) || 'light',
  language: (localStorage.getItem('language') as Language) || 'en',

  setTheme: (theme) => {
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    set({ theme })
  },

  setLanguage: (language) => {
    localStorage.setItem('language', language)
    set({ language })
  },

  toggleTheme: () =>
    set((state) => {
      console.log('Toggling theme')
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      return { theme: newTheme }
    }),
}))

// Initialize theme on load
const storedTheme = localStorage.getItem('theme') as Theme
if (storedTheme === 'dark') {
  document.documentElement.classList.add('dark')
}
