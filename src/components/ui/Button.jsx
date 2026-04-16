import React from 'react'
import { BRAND_COLORS, BRAND_GRADIENTS, BRAND_RADIUS, BRAND_SHADOWS } from './BrandColors'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  loading = false,
  icon = null,
  fullWidth = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden group'
  
  const variants = {
    primary: `bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white hover:from-[#0284c7] hover:to-[#0369a1] focus:ring-[#0ea5e9] shadow-lg hover:shadow-xl`,
    secondary: `bg-gradient-to-r from-[#a855f7] to-[#9333ea] text-white hover:from-[#9333ea] hover:to-[#7c3aed] focus:ring-[#a855f7] shadow-lg hover:shadow-xl`,
    accent: `bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-white hover:from-[#d97706] hover:to-[#b45309] focus:ring-[#f59e0b] shadow-lg hover:shadow-xl`,
    success: `bg-gradient-to-r from-[#10b981] to-[#059669] text-white hover:from-[#059669] hover:to-[#047857] focus:ring-[#10b981] shadow-lg hover:shadow-xl`,
    danger: `bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white hover:from-[#dc2626] hover:to-[#b91c1c] focus:ring-[#ef4444] shadow-lg hover:shadow-xl`,
    outline: `border-2 border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-white focus:ring-[#0ea5e9] bg-white`,
    ghost: `text-[#0ea5e9] hover:bg-[#f0f9ff] focus:ring-[#0ea5e9] dark:text-[#7dd3fc] dark:hover:bg-[#1e3a8a]`,
    premium: `bg-gradient-to-r from-[#0ea5e9] via-[#9333ea] to-[#f59e0b] text-white hover:from-[#0284c7] hover:via-[#7c3aed] hover:to-[#d97706] focus:ring-[#0ea5e9] shadow-lg hover:shadow-xl`,
    subtle: `bg-[#f8fafc] text-[#1e293b] border border-[#e2e8f0] hover:bg-[#f1f5f9] hover:border-[#cbd5e1] focus:ring-[#0ea5e9] shadow-sm hover:shadow-md`
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  }
  
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
    ${className}
  `
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        borderRadius: BRAND_RADIUS.lg,
        boxShadow: BRAND_SHADOWS.brand
      }}
      {...props}
    >
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Button content */}
      <div className="relative flex items-center justify-center space-x-2">
        {loading && (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent"></div>
        )}
        {icon && !loading && <i className={`fas ${icon}`}></i>}
        <span className="font-medium">{children}</span>
      </div>
      
      {/* Ripple effect on click */}
      <div className="absolute inset-0 rounded-xl bg-white/30 scale-0 group-active:scale-100 transition-transform duration-200"></div>
    </button>
  )
}

export default Button
