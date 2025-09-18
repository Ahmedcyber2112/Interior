"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart, useWishlist } from "../../context/AppContext";
import { FaStar, FaShoppingCart, FaShare, FaCreditCard } from "react-icons/fa";
import { IoHeartOutline, IoHeart, IoArrowBack } from "react-icons/io5";
import { DataProducts } from "../../Components/Content";

export default function ProductDetails() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    if (params.id) {
      const foundProduct = DataProducts.find(p => p.id === params.id.toString());
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.prise2 || product.prise,
      image: product.img,
      category: product.dish || "General"
    });
    
    setTimeout(() => setIsAdding(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    
    const productData = {
      id: product.id,
      name: product.name,
      price: product.prise2 || product.prise,
      image: product.img,
      category: product.dish || "General"
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(productData);
    }
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    setIsBuying(true);
    
    // إضافة المنتج للعربة أولاً
    addToCart({
      id: product.id,
      name: product.name,
      price: product.prise2 || product.prise,
      image: product.img,
      category: product.dish || "General"
    });
    
    // محاكاة عملية الشراء
    setTimeout(() => {
      setIsBuying(false);
      // يمكنك هنا إضافة التوجيه لصفحة الدفع
      alert(`تم تأكيد طلب شراء ${product.name}\nالسعر: ${product.prise2 || product.prise}\nسيتم التواصل معك قريباً لتأكيد التوصيل!`);
    }, 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5CAF90] mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل تفاصيل المنتج...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#5CAF90] hover:text-[#4a9b7f] mb-6 transition-colors"
        >
          <IoArrowBack />
          العودة
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img 
                  src={product.img} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600">
                  {product.dish || "الفئة العامة"}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`${i < 4 ? "text-yellow-400" : "text-gray-300"} text-sm`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  (127 تقييم)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#5CAF90]">
                  {product.prise2 || product.prise}
                </span>
                {product.prise2 && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.prise}
                  </span>
                )}
              </div>

              <div className="space-y-4 pt-4">
                {/* زر اشتري الآن - أهم زر */}
                <button
                  onClick={handleBuyNow}
                  disabled={isBuying}
                  className={`w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-bold text-lg transition-all ${
                    isBuying
                      ? "bg-orange-500 text-white"
                      : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl"
                  }`}
                >
                  <FaCreditCard />
                  {isBuying ? "جاري معالجة الطلب..." : "اشتري الآن 🔥"}
                </button>
                
                {/* الأزرار الثانوية */}
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all ${
                      isAdding
                        ? "bg-green-500 text-white"
                        : "bg-[#5CAF90] hover:bg-[#4a9b7f] text-white"
                    }`}
                  >
                    <FaShoppingCart />
                    {isAdding ? "تم الإضافة!" : "إضافة للعربة"}
                  </button>
                  
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-3 rounded-lg border transition-all ${
                      isInWishlist(product.id)
                        ? "border-red-300 bg-red-50 text-red-600"
                        : "border-gray-300 hover:border-[#5CAF90] hover:text-[#5CAF90]"
                    }`}
                  >
                    {isInWishlist(product.id) ? <IoHeart /> : <IoHeartOutline />}
                  </button>
                  
                  <button className="p-3 rounded-lg border border-gray-300 hover:border-[#5CAF90] hover:text-[#5CAF90] transition-all">
                    <FaShare />
                  </button>
                </div>
              </div>

              {/* معلومات الشراء السريع */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                  <FaCreditCard className="text-orange-600" />
                  مزايا الشراء الفوري
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-orange-700">
                    <span className="text-green-600">✓</span>
                    <span>شحن مجاني للطلبات فوق $50</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-700">
                    <span className="text-green-600">✓</span>
                    <span>توصيل سريع خلال 24-48 ساعة</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-700">
                    <span className="text-green-600">✓</span>
                    <span>دفع آمن 100% - فيزا، ماستركارد، الدفع عند الاستلام</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-700">
                    <span className="text-green-600">✓</span>
                    <span>ضمان الاسترداد خلال 30 يوم</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-6 lg:p-8">
            <h3 className="text-xl font-semibold mb-4">وصف المنتج</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.name} منتج عالي الجودة مصمم خصيصاً لتلبية احتياجاتك. 
              يتميز بالأناقة والعملية في آن واحد، مما يجعله الخيار المثالي لكل من يبحث عن الجودة والتميز.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}