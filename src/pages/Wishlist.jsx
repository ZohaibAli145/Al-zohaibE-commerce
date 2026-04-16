import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { formatPKR, EXCHANGE_RATE } from '../utils/currency'
import Swal from 'sweetalert2'

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [loading, setLoading] = useState(false)

  // Generate consistent discount based on product ID
  const generateDiscount = (productId) => {
    // Use product ID to generate consistent discount (20-30% for wishlist)
    const seed = productId.toString().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return 20 + (seed % 11) // 20-30% discount
  }

  const handleAddToCart = async (product) => {
    setLoading(true)
    addToCart(product)
    
    await Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      text: `${product.title.substring(0, 30)}... has been added to your cart.`,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    })
    
    setLoading(false)
  }

  const handleRemoveFromWishlist = async (productId) => {
    const result = await Swal.fire({
      title: 'Remove from Wishlist?',
      text: 'Are you sure you want to remove this item from your wishlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    })

    if (result.isConfirmed) {
      removeFromWishlist(productId)
      Swal.fire({
        icon: 'success',
        title: 'Removed!',
        text: 'Item removed from wishlist.',
        timer: 1500,
        showConfirmButton: false
      })
    }
  }

  const handleClearWishlist = async () => {
    const result = await Swal.fire({
      title: 'Clear Wishlist?',
      text: 'Are you sure you want to clear your entire wishlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Clear All',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    })

    if (result.isConfirmed) {
      clearWishlist()
      Swal.fire({
        icon: 'success',
        title: 'Cleared!',
        text: 'Your wishlist has been cleared.',
        timer: 1500,
        showConfirmButton: false
      })
    }
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Start adding items you love to your wishlist.</p>
          <Link
            to="/products"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Wishlist</h1>
            <p className="text-gray-600">You have {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist</p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={handleClearWishlist}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
            <div className="relative">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              </Link>
              <button
                onClick={() => handleRemoveFromWishlist(product.id)}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50 hover:text-red-500 transition duration-300"
              >
                <i className="fas fa-heart text-red-500"></i>
              </button>
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                {Math.floor(Math.random() * 30 + 10)}% OFF
              </div>
            </div>
            
            <div className="p-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-indigo-600 transition">
                  {product.title}
                </h3>
              </Link>
              
              <div className="flex items-center mb-2">
                <div className="text-yellow-400 text-sm">
                  {'⭐'.repeat(Math.floor(product.rating?.rate || 0))}
                </div>
                <span className="text-gray-500 text-sm ml-2">
                  ({product.rating?.count || 0})
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-2xl font-bold text-indigo-600">
                    {formatPKR(product.price * EXCHANGE_RATE)}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    {formatPKR(product.price * 1.25 * EXCHANGE_RATE)}
                  </span>
                </div>
                <div className="text-green-600 font-semibold text-sm">
                  Save {formatPKR(product.price * 0.25 * EXCHANGE_RATE)}
                </div>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 flex items-center justify-center space-x-2"
                >
                  <i className="fas fa-shopping-cart"></i>
                  <span>Add to Cart</span>
                </button>
                
                <Link
                  to={`/product/${product.id}`}
                  className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 flex items-center justify-center space-x-2"
                >
                  <i className="fas fa-eye"></i>
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Wishlist Summary */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Wishlist Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">{wishlist.length}</div>
            <p className="text-gray-600">Total Items</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {formatPKR(wishlist.reduce((total, item) => total + item.price, 0) * EXCHANGE_RATE)}
            </div>
            <p className="text-gray-600">Total Value</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {formatPKR(Math.floor(wishlist.reduce((total, item) => total + item.price, 0) * 0.25 * EXCHANGE_RATE))}
            </div>
            <p className="text-gray-600">Potential Savings</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wishlist
