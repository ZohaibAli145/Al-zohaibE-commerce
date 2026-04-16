import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Swal from 'sweetalert2'

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Summer Collection 2024",
      subtitle: "Up to 50% Off",
      description: "Discover our latest summer trends with amazing discounts",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200",
      cta: "Shop Now"
    },
    {
      id: 2,
      title: "Premium Electronics",
      subtitle: "Latest Technology",
      description: "Get the newest gadgets and electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7db1664?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200",
      cta: "Explore Tech"
    },
    {
      id: 3,
      title: "Fashion Week Special",
      subtitle: "Runway to Reality",
      description: "High-end fashion at affordable prices",
      image: "https://images.unsplash.com/photo-1483985988355-763628919326?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200",
      cta: "View Collection"
    }
  ]

  useEffect(() => {
    fetchFeaturedProducts()
    fetchCategories()
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
        confirmButtonColor: '#3085d6'
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
      input: 'email',
      inputLabel: 'Enter your email address',
      inputPlaceholder: 'your@email.com',
      showCancelButton: true,
      confirmButtonText: 'Subscribe',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      background: '#fff',
      color: '#000'
    })

    if (email) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Thank you for subscribing with ${email}`,
        confirmButtonColor: '#3085d6'
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <section className="relative h-96 md:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-2 text-yellow-400">{slide.subtitle}</p>
                <p className="text-lg mb-8 max-w-2xl mx-auto">{slide.description}</p>
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition duration-300 inline-block"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-gray-100 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <i className="fas fa-shipping-fast text-indigo-600"></i>
              </div>
              <div>
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-alt text-green-600"></i>
              </div>
              <div>
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <i className="fas fa-undo text-yellow-600"></i>
              </div>
              <div>
                <h4 className="font-semibold">Easy Returns</h4>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="fas fa-headset text-purple-600"></i>
              </div>
              <div>
                <h4 className="font-semibold">24/7 Support</h4>
                <p className="text-sm text-gray-600">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Explore our curated collection of premium products</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/products?category=${category}`}
                className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center border border-gray-100"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition duration-300">
                  {category === 'electronics' && '📱'}
                  {category === 'jewelery' && '💎'}
                  {category === "men's clothing" && '👔'}
                  {category === "women's clothing" && '👗'}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 capitalize group-hover:text-indigo-600 transition duration-300">
                  {category}
                </h3>
                <p className="text-sm text-gray-500 mt-2">Shop {category} collection</p>
                <div className="mt-4 text-indigo-600 font-semibold opacity-0 group-hover:opacity-100 transition">
                  Shop Now →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Handpicked items from our premium collection</p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition duration-300 inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">🎉 Limited Time Offers</h2>
              <p className="text-xl mb-6 font-light">Get amazing deals on selected items. Don't miss out on these incredible savings!</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold">50%</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Summer Sale</h4>
                    <p className="text-white/80">Selected clothing items</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold">30%</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Electronics Deal</h4>
                    <p className="text-white/80">Gadgets and accessories</p>
                  </div>
                </div>
              </div>
              <Link
                to="/deals"
                className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300 inline-block"
              >
                View All Deals
              </Link>
            </div>
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Subscribe & Get 10% Off</h3>
                <p className="mb-6">Join our newsletter for exclusive offers</p>
                <button
                  onClick={handleSubscribe}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
                >
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600">Real reviews from satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-user text-gray-600"></i>
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
