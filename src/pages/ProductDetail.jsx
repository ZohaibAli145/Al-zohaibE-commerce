import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPKR, EXCHANGE_RATE } from '../utils/currency'
import { toast } from 'react-toastify'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await response.json()
      setProduct(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching product:', error)
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    toast.success(`${quantity} ${product.title.substring(0, 20)}... added to cart!`)
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Product not found.</p>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-800">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/products" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
        ← Back to Products
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
          
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-lg">
                {renderStars(product.rating?.rate || 0)}
              </span>
              <span className="text-gray-500 text-sm ml-2">
                ({product.rating?.count || 0} reviews)
              </span>
            </div>
            
            <p className="text-4xl font-bold text-indigo-600 mb-6">
              {formatPKR(product.price * EXCHANGE_RATE)}
            </p>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>
            
            <p className="text-gray-500 mb-6">
              <span className="font-semibold">Category:</span>{' '}
              <span className="capitalize">{product.category}</span>
            </p>
            
            <div className="flex items-center space-x-4 mb-6">
              <label className="text-gray-700 font-semibold">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-l border-r border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 flex items-center space-x-2"
              >
                <span>🛒</span>
                <span>Add to Cart</span>
              </button>
              
              <button
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
              >
                ❤️ Wishlist
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• High quality materials</li>
                <li>• Fast shipping available</li>
                <li>• 30-day return policy</li>
                <li>• Customer support available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
