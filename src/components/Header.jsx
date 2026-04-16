import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import Swal from 'sweetalert2'
import { formatPKR } from '../utils/currency'
import DarkModeToggle from './DarkModeToggle'
import Button from './ui/Button'
import { BRAND_COLORS, BRAND_GRADIENTS } from './ui/BrandColors'

const Header = () => {
  const { getTotalItems } = useCart()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = async () => {
    const { value: searchQuery } = await Swal.fire({
      title: 'Search Products',
      input: 'text',
      inputLabel: 'Enter product name',
      inputPlaceholder: 'Search for products...',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Search',
      background: isDark ? '#1a1a1a' : '#fff',
      color: isDark ? '#fff' : '#000'
    })

    if (searchQuery) {
      window.location.href = `/products?search=${searchQuery}`
    }
  }

  const handleUserAccount = async () => {
    Swal.fire({
      title: 'User Account',
      html: `
        <div class="text-center">
          <div class="mb-4">
            <i class="fas fa-user-circle text-6xl text-indigo-600"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Welcome to Al-Zohaib Store</h3>
          <p class="text-gray-600 mb-4">Login or create an account to continue</p>
        </div>
      `,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Login',
      denyButtonText: 'Sign Up',
      cancelButtonText: 'Close',
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      background: isDark ? '#1a1a1a' : '#fff',
      color: isDark ? '#fff' : '#000'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Login', 'Login feature coming soon!', 'info')
      } else if (result.isDenied) {
        Swal.fire('Sign Up', 'Sign up feature coming soon!', 'info')
      }
    })
  }

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="hidden md:flex items-center space-x-4">
              <span><i className="fas fa-phone mr-2"></i>+92 336-3537224</span>
              <span><i className="fas fa-envelope mr-2"></i>contact@alzohaibstore.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline"><i className="fas fa-shipping-fast mr-2"></i>Free Shipping on orders over {formatPKR(5000)}</span>
              <DarkModeToggle size="small" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transform transition-all duration-300 group-hover:scale-110" style={{background: BRAND_GRADIENTS.primary}}>
              <span className="text-white font-bold text-xl">AZS</span>
            </div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-[#0ea5e9] dark:group-hover:text-[#7dd3fc] transition-colors duration-300">Al-Zohaib Store</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="w-full px-4 md:px-8 my-4">
  <div className="relative">
    <input
      type="text"
      placeholder="Search products..."
      className="w-full px-5 py-3 pl-14 border border-gray-300 rounded-xl
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 bg-white text-gray-900 placeholder-gray-400
                 transition-all duration-300 hover:shadow-lg"
    />
    <i className="fas fa-search absolute left-5 top-1/2 transform -translate-y-1/2 
                  text-gray-400 hover:text-blue-500 transition-colors duration-300"></i>
  </div>
</div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={handleSearch}
              variant="ghost"
              size="sm"
              icon="fas fa-search"
              className="md:hidden"
            />
            <Button
              onClick={handleUserAccount}
              variant="ghost"
              size="sm"
              icon="fas fa-user"
            />
            <Link
              to="/wishlist"
              className="relative group"
            >
              <Button
                variant="ghost"
                size="sm"
                icon="fas fa-heart"
              />
            </Link>
            <Link
              to="/cart"
              className="relative group"
            >
              <Button
                variant="ghost"
                size="sm"
                icon="fas fa-shopping-cart"
              />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <Button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              variant="ghost"
              size="sm"
              icon="fas fa-bars"
              className="lg:hidden"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center justify-between py-4 border-t dark:border-gray-700">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-indigo-600 font-medium transition dark:text-gray-300 dark:hover:text-indigo-400 ${
                location.pathname === '/' ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : ''
              }`}
            >
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-indigo-600 font-medium transition flex items-center dark:text-gray-300 dark:hover:text-indigo-400">
                Categories <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 dark:bg-gray-800 dark:shadow-xl">
                <Link to="/products?category=electronics" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-indigo-400">
                  <i className="fas fa-laptop mr-2"></i>Electronics
                </Link>
                <Link to="/products?category=jewelery" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-indigo-400">
                  <i className="fas fa-gem mr-2"></i>Jewelry
                </Link>
                <Link to="/products?category=men's clothing" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-indigo-400">
                  <i className="fas fa-tshirt mr-2"></i>Men's Clothing
                </Link>
                <Link to="/products?category=women's clothing" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-indigo-400">
                  <i className="fas fa-female mr-2"></i>Women's Clothing
                </Link>
              </div>
            </div>
            <Link
              to="/products"
              className={`text-gray-700 hover:text-indigo-600 font-medium transition dark:text-gray-300 dark:hover:text-indigo-400 ${
                location.pathname === '/products' ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : ''
              }`}
            >
              All Products
            </Link>
            <Link to="/deals" className="text-gray-700 hover:text-indigo-600 font-medium transition dark:text-gray-300 dark:hover:text-indigo-400">
              <i className="fas fa-fire mr-1 text-red-500"></i>Hot Deals
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium transition dark:text-gray-300 dark:hover:text-indigo-400">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-indigo-600 font-medium transition dark:text-gray-300 dark:hover:text-indigo-400">
              Contact
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-red-500 font-semibold">
              <i className="fas fa-tag mr-1"></i>Special Offers
            </span>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:bg-white lg:border-t dark:lg:bg-gray-800 dark:lg:border-gray-700">
          <div className="px-4 py-2 space-y-2">
            <Link to="/" className="block py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">Home</Link>
            <Link to="/products" className="block py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">All Products</Link>
            <Link to="/deals" className="block py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">Hot Deals</Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">About Us</Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">Contact</Link>
            <div className="pt-2 border-t dark:border-gray-700">
              <DarkModeToggle size="medium" className="w-full" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
