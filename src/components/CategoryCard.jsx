import React from 'react'
import { Link } from 'react-router-dom'

const CategoryCard = ({ category, index }) => {
  const categoryData = {
    'electronics': {
      icon: '📱',
      color: 'from-blue-500 to-cyan-500',
      bgPattern: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      itemCount: '245 Products'
    },
    'jewelery': {
      icon: '💎',
      color: 'from-purple-500 to-pink-500',
      bgPattern: 'bg-gradient-to-br from-purple-50 to-pink-50',
      itemCount: '89 Products'
    },
    "men's clothing": {
      icon: '👔',
      color: 'from-green-500 to-emerald-500',
      bgPattern: 'bg-gradient-to-br from-green-50 to-emerald-50',
      itemCount: '167 Products'
    },
    "women's clothing": {
      icon: '👗',
      color: 'from-pink-500 to-rose-500',
      bgPattern: 'bg-gradient-to-br from-pink-50 to-rose-50',
      itemCount: '312 Products'
    }
  }

  const data = categoryData[category] || {
    icon: '📦',
    color: 'from-gray-500 to-gray-600',
    bgPattern: 'bg-gradient-to-br from-gray-50 to-gray-100',
    itemCount: '0 Products'
  }

  return (
    <Link
      to={`/products?category=${category}`}
      className="group block transform transition-all duration-500 hover:scale-105"
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Background Pattern */}
        <div className={`absolute inset-0 ${data.bgPattern} opacity-50`}></div>
        
        {/* Animated Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
        
        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Icon Container */}
          <div className="relative mb-6">
            <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${data.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 transform group-hover:rotate-6 group-hover:scale-110`}>
              <span className="text-4xl filter drop-shadow-md">{data.icon}</span>
            </div>
            
            {/* Floating particles */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full animate-float opacity-60"></div>
            <div className="absolute top-4 right-2 w-1 h-1 bg-white rounded-full animate-float animation-delay-1000 opacity-40"></div>
            <div className="absolute bottom-2 left-4 w-1.5 h-1.5 bg-white rounded-full animate-float animation-delay-2000 opacity-50"></div>
          </div>
          
          {/* Category Name */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 capitalize group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500">
            {category}
          </h3>
          
          {/* Item Count */}
          <p className="text-sm text-gray-600 mb-4">{data.itemCount}</p>
          
          {/* Shop Now Button */}
          <div className="relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${data.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <span className={`relative z-10 inline-flex items-center text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${data.color} group-hover:text-white transition-all duration-500`}>
              Shop Now
              <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-500"></i>
            </span>
          </div>
        </div>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        
        {/* Decorative Elements */}
        <div className="absolute top-2 right-2 w-8 h-8 border-2 border-current rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform rotate-45"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-2 border-current rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 transform -rotate-12"></div>
      </div>
    </Link>
  )
}

export default CategoryCard
