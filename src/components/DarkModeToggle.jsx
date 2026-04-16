import React from 'react'
import { useTheme } from '../context/ThemeContext'

const DarkModeToggle = ({ className = '', size = 'medium' }) => {
  const { isDark, toggleTheme } = useTheme()

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12'
  }

  const iconSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative rounded-lg transition-all duration-300 
        hover:bg-gray-100 dark:hover:bg-gray-800 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
        ${sizeClasses[size]} ${className}
      `}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Sun/Moon Icon */}
        <i 
          className={`
            fas ${isDark ? 'fa-sun' : 'fa-moon'} 
            ${iconSizes[size]} 
            transition-all duration-300
            ${isDark ? 'text-yellow-400' : 'text-gray-600 dark:text-gray-400'}
          `}
        ></i>
        
        {/* Animated indicator */}
        {isDark && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        )}
        
        {/* Subtle glow effect */}
        <div 
          className={`
            absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300
            ${isDark ? 'bg-yellow-400' : 'bg-indigo-600'}
            ${isDark ? 'opacity-10' : 'opacity-0'}
          `}
        ></div>
      </div>
    </button>
  )
}

export default DarkModeToggle
