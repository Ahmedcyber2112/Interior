"use client";
import { useState } from "react";
import Link from "next/link";
import { useWishlist, useCart } from "../context/AppContext";
import { FiHeart, FiShoppingCart, FiTrash2, FiShare2, FiEye, FiStar } from "react-icons/fi";
import { IoHeartOutline } from "react-icons/io5";

const WishlistItem = ({ item }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(item);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleRemoveFromWishlist = () => {
    removeFromWishlist(item.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.name,
        text: `تحقق من هذا المنتج الرائع: ${item.name}`,
        url: `${window.location.origin}/products/${item.id}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/products/${item.id}`);
      alert("تم نسخ رابط المنتج!");
    }
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

  return (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="relative group">
        <img
          src={item.image || "/product1.png"}
          alt={item.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        
        {/* Discount Badge */}
        {item.discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{item.discount}%
          </span>
        )}
        
        {/* New Badge */}
        {item.isNew && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded">
            جديد
          </span>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-t-lg">
          <div className="absolute top-3 left-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleShare}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
              title="مشاركة المنتج"
            >
              <FiShare2 className="w-4 h-4 text-gray-600" />
            </button>
            <Link href={`/products/${item.id}`}>
              <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                <FiEye className="w-4 h-4 text-gray-600" />
              </button>
            </Link>
          </div>
        </div>

        {/* Remove from Wishlist Button */}
        <button
          onClick={handleRemoveFromWishlist}
          className="absolute top-3 right-12 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
          title="إزالة من المفضلة"
        >
          <FiHeart className="w-4 h-4 text-red-500" />
        </button>
      </div>

      <div className="p-4">
        {/* Category */}
        <span className="text-sm text-gray-500 mb-1 block">{item.category}</span>
        
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {item.name}
        </h3>
        
        {/* Rating */}
        {item.rating && (
          <div className="flex items-center space-x-1 space-x-reverse mb-3">
            <div className="flex">{renderStars(item.rating)}</div>
            <span className="text-sm text-gray-500">
              ({item.reviews || 0} تقييم)
            </span>
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-center space-x-2 space-x-reverse mb-4">
          <span className="text-lg font-bold text-[#5CAF90]">
            ${item.price}
          </span>
          {item.originalPrice && item.originalPrice > item.price && (
            <span className="text-sm text-gray-500 line-through">
              ${item.originalPrice}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 space-x-reverse">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 bg-[#5CAF90] text-white py-2 px-4 rounded-lg hover:bg-[#4B9B7A] transition-colors disabled:opacity-50 flex items-center justify-center space-x-2 space-x-reverse"
          >
            <FiShoppingCart className="w-4 h-4" />
            <span className="text-sm">
              {isAdding ? "جاري الإضافة..." : "إضافة للعربة"}
            </span>
          </button>
          
          <button
            onClick={handleRemoveFromWishlist}
            className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 hover:border-red-300 hover:text-red-600 transition-colors"
            title="إزالة من المفضلة"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Wishlist = () => {
  const { items, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isAddingAll, setIsAddingAll] = useState(false);

  const handleAddAllToCart = async () => {
    setIsAddingAll(true);
    items.forEach(item => {
      addToCart(item);
    });
    setTimeout(() => setIsAddingAll(false), 1500);
  };

  const handleClearWishlist = () => {
    if (window.confirm("هل تريد حقاً إفراغ قائمة المفضلة؟")) {
      clearWishlist();
    }
  };

  const handleShareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: "قائمة المفضلة",
        text: "تحقق من قائمة المنتجات المفضلة لدي",
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ رابط قائمة المفضلة!");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <IoHeartOutline className="mx-auto h-24 w-24 text-gray-400 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              قائمة المفضلة فارغة
            </h2>
            <p className="text-gray-600 mb-8">
              لم تقم بإضافة أي منتجات إلى قائمة المفضلة بعد
            </p>
            <div className="space-y-4">
              <Link href="/products">
                <button className="bg-[#5CAF90] text-white px-8 py-3 rounded-lg hover:bg-[#4B9B7A] transition-colors">
                  تصفح المنتجات
                </button>
              </Link>
              <div>
                <Link href="/categories" className="text-[#5CAF90] hover:text-[#4B9B7A] transition-colors">
                  أو تصفح حسب الفئات
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              قائمة المفضلة
            </h1>
            <p className="text-gray-600">
              {items.length} منتج في قائمة المفضلة
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 sm:space-x-reverse mt-4 md:mt-0">
            <button
              onClick={handleShareWishlist}
              className="flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiShare2 className="w-4 h-4" />
              <span>مشاركة القائمة</span>
            </button>
            
            <button
              onClick={handleAddAllToCart}
              disabled={isAddingAll}
              className="flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 bg-[#5CAF90] text-white rounded-lg hover:bg-[#4B9B7A] transition-colors disabled:opacity-50"
            >
              <FiShoppingCart className="w-4 h-4" />
              <span>
                {isAddingAll ? "جاري الإضافة..." : "إضافة الكل للعربة"}
              </span>
            </button>
            
            <button
              onClick={handleClearWishlist}
              className="flex items-center justify-center space-x-2 space-x-reverse px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>إفراغ القائمة</span>
            </button>
          </div>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {items.map(item => (
            <WishlistItem key={item.id} item={item} />
          ))}
        </div>

        {/* Related Products Section */}
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            منتجات قد تعجبك
          </h2>
          <div className="text-center">
            <Link href="/products">
              <button className="bg-[#5CAF90] text-white px-8 py-3 rounded-lg hover:bg-[#4B9B7A] transition-colors">
                تصفح المزيد من المنتجات
              </button>
            </Link>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            نصائح للاستفادة من قائمة المفضلة
          </h3>
          <ul className="text-blue-800 space-y-2">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
              احفظ المنتجات التي تعجبك لمراجعتها لاحقاً
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
              راقب تغيرات الأسعار والعروض على منتجاتك المفضلة
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
              شارك قائمة المفضلة مع الأصدقاء والعائلة
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
              أضف جميع المنتجات إلى العربة بنقرة واحدة
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;