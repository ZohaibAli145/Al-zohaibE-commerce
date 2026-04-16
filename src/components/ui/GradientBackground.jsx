import React from 'react'
import { BRAND_COLORS, BRAND_GRADIENTS } from './BrandColors'

const GradientBackground = ({ children, variant = 'default' }) => {
  const gradients = {
    default: 'bg-gradient-to-br from-[#f0f9ff] via-white to-[#faf5ff] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155]',
    dark: 'bg-gradient-to-br from-[#171717] via-[#262626] to-[#581c87]',
    hero: 'bg-gradient-to-br from-[#0ea5e9] via-[#9333ea] to-[#f59e0b] dark:from-[#38bdf8] dark:via-[#7c3aed] dark:to-[#f59e0b]',
    product: 'bg-gradient-to-br from-[#fafafa] to-[#f5f5f5] dark:from-[#1e293b] dark:to-[#334155]',
    footer: 'bg-gradient-to-br from-[#171717] to-[#262626] dark:from-[#0f172a] dark:to-[#1e293b]',
    subtle: 'bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] dark:from-[#1e293b] dark:to-[#334155]'
  }
  
  return (
    <div className={`min-h-screen ${gradients[variant]} relative overflow-hidden transition-all duration-300`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob transition-colors duration-300 bg-sky-400 dark:bg-sky-600"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 transition-colors duration-300 bg-purple-400 dark:bg-purple-600"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 transition-colors duration-300 bg-amber-400 dark:bg-amber-600"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default GradientBackground
