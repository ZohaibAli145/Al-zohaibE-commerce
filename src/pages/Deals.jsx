import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { formatPKR, EXCHANGE_RATE, getProductPricing } from '../utils/currency'
import Swal from 'sweetalert2'

const Deals = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
    startCountdown()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      // Add consistent discount to products
      const productsWithDiscount = data.map(product => {
        const pricing = getProductPricing(product, 'deals')
        return {
          ...product,
          discount: pricing.discount,
          originalPrice: pricing.originalPrice,
          price: pricing.discountedPrice
        }
      })
      setProducts(productsWithDiscount)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load deals. Please try again.',
        confirmButtonColor: '#3085d6'
      })
      setLoading(false)
    }
  }

  const startCountdown = () => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 7) // 7 days from now

    const interval = setInterval(() => {
      const now = new Date()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setCountdown({ days, hours, minutes, seconds })
      } else {
        clearInterval(interval)
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(interval)
  }

  const handleQuickBuy = async (product) => {
    addToCart(product)
    
    await Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      html: `
        <div class="text-center">
          <p class="mb-2">${product.title.substring(0, 30)}...</p>
          <p class="text-green-600 font-semibold">You saved ${product.discount}%!</p>
        </div>
      `,
      timer: 2000,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    })
  }

  const DealCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden group">
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
        
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm">
          -{product.discount}%
        </div>
        
        {/* Quick Buy Button */}
        <button
          onClick={() => handleQuickBuy(product)}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-indigo-50 hover:text-indigo-600 transition duration-300"
        >
          <i className="fas fa-bolt text-yellow-500"></i>
        </button>
        
        {/* Timer Badge */}
        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          <i className="fas fa-clock mr-1"></i>Limited Time
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
            ({product.rating?.count || 0} reviews)
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-red-600">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 line-through ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          </div>
          <div className="text-green-600 font-semibold text-sm">
            Save ${(product.originalPrice - product.price).toFixed(2)}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => handleQuickBuy(product)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
          >
            Quick Buy
          </button>
          <Link
            to={`/product/${product.id}`}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 text-center"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              🔥 Hot Deals 🔥
            </h1>
            <p className="text-xl mb-8">Limited time offers - Don't miss out!</p>
            
            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4">Deal Ends In:</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-white text-red-600 rounded-lg p-3">
                    <div className="text-2xl font-bold">{countdown.days}</div>
                    <div className="text-xs">Days</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white text-red-600 rounded-lg p-3">
                    <div className="text-2xl font-bold">{countdown.hours}</div>
                    <div className="text-xs">Hours</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white text-red-600 rounded-lg p-3">
                    <div className="text-2xl font-bold">{countdown.minutes}</div>
                    <div className="text-xs">Minutes</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-white text-red-600 rounded-lg p-3">
                    <div className="text-2xl font-bold">{countdown.seconds}</div>
                    <div className="text-xs">Seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 bg-white shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 py-4 overflow-x-auto">
            <button className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold whitespace-nowrap">
              All Deals
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 whitespace-nowrap">
              Flash Deals
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 whitespace-nowrap">
              Under $25
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 whitespace-nowrap">
              50% Off
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 whitespace-nowrap">
              Last Chance
            </button>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {products.length} Amazing Deals Available
            </h2>
            <div className="flex items-center space-x-4">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>Sort by: Best Deals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Biggest Discount</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <DealCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="text-xl mb-8">Subscribe to get exclusive deals and early access to sales</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Deals
