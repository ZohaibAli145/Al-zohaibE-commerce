import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import CategoryCard from '../components/CategoryCard'
import LoadingSpinner from '../components/LoadingSpinner'
import AnimatedBackground from '../components/AnimatedBackground'
import { formatPKR } from '../utils/currency'
import Button from '../components/ui/Button'
import GradientBackground from '../components/ui/GradientBackground'
import Swal from 'sweetalert2'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const slides = [
    {
      id: 1,
      title: "Summer Collection 2024",
      subtitle: "Up to 50% Off",
      description: "Discover our latest summer trends with amazing discounts",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200",
      cta: "Shop Now",
      badge: "NEW"
    },
    {
      id: 2,
      title: "Premium Electronics",
      subtitle: "Latest Technology",
      description: "Get the newest gadgets and electronics",
      image: "https://images.unsplash.com/photo-1547479117-da9abbff3fa0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGdhZGdldHN8ZW58MHx8MHx8fDA%3D",
      cta: "Explore Tech",
      badge: "HOT"
    },
    {
      id: 3,
      title: "Fashion Week Special",
      subtitle: "Runway to Reality",
      description: "High-end fashion at affordable prices",
      image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNsb3RoaW5nfGVufDB8fDB8fHww",
      cta: "View Collection",
      badge: "TRENDING"
    }
  ]

  useEffect(() => {
    fetchFeaturedProducts()
    fetchCategories()
    
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlay])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=8')
      const data = await response.json()
      setFeaturedProducts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load products. Please try again.',
        confirmButtonColor: '#3085d6',
        background: '#fff',
        backdrop: 'rgba(0,0,0,0.8)'
      })
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSubscribe = async () => {
    const { value: email } = await Swal.fire({
      title: 'Subscribe to Newsletter',
      html: `
        <div class="text-center">
          <div class="mb-4">
            <i class="fas fa-envelope text-5xl text-indigo-600"></i>
          </div>
          <p class="text-gray-600 mb-4">Get exclusive deals and early access to sales</p>
        </div>
      `,
      input: 'email',
      inputLabel: 'Enter your email address',
      inputPlaceholder: 'your@email.com',
      showCancelButton: true,
      confirmButtonText: 'Subscribe',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      background: '#fff',
      color: '#000',
      customClass: {
        popup: 'animate__animated animate__fadeInDown'
      }
    })

    if (email) {
      Swal.fire({
        icon: 'success',
        title: '🎉 Welcome to Al-Zohaib Store!',
        html: `
          <div class="text-center">
            <div class="mb-4">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <i class="fas fa-check text-green-600 text-2xl"></i>
              </div>
            </div>
            <p class="font-semibold">Thank you for subscribing!</p>
            <p class="text-sm text-gray-600">Check ${email} for confirmation</p>
          </div>
        `,
        confirmButtonColor: '#3085d6',
        customClass: {
          popup: 'animate__animated animate__fadeInUp'
        }
      })
    }
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 10000) // Resume autoplay after 10 seconds
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Hero Slider */}
      <section className="relative h-96 md:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white px-4 max-w-4xl">
                <div className="mb-4">
                  <span className="inline-block px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold animate-pulse">
                    {slide.badge}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slideInDown">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-2 text-yellow-400 animate-slideInUp animation-delay-200">
                  {slide.subtitle}
                </p>
                <p className="text-lg mb-8 max-w-2xl mx-auto animate-slideInUp animation-delay-400">
                  {slide.description}
                </p>
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block animate-fadeInUp animation-delay-600"
                >
                  {slide.cta}
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-12 h-3 bg-white rounded-full' 
                  : 'w-3 h-3 bg-white/50 rounded-full hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-30"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          onClick={() => goToSlide((currentSlide + 1) % slides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 z-30"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </section>

      {/* Features Bar */}
      <section className="relative py-8 border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: 'fas fa-shipping-fast', title: 'Free Shipping', desc: 'On orders over $50', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { icon: 'fas fa-shield-alt', title: 'Secure Payment', desc: '100% secure transactions', color: 'text-green-600', bg: 'bg-green-50' },
              { icon: 'fas fa-undo', title: 'Easy Returns', desc: '30-day return policy', color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { icon: 'fas fa-headset', title: '24/7 Support', desc: 'Dedicated support team', color: 'text-purple-600', bg: 'bg-purple-50' }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 group hover:scale-105 transition-transform duration-300">
                <div className={`w-14 h-14 ${feature.bg} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${feature.icon} ${feature.color} text-xl`}></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeInUp">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 animate-fadeInUp animation-delay-200">
              Explore our curated collection of premium products
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={category} className="animate-fadeInUp" style={{ animationDelay: `${index * 200}ms` }}>
                <CategoryCard category={category} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fadeInUp">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 animate-fadeInUp animation-delay-200">
              Handpicked items from our premium collection
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="large" text="Loading amazing products..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12 animate-fadeInUp">
            <Link
              to="/products"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 inline-block"
            >
              View All Products
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="relative py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full filter blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full filter blur-3xl animate-float animation-delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold animate-slideInLeft">
                🎉 Limited Time Offers
              </h2>
              <p className="text-xl font-light animate-slideInLeft animation-delay-200">
                Get amazing deals on selected items. Don't miss out on these incredible savings!
              </p>
              
              <div className="space-y-4 animate-slideInLeft animation-delay-400">
                {[
                  { discount: '50%', title: 'Summer Sale', desc: 'Selected clothing items' },
                  { discount: '30%', title: 'Electronics Deal', desc: 'Gadgets and accessories' }
                ].map((deal, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl hover:bg-white/20 transition-all duration-300">
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold">{deal.discount}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{deal.title}</h4>
                      <p className="text-white/80 text-sm">{deal.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link
                to="/deals"
                className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-slideInLeft animation-delay-600"
              >
                View All Deals
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
            
            <div className="text-center animate-slideInRight">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300">
                <div className="mb-6">
                  <i className="fas fa-envelope text-5xl"></i>
                </div>
                <h3 className="text-2xl font-bold mb-4">Subscribe & Get 10% Off</h3>
                <p className="mb-6">Join our newsletter for exclusive offers</p>
                <button
                  onClick={handleSubscribe}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe Now
                  <i className="fas fa-paper-plane ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Real reviews from satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <div className="text-yellow-400">
                      {'⭐'.repeat(5)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Amazing quality products and excellent customer service. Will definitely shop again!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
