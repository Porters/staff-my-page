import { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { authService } from '../services/authService'
import { ThemeToggle, LanguageSwitcher } from '../components'

const menuItems = [
  { id: 1, label: 'table', path: '/dashboard/table1' },
  { id: 2, label: 'dynamicForm', path: '/dashboard/form' },
  { id: 3, label: 'table', path: '/dashboard/table2' },
  { id: 4, label: 'table', path: '/dashboard/table3' },
]

export const DashboardPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleLogout = () => {
    authService.logout()
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('staffManagement')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('welcome')}, {user?.username}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'w-64' : 'w-0'
          } bg-white dark:bg-gray-800 shadow-md transition-all duration-300 overflow-hidden`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t(item.label)}{' '}
                {item.id === 1 ? '1' : item.id === 3 ? '2' : item.id === 4 ? '3' : ''}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
