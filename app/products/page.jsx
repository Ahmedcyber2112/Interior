"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart, useWishlist } from "../context/AppContext";
import { FiGrid, FiList, FiSearch, FiFilter, FiShoppingCart, FiEye, FiStar } from "react-icons/fi";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa";
import Link from "next/link";
import SearchComponent from "../Components/SearchComponent";

// Mock products data - في التطبيق الحقيقي ستأتي من API
const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Modern Sofa Set",
    price: 299.99,
    originalPrice: 399.99,
    image: "/product1.png",
    category: "Furniture",
    rating: 4.5,
    reviews: 24,
    discount: 25,
    isNew: true,
    description: "Comfortable modern sofa perfect for living room"
  },
  {
    id: 2,
    name: "Dining Table",
    price: 199.99,
    originalPrice: 249.99,
    image: "/product2.png",
    category: "Furniture",
    rating: 4.2,
    reviews: 18,
    discount: 20,
    isNew: false,
    description: "Elegant dining table for family gatherings"
  },
  {
    id: 3,
    name: "Bedroom Set",
    price: 499.99,
    originalPrice: 599.99,
    image: "/product3.png",
    category: "Furniture",
    rating: 4.8,
    reviews: 36,
    discount: 17,
    isNew: true,
    description: "Complete bedroom furniture set"
  },
  {
    id: 4,
    name: "Office Chair",
    price: 89.99,
    originalPrice: 129.99,
    image: "/product4.png",
    category: "Office",
    rating: 4.3,
    reviews: 42,
    discount: 31,
    isNew: false,
    description: "Ergonomic office chair for productivity"
  },
  {
    id: 5,
    name: "Coffee Table",
    price: 149.99,
    originalPrice: 189.99,
    image: "/product5.png",
    category: "Furniture",
    rating: 4.1,
    reviews: 15,
    discount: 21,
    isNew: false,
    description: "Stylish coffee table for living room"
  },
  {
    id: 6,
    name: "Wardrobe Cabinet",
    price: 349.99,
    originalPrice: 449.99,
    image: "/product6.png",
    category: "Storage",
    rating: 4.6,
    reviews: 28,
    discount: 22,
    isNew: true,
    description: "Spacious wardrobe for bedroom storage"
  },
  {
    id: 7,
    name: "Decorative Lamp",
    price: 79.99,
    originalPrice: 99.99,
    image: "/product7.png",
    category: "Lighting",
    rating: 4.4,
    reviews: 33,
    discount: 20,
    isNew: false,
    description: "Beautiful decorative lamp for ambiance"
  },
  {
    id: 8,
    name: "Garden Furniture",
    price: 599.99,
    originalPrice: 799.99,
    image: "/product8.png",
    category: "Outdoor",
    rating: 4.7,
    reviews: 19,
    discount: 25,
    isNew: true,
    description: "Complete outdoor furniture set"
  }
];

const CATEGORIES = ["All", "Furniture", "Office", "Storage", "Lighting", "Outdoor"];
const SORT_OPTIONS = [
  { value: "default", label: "الترتيب الافتراضي" },
  { value: "price-low", label: "السعر: من الأقل للأعلى" },
  { value: "price-high", label: "السعر: من الأعلى للأقل" },
  { value: "rating", label: "الأعلى تقييماً" },
  { value: "newest", label: "الأحدث أولاً" }
];

