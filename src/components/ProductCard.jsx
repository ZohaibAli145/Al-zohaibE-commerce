import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import Swal from 'sweetalert2'
import { formatPKR, formatPKRShort, getProductPricing } from '../utils/currency'
import Button from './ui/Button'
import { BRAND_COLORS, BRAND_GRADIENTS, BRAND_RADIUS, BRAND_SHADOWS } from './ui/BrandColors'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const [isImageLoading, setIsImageLoading] = useState(true)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Add to cart animation
    const button = e.currentTarget
    button.classList.add('scale-95')
    setTimeout(() => button.classList.remove('scale-95'), 200)
    
    addToCart(product)
    
    await Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      html: `
        <div class="text-center">
          <div class="mb-3">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <i class="fas fa-check text-green-600 text-2xl"></i>
            </div>
          </div>
          <p class="font-semibold text-gray-800">${product.title.substring(0, 30)}...</p>
          <p class="text-green-600 font-medium">Successfully added to cart!</p>
        </div>
      `,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      customClass: {
        popup: 'animate__animated animate__fadeInRight'
      }
    })
  }

  const handleAddToWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Heart animation
    const button = e.currentTarget
    button.classList.add('animate-pulse')
    setTimeout(() => button.classList.remove('animate-pulse'), 1000)
    
    addToWishlist(product)
    
    const action = isInWishlist(product.id) ? 'removed from' : 'added to'
    const icon = isInWishlist(product.id) ? '💔' : '❤️'
    
    await Swal.fire({
      icon: isInWishlist(product.id) ? 'info' : 'success',
      title: `${icon} ${action.charAt(0).toUpperCase() + action.slice(1)} Wishlist!`,
      html: `
        <div class="text-center">
          <p class="font-medium">${product.title.substring(0, 30)}...</p>
          <p class="text-sm text-gray-600">${action} your wishlist</p>
        </div>
      `,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    })
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐')
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push('☆')
    }
    return stars.join('')
  }

  // Get consistent pricing for this product
  const pricing = getProductPricing(product, 'normal')
  
  // Additional pricing info (no hover effects)
  const pricePerMonth = Math.floor(pricing.discountedPricePKR / 12)

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="relative bg-white dark:bg-gray-800 overflow-hidden border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group" style={{borderRadius: BRAND_RADIUS['2xl'], boxShadow: BRAND_SHADOWS.lg}}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)'}}></div>
        
        {/* Product Image Container */}
        <div className="relative overflow-hidden">
          <div className="aspect-w-1 aspect-h-1 w-full h-80 relative" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#0ea5e9] border-t-transparent"></div>
              </div>
            )}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onLoad={() => setIsImageLoading(false)}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
              <button
                onClick={handleAddToWishlist}
                className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
                style={{borderRadius: BRAND_RADIUS.full}}
              >
                <i className={`fas fa-heart text-lg ${isInWishlist(product.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}></i>
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300" style={{borderRadius: BRAND_RADIUS.full}}>
                <i className="fas fa-eye text-gray-600 hover:text-[#0ea5e9]"></i>
              </button>
              <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300" style={{borderRadius: BRAND_RADIUS.full}}>
                <i className="fas fa-share-alt text-gray-600 hover:text-[#0ea5e9]"></i>
              </button>
            </div>
            
            {/* Discount Badge */}
            <div className="absolute top-4 left-4">
              <div className="text-white px-3 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse" style={{background: BRAND_GRADIENTS.danger}}>
                -{pricing.discount}%
              </div>
            </div>
            
            {/* Quick View Badge */}
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500" style={{borderRadius: BRAND_RADIUS.full}}>
              <i className="fas fa-search mr-1"></i>Quick View
            </div>
          </div>
        </div>
        
        {/* Product Details */}
        <div className="p-6 relative z-10">
          {/* Category Tag */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide" style={{color: BRAND_COLORS.primary[700], backgroundColor: BRAND_COLORS.primary[100]}}>
              {product.category}
            </span>
          </div>
          
          {/* Product Title */}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-[#0ea5e9] dark:group-hover:text-[#7dd3fc] transition-colors duration-300">
            {product.title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {renderStars(product.rating?.rate || 0)}
            </div>
            <span className="text-gray-500 text-sm ml-2 dark:text-gray-400">
              ({product.rating?.count || 0})
            </span>
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center mb-3">
            <span className="text-xs font-medium px-2 py-1 rounded-full" style={{color: BRAND_COLORS.success, backgroundColor: BRAND_COLORS.success + '20'}}>
              <i className="fas fa-check-circle mr-1"></i>In Stock
            </span>
          </div>
          
          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold" style={{color: BRAND_COLORS.accent.error}}>
                {formatPKR(pricing.discountedPricePKR)}
              </span>
              <span className="text-sm text-gray-400 line-through dark:text-gray-500">
                {formatPKR(pricing.originalPricePKR)}
              </span>
            </div>
            <div className="text-sm font-semibold px-2 py-1 rounded-full" style={{color: BRAND_COLORS.success, backgroundColor: BRAND_COLORS.success + '20'}}>
              Save {formatPKRShort(pricing.savingsPKR)}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="sm"
              fullWidth
              icon="fas fa-shopping-cart"
            >
              Add to Cart
            </Button>
            <button
              onClick={handleAddToWishlist}
              className="px-4 py-2 border-2 rounded-xl transition-all duration-300"
              style={{borderColor: BRAND_COLORS.accent.error, color: BRAND_COLORS.accent.error}}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = BRAND_COLORS.accent.error + '20'
                e.target.style.borderColor = BRAND_COLORS.accent.error
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.borderColor = BRAND_COLORS.accent.error
              }}
            >
              <i className={`fas fa-heart ${isInWishlist(product.id) ? 'text-red-500' : ''}`}></i>
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="hover:text-[#0ea5e9] dark:hover:text-[#7dd3fc] transition-colors">
                <i className="fas fa-truck mr-1"></i>Free Shipping
              </span>
              <span className="hover:text-[#0ea5e9] dark:hover:text-[#7dd3fc] transition-colors">
                <i className="fas fa-shield-alt mr-1"></i>Secure Payment
              </span>
              <span className="hover:text-[#0ea5e9] dark:hover:text-[#7dd3fc] transition-colors">
                <i className="fas fa-undo mr-1"></i>Easy Returns
              </span>
            </div>
          </div>
        </div>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{background: 'linear-gradient(to top, rgba(14, 165, 233, 0.1) 0%, transparent 100%)'}}></div>
      </div>
    </Link>
  )
}

export default ProductCard
