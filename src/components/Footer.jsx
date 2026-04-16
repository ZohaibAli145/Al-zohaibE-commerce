import React from 'react'
import { Link } from 'react-router-dom'
import { formatPKR } from '../utils/currency'
import { useTheme } from '../context/ThemeContext'

const Footer = () => {
  const { isDark } = useTheme()

  return (
    <footer className="bg-gray-900 text-white dark:bg-gray-950">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-8 dark:from-indigo-700 dark:to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="mb-6 max-w-2xl mx-auto">Get the latest updates on new products and exclusive offers delivered straight to your inbox.</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              />
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold">Al-Zohaib Store</span>
            </div>
            <p className="text-gray-300 mb-4 dark:text-gray-400">
              Your trusted online shopping destination for quality products at unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition dark:text-gray-500 dark:hover:text-white">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition dark:text-gray-500 dark:hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition dark:text-gray-500 dark:hover:text-white">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition dark:text-gray-500 dark:hover:text-white">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition dark:text-gray-400 dark:hover:text-white">About Us</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition dark:text-gray-400 dark:hover:text-white">All Products</Link></li>
              <li><Link to="/deals" className="text-gray-300 hover:text-white transition dark:text-gray-400 dark:hover:text-white">Hot Deals</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition dark:text-gray-400 dark:hover:text-white">Contact Us</Link></li>
              <li><Link to="/wishlist" className="text-gray-300 hover:text-white transition dark:text-gray-400 dark:hover:text-white">Wishlist</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition dark:text-gray-400 dark:hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition dark:text-gray-400 dark:hover:text-white">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition dark:text-gray-400 dark:hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition dark:text-gray-400 dark:hover:text-white">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition dark:text-gray-400 dark:hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-map-marker-alt text-indigo-400"></i>
                <span className="text-gray-300 dark:text-gray-400">123 Shopping Street, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-phone text-indigo-400"></i>
                <span className="text-gray-300 dark:text-gray-400">+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-indigo-400"></i>
                <span className="text-gray-300 dark:text-gray-400">info@alzohaibstore.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-clock text-indigo-400"></i>
                <span className="text-gray-300 dark:text-gray-400">Mon-Fri: 9AM-8PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400 dark:text-gray-500">Free shipping on orders over {formatPKR(14000)}</p>
              <div className="flex space-x-2 mt-2">
                <i className="fab fa-cc-visa text-2xl text-gray-400 dark:text-gray-500"></i>
                <i className="fab fa-cc-mastercard text-2xl text-gray-400 dark:text-gray-500"></i>
                <i className="fab fa-cc-amex text-2xl text-gray-400 dark:text-gray-500"></i>
                <i className="fab fa-cc-paypal text-2xl text-gray-400 dark:text-gray-500"></i>
                <i className="fab fa-apple-pay text-2xl text-gray-400 dark:text-gray-500"></i>
                <i className="fab fa-google-pay text-2xl text-gray-400 dark:text-gray-500"></i>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 dark:text-gray-500">
                2024 Al-Zohaib Store. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-2 justify-center md:justify-end">
                <a href="#" className="text-sm text-gray-400 hover:text-white transition dark:text-gray-500 dark:hover:text-white">Terms of Service</a>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition dark:text-gray-500 dark:hover:text-white">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
