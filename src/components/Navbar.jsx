import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

const Navbar = () => {
  const { getTotalItems } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <nav className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center space-x-2 group">
              <span className="text-3xl group-hover:scale-110 transition duration-300">🏪</span>
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Al-Zohaib Store</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                location.pathname === '/' ? 'text-indigo-600 border-b-2 border-indigo-600' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                location.pathname === '/products' ? 'text-indigo-600 border-b-2 border-indigo-600' : ''
              }`}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className={`text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                location.pathname === '/cart' ? 'text-indigo-600 border-b-2 border-indigo-600' : ''
              }`}
            >
              🛒 Cart ({getTotalItems()})
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="text-gray-600 hover:text-indigo-600 p-2 rounded-full hover:bg-gray-100 transition duration-300"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center justify-between py-4 border-t">
          <Link
            to="/"
            className={`text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/' ? 'text-indigo-600' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/products' ? 'text-indigo-600' : ''
            }`}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className={`text-gray-800 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/cart' ? 'text-indigo-600' : ''
            }`}
          >
            🛒 ({getTotalItems()})
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
