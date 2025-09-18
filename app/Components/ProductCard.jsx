"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, useWishlist } from "../context/AppContext";
import { FaStar } from "react-icons/fa";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { FiShoppingCart, FiEye } from "react-icons/fi";

const ProductCard = ({ product, isFullWidth = false }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // منع الانتقال لصفحة التفاصيل
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
      category: product.category || "General"
    });
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation(); // منع الانتقال لصفحة التفاصيل
    const productData = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.img,
      category: product.category || "General"
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(productData);
    }
  };

  const handleProductClick = () => {
    router.push(`/product/${product.id}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <article 
      className={`border-2 border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300 group cursor-pointer bg-white ${isFullWidth ? 'w-full' : ''}`}
      onClick={handleProductClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        <img 
          src={product.img} 
          alt={product.name} 
          className="w-full h-40 sm:h-48 md:h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Sale Badge */}
        {product.sale && (
          <p className="absolute text-white bg-[#FF7070] rounded-md top-2 sm:top-4 right-2 sm:right-4 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm font-bold">
            {product.sale}
          </p>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col space-y-1 sm:space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleWishlistToggle}
            className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            {isInWishlist(product.id) ? (
              <IoHeart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />
            ) : (
              <IoHeartOutline className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            )}
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleProductClick();
            }}
            className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <FiEye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-center space-x-1 space-x-reverse mb-2">
          {product.rating && renderStars(product.rating)}
          {product.rating && (
            <span className="text-xs sm:text-sm text-gray-500 mr-1">({product.rating})</span>
          )}
        </div>

        <h5 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
          {product.name}
        </h5>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="text-base sm:text-lg font-bold text-[#5CAF90]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full bg-[#5CAF90] text-white py-2 sm:py-2.5 rounded-lg hover:bg-[#4B9B7A] transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 space-x-reverse text-sm sm:text-base"
        >
          <FiShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{isAdding ? "جاري الإضافة..." : "إضافة للعربة"}</span>
        </button>
      </div>
    </article>
  );
};

export default ProductCard;