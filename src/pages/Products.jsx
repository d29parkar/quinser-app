import { useState } from 'react'
import productsData from '../data/products.json'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const categories = ['All', ...new Set(productsData.map(product => product.category))]
  
  const filteredProducts = selectedCategory === 'All' 
    ? productsData 
    : productsData.filter(product => product.category === selectedCategory)

  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-background via-card-bg to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Our Products</h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Comprehensive range of pharmaceutical products manufactured to the highest quality standards
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
                  : 'bg-white text-text-secondary hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:text-primary border border-border hover:border-primary/30'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-border hover:border-primary/20"
            >
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                  {product.category}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-text mb-3">{product.name}</h3>
              <p className="text-text-secondary leading-relaxed">{product.description}</p>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products

