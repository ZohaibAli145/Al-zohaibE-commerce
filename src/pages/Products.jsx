import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import Button from '../components/ui/Button'
import { BRAND_COLORS, BRAND_GRADIENTS, BRAND_RADIUS, BRAND_SHADOWS } from '../components/ui/BrandColors'
import { formatPKR } from '../utils/currency'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })
  const [categories, setCategories] = useState([])
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(12)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) setSelectedCategory(category)
    fetchProducts()
    fetchCategories()
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
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

  const filteredAndSortedProducts = products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true
      const productPricePKR = product.price * 280 // Convert to PKR
      const matchesPrice = productPricePKR >= priceRange.min && productPricePKR <= priceRange.max
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.title.localeCompare(b.title)
        case 'rating':
          return (b.rating?.rate || 0) - (a.rating?.rate || 0)
        default:
          return 0
      }
    })

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage)

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setPriceRange({ min: 0, max: 100000 })
    setSortBy('featured')
    setCurrentPage(1)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (searchTerm) count++
    if (selectedCategory) count++
    if (priceRange.max < 100000) count++
    if (sortBy !== 'featured') count++
    return count
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#0ea5e9] border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading Products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-white to-[#faf5ff]">
      {/* Professional Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{fontFamily: 'Poppins, sans-serif', background: BRAND_GRADIENTS.primary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            All Products
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of premium products with advanced filtering and sorting options
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100" style={{borderRadius: BRAND_RADIUS['2xl']}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">{products.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: BRAND_COLORS.primary[100]}}>
                <i className="fas fa-box text-[#0ea5e9]"></i>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100" style={{borderRadius: BRAND_RADIUS['2xl']}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: BRAND_COLORS.secondary[100]}}>
                <i className="fas fa-layer-group text-[#9333ea]"></i>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100" style={{borderRadius: BRAND_RADIUS['2xl']}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Filtered Results</p>
                <p className="text-2xl font-bold text-gray-800">{filteredAndSortedProducts.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: BRAND_COLORS.success + '20'}}>
                <i className="fas fa-filter text-[#10b981]"></i>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100" style={{borderRadius: BRAND_RADIUS['2xl']}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Filters</p>
                <p className="text-2xl font-bold text-gray-800">{getActiveFiltersCount()}</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: BRAND_COLORS.accent.warning + '20'}}>
                <i className="fas fa-sliders-h text-[#f59e0b]"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Professional Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-8" style={{borderRadius: BRAND_RADIUS['2xl'], boxShadow: BRAND_SHADOWS.lg}}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                {getActiveFiltersCount() > 0 && (
                  <Button
                    onClick={clearFilters}
                    variant="ghost"
                    size="sm"
                    icon="fas fa-times"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-search mr-2"></i>Search Products
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition-all duration-300"
                  style={{borderRadius: BRAND_RADIUS.lg}}
                  placeholder="Search by name..."
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-layer-group mr-2"></i>Category
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('')
                      setCurrentPage(1)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                      !selectedCategory 
                        ? 'bg-[#0ea5e9] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{borderRadius: BRAND_RADIUS.lg}}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setCurrentPage(1)
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 capitalize ${
                        selectedCategory === category 
                          ? 'bg-[#0ea5e9] text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      style={{borderRadius: BRAND_RADIUS.lg}}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-dollar-sign mr-2"></i>Price Range
                </label>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Min: {formatPKR(priceRange.min)}</span>
                      <span>Max: {formatPKR(priceRange.max)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="5000"
                      value={priceRange.max}
                      onChange={(e) => {
                        setPriceRange({...priceRange, max: parseInt(e.target.value)})
                        setCurrentPage(1)
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{accentColor: BRAND_COLORS.primary[500]}}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setPriceRange({ min: 0, max: 50000 })
                        setCurrentPage(1)
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm"
                    >
                      Under 50K
                    </button>
                    <button
                      onClick={() => {
                        setPriceRange({ min: 50000, max: 100000 })
                        setCurrentPage(1)
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 text-sm"
                    >
                      50K - 100K
                    </button>
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-sort mr-2"></i>Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] focus:border-transparent transition-all duration-300"
                  style={{borderRadius: BRAND_RADIUS.lg}}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Mode */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <i className="fas fa-eye mr-2"></i>View Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-[#0ea5e9] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{borderRadius: BRAND_RADIUS.lg}}
                  >
                    <i className="fas fa-th mr-2"></i>Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-3 rounded-xl transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-[#0ea5e9] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={{borderRadius: BRAND_RADIUS.lg}}
                  >
                    <i className="fas fa-list mr-2"></i>List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6" style={{borderRadius: BRAND_RADIUS['2xl'], boxShadow: BRAND_SHADOWS.lg}}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-gray-600">
                    Showing <span className="font-bold text-[#0ea5e9]">{currentProducts.length}</span> of{' '}
                    <span className="font-bold text-gray-800">{filteredAndSortedProducts.length}</span> products
                  </p>
                  {getActiveFiltersCount() > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      {getActiveFiltersCount()} filter{getActiveFiltersCount() > 1 ? 's' : ''} applied
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {currentProducts.map(product => (
                  <div key={product.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center space-x-6" style={{borderRadius: BRAND_RADIUS['2xl'], boxShadow: BRAND_SHADOWS.lg}}>
                    <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
                      <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-[#ef4444]">{formatPKR(product.price * 280)}</span>
                        <Button variant="primary" size="sm" icon="fas fa-shopping-cart">
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-100" style={{borderRadius: BRAND_RADIUS['2xl'], boxShadow: BRAND_SHADOWS.lg}}>
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <Button
                  onClick={clearFilters}
                  variant="primary"
                  icon="fas fa-redo"
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  style={{borderRadius: BRAND_RADIUS.lg}}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === index + 1
                        ? 'bg-[#0ea5e9] text-white'
                        : 'bg-white border border-gray-300 hover:bg-gray-50'
                    }`}
                    style={{borderRadius: BRAND_RADIUS.lg}}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  style={{borderRadius: BRAND_RADIUS.lg}}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
