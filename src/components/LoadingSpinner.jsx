import React from 'react'

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
    xl: 'h-20 w-20'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}></div>
        {/* Middle ring */}
        <div className={`absolute inset-0 ${sizeClasses[size]} border-4 border-indigo-200 rounded-full animate-spin animation-delay-150`}></div>
        {/* Inner ring */}
        <div className={`absolute inset-2 ${sizeClasses[size]} border-4 border-purple-200 rounded-full animate-spin animation-delay-300`}></div>
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      {text && (
        <div className="text-center">
          <p className="text-gray-600 font-medium animate-pulse">{text}</p>
          <div className="flex justify-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce animation-delay-200"></div>
            <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce animation-delay-400"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoadingSpinner
