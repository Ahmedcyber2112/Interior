"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/AppContext";
import { FiMinus, FiPlus, FiTrash2, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { useWishlist } from "../context/AppContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, getCartItemsCount, clearCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleWishlistToggle = (item) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const applyCoupon = () => {
    // محاكاة نظام الكوبونات
    const coupons = {
      "SAVE10": { discount: 10, type: "percentage" },
      "SAVE50": { discount: 50, type: "fixed" },
      "WELCOME": { discount: 15, type: "percentage" }
    };

    if (coupons[couponCode]) {
      setAppliedCoupon({
        code: couponCode,
        ...coupons[couponCode]
      });
      setCouponCode("");
    } else {
      alert("كود الخصم غير صحيح");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    const subtotal = getCartTotal();
    if (appliedCoupon.type === "percentage") {
      return (subtotal * appliedCoupon.discount) / 100;
    } else {
      return Math.min(appliedCoupon.discount, subtotal);
    }
  };

  const getFinalTotal = () => {
    const subtotal = getCartTotal();
    const discount = calculateDiscount();
    const shipping = subtotal > 100 ? 0 : 10; // شحن مجاني للطلبات أكثر من 100
    return subtotal - discount + shipping;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 sm:py-20">
            <FiShoppingCart className="mx-auto h-16 sm:h-20 md:h-24 w-16 sm:w-20 md:w-24 text-gray-400 mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              عربة التسوق فارغة
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
              لم تقم بإضافة أي منتجات إلى عربة التسوق بعد
            </p>
            <Link href="/products">
              <button className="bg-[#5CAF90] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-[#4B9B7A] transition-colors text-sm sm:text-base">
                تسوق الآن
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            عربة التسوق ({getCartItemsCount()} منتج)
          </h1>
          <Link href="/products">
            <button className="flex items-center text-[#5CAF90] hover:text-[#4B9B7A] transition-colors text-sm sm:text-base">
              <FiArrowLeft className="mr-2" />
              متابعة التسوق
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 sm:p-6 border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h2 className="text-lg sm:text-xl font-semibold">المنتجات</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center text-sm sm:text-base"
                  >
                    <FiTrash2 className="mr-1" />
                    إفراغ العربة
                  </button>
                </div>
              </div>

              <div className="divide-y">
                {items.map((item, index) => (
                  <div key={`${item.id}-${index}-${item.quantity}`} className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-20 sm:w-24 h-20 sm:h-24 mx-auto sm:mx-0">
                        <img
                          src={item.image || "/product1.png"}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 text-center sm:text-right">
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-2">
                          {item.category || "الفئة غير محددة"}
                        </p>
                        
                        {/* Mobile Layout - Stack vertically */}
                        <div className="sm:hidden space-y-3">
                          {/* Price */}
                          <div className="text-lg font-semibold text-[#5CAF90]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-center border rounded-lg w-fit mx-auto">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <FiMinus className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-2 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <FiPlus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-center space-x-2 space-x-reverse">
                            <button
                              onClick={() => handleWishlistToggle(item)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              {isInWishlist(item.id) ? (
                                <IoHeart className="h-5 w-5" />
                              ) : (
                                <IoHeartOutline className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {/* Desktop Layout - Horizontal */}
                        <div className="hidden sm:flex items-center justify-between">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            {/* Quantity Controls */}
                            <div className="flex items-center border rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <FiMinus className="h-4 w-4" />
                              </button>
                              <span className="px-4 py-2 font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <FiPlus className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-lg font-semibold text-[#5CAF90]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <button
                              onClick={() => handleWishlistToggle(item)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title={isInWishlist(item.id) ? "إزالة من المفضلة" : "إضافة للمفضلة"}
                            >
                              {isInWishlist(item.id) ? (
                                <IoHeart className="h-5 w-5 text-red-500" />
                              ) : (
                                <IoHeartOutline className="h-5 w-5" />
                              )}
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="حذف من العربة"
                            >
                              <FiTrash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-4">
              <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">ملخص الطلب</h2>

              {/* Coupon Section */}
              <div className="mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 sm:space-x-reverse">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="كود الخصم"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] focus:border-transparent text-sm sm:text-base"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base whitespace-nowrap"
                  >
                    تطبيق
                  </button>
                </div>
                
                {appliedCoupon && (
                  <div className="mt-3 flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <span className="text-green-700 font-medium text-sm sm:text-base">
                      كود الخصم: {appliedCoupon.code}
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-green-600 text-sm sm:text-base">
                    <span>الخصم ({appliedCoupon.type === "percentage" ? `${appliedCoupon.discount}%` : `$${appliedCoupon.discount}`})</span>
                    <span>-${calculateDiscount().toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">الشحن</span>
                  <span className="font-medium">
                    {getCartTotal() > 100 ? (
                      <span className="text-green-600">مجاني</span>
                    ) : (
                      "$10.00"
                    )}
                  </span>
                </div>

                {getCartTotal() <= 100 && (
                  <div className="text-xs sm:text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                    احصل على شحن مجاني عند الشراء بأكثر من $100
                  </div>
                )}

                <div className="border-t pt-3">
                  <div className="flex justify-between text-base sm:text-lg font-semibold">
                    <span>المجموع الإجمالي</span>
                    <span className="text-[#5CAF90]">${getFinalTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout">
                <button className="w-full mt-4 sm:mt-6 bg-[#5CAF90] text-white py-2.5 sm:py-3 rounded-lg hover:bg-[#4B9B7A] transition-colors font-medium text-sm sm:text-base">
                  المتابعة للدفع
                </button>
              </Link>

              {/* Security Badge */}
              <div className="mt-3 sm:mt-4 text-center">
                <div className="flex items-center justify-center text-xs sm:text-sm text-gray-500">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  دفع آمن ومحمي
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;