const ProductCard = ({ product, viewMode }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleBuyNow = async () => {
    setIsBuying(true);
    addToCart(product);
    setTimeout(() => {
      setIsBuying(false);
      alert(`تم تأكيد طلب شراء ${product.name}\nالسعر: $${product.price}\nسيتم التواصل معك قريباً لتأكيد التوصيل!`);
    }, 1500);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleProductClick = () => {
    router.push(`/product/${product.id}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FiStar
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  if (viewMode === "list") {
    return (
      <div 
        className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-4 cursor-pointer"
        onClick={handleProductClick}
      >
        <div className="flex space-x-4 space-x-reverse">
          <div className="relative flex-shrink-0 w-32 h-32">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {product.discount > 0 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{product.discount}%
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                جديد
              </span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex items-center space-x-1 space-x-reverse mb-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-500">
                    ({product.reviews} تقييم)
                  </span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-xl font-bold text-[#5CAF90]">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlistToggle();
                  }}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {isInWishlist(product.id) ? (
                    <IoHeart className="w-5 h-5 text-red-500" />
                  ) : (
                    <IoHeartOutline className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick();
                  }}
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FiEye className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  disabled={isAdding}
                  className="px-4 py-2 bg-[#5CAF90] text-white rounded-lg hover:bg-[#4B9B7A] transition-colors disabled:opacity-50 flex items-center space-x-1 space-x-reverse"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  <span className="text-sm">
                    {isAdding ? "جاري الإضافة..." : "إضافة للعربة"}
                  </span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuyNow();
                  }}
                  disabled={isBuying}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 flex items-center space-x-1 space-x-reverse font-medium"
                >
                  <FaCreditCard className="w-4 h-4" />
                  <span className="text-sm">
                    {isBuying ? "جاري المعالجة..." : "اشتري الآن"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow group cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
            جديد
          </span>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <div className="absolute top-3 left-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleWishlistToggle();
              }}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              {isInWishlist(product.id) ? (
                <IoHeart className="w-4 h-4 text-red-500" />
              ) : (
                <IoHeartOutline className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleProductClick();
              }}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <FiEye className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <span className="text-sm text-gray-500 mb-1 block">{product.category}</span>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-1 space-x-reverse mb-3">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-500">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-lg font-bold text-[#5CAF90]">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={isAdding}
          className="w-full bg-[#5CAF90] text-white py-2 rounded-lg hover:bg-[#4B9B7A] transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 space-x-reverse mb-2"
        >
          <FiShoppingCart className="w-4 h-4" />
          <span>{isAdding ? "جاري الإضافة..." : "إضافة للعربة"}</span>
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleBuyNow();
          }}
          disabled={isBuying}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 space-x-reverse font-medium"
        >
          <FaCreditCard className="w-4 h-4" />
          <span>{isBuying ? "جاري المعالجة..." : "اشتري الآن 🔥"}</span>
        </button>
      </div>
    </div>
  );
};

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // تحديث البحث من URL عند تحميل الصفحة
  useEffect(() => {
    const urlSearch = searchParams?.get('search');
    if (urlSearch) {
      setSearchTerm(urlSearch);
    }
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      default:
        // Keep default order
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, sortBy, searchTerm, priceRange]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">جميع المنتجات</h1>
          
          {/* Search and Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <SearchComponent 
                placeholder="البحث عن المنتجات..."
                onChange={(value) => setSearchTerm(value)}
                className="w-full"
              />
            </div>

            <div className="flex items-center space-x-4 space-x-reverse">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90]"
              >
                {SORT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-[#5CAF90] text-white" : "bg-white text-gray-600"}`}
                >
                  <FiGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-[#5CAF90] text-white" : "bg-white text-gray-600"}`}
                >
                  <FiList className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiFilter className="w-4 h-4" />
                <span>فلترة</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block w-64 flex-shrink-0`}>
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-lg font-semibold mb-4">الفئات</h3>
                <div className="space-y-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-right px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? "bg-[#5CAF90] text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {category === "All" ? "جميع الفئات" : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-lg font-semibold mb-4">نطاق السعر</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="number"
                      placeholder="من"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-20 px-2 py-1 border border-gray-300 rounded"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="إلى"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                      className="w-20 px-2 py-1 border border-gray-300 rounded"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-gray-600">
              عرض {filteredProducts.length} من {products.length} منتج
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">لم يتم العثور على منتجات مطابقة للبحث</p>
              </div>
            ) : (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 0 && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  تحميل المزيد
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading component for suspense fallback
const ProductsLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#5CAF90] mx-auto"></div>
      <p className="mt-4 text-gray-600">جاري تحميل المنتجات...</p>
    </div>
  </div>
);

// Main export with Suspense wrapper
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <Products />
    </Suspense>
  );
}