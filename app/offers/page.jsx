"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaTag, FaClock, FaFire, FaGift, FaCreditCard } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { useCart } from "../context/AppContext";

// بيانات العروض
const offersData = [
  {
    id: 1,
    title: "خصم 50% على الأثاث الحديث",
    description: "اكتشف أحدث صيحات الأثاث العصري بخصم يصل إلى 50%",
    discount: "50%",
    originalPrice: "$200",
    salePrice: "$100",
    image: "/product1.png",
    category: "أثاث",
    validUntil: "2025-02-28",
    isHot: true,
    isFeatured: true
  },
  {
    id: 2,
    title: "عرض خاص على الديكورات",
    description: "مجموعة متنوعة من قطع الديكور بأسعار لا تقاوم",
    discount: "30%",
    originalPrice: "$150",
    salePrice: "$105",
    image: "/product2.png",
    category: "ديكور",
    validUntil: "2025-02-15",
    isHot: false,
    isFeatured: true
  },
  {
    id: 3,
    title: "تخفيضات نهاية الموسم",
    description: "خصومات هائلة على جميع المنتجات المتبقية",
    discount: "70%",
    originalPrice: "$300",
    salePrice: "$90",
    image: "/product3.png",
    category: "متنوع",
    validUntil: "2025-01-31",
    isHot: true,
    isFeatured: false
  },
  {
    id: 4,
    title: "عرض الشتاء الدافئ",
    description: "أثاث مريح ودافئ لفصل الشتاء",
    discount: "40%",
    originalPrice: "$180",
    salePrice: "$108",
    image: "/product4.png",
    category: "أثاث",
    validUntil: "2025-03-01",
    isHot: false,
    isFeatured: true
  },
  {
    id: 5,
    title: "مجموعة الإضاءة العصرية",
    description: "وحدات إضاءة أنيقة لإضفاء لمسة عصرية على منزلك",
    discount: "25%",
    originalPrice: "$120",
    salePrice: "$90",
    image: "/product5.png",
    category: "إضاءة",
    validUntil: "2025-02-20",
    isHot: false,
    isFeatured: false
  },
  {
    id: 6,
    title: "أطقم الجلوس الفاخرة",
    description: "أطقم جلوس مريحة وأنيقة بتصاميم عصرية",
    discount: "35%",
    originalPrice: "$500",
    salePrice: "$325",
    image: "/product6.png",
    category: "أثاث",
    validUntil: "2025-02-25",
    isHot: true,
    isFeatured: true
  }
];

const Offers = () => {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [sortBy, setSortBy] = useState("newest");
  const [buyingStates, setBuyingStates] = useState({});
  const { addToCart } = useCart();
  const router = useRouter();

  const categories = ["الكل", "أثاث", "ديكور", "إضاءة", "متنوع"];

  const filteredOffers = offersData.filter(offer => 
    selectedCategory === "الكل" || offer.category === selectedCategory
  );

  const sortedOffers = filteredOffers.sort((a, b) => {
    if (sortBy === "discount") {
      return parseInt(b.discount) - parseInt(a.discount);
    } else if (sortBy === "price") {
      return parseFloat(a.salePrice.replace('$', '')) - parseFloat(b.salePrice.replace('$', ''));
    }
    return 0;
  });

  const handleAddToCart = (offer) => {
    addToCart({
      id: offer.id,
      name: offer.title,
      price: parseFloat(offer.salePrice.replace('$', '')),
      originalPrice: parseFloat(offer.originalPrice.replace('$', '')),
      image: offer.image,
      category: offer.category
    });
  };

  const handleBuyNow = (offer) => {
    setBuyingStates(prev => ({ ...prev, [offer.id]: true }));
    
    addToCart({
      id: offer.id,
      name: offer.title,
      price: parseFloat(offer.salePrice.replace('$', '')),
      originalPrice: parseFloat(offer.originalPrice.replace('$', '')),
      image: offer.image,
      category: offer.category
    });
    
    setTimeout(() => {
      setBuyingStates(prev => ({ ...prev, [offer.id]: false }));
      alert(`تم تأكيد طلب شراء ${offer.title}\nالسعر: ${offer.salePrice}\nالخصم: ${offer.discount}\nسيتم التواصل معك قريباً لتأكيد التوصيل!`);
    }, 2000);
  };

  const handleProductClick = (offerId) => {
    router.push(`/product/${offerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#5CAF90] to-[#4a9b7f] text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <BiSolidOffer className="text-4xl sm:text-5xl" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">العروض الحصرية</h1>
          </div>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            اكتشف أفضل العروض والتخفيضات على مجموعة واسعة من المنتجات عالية الجودة
          </p>
        </div>
      </div>

      {/* Featured Offers Banner */}
      <div className="bg-white shadow-md py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FaFire className="text-2xl text-red-500" />
              <span className="text-lg sm:text-xl font-semibold text-gray-800">
                عروض محدودة الوقت!
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <FaClock className="text-lg" />
              <span className="text-sm sm:text-base">ينتهي العرض قريباً</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start lg:items-center justify-between">
            {/* Categories */}
            <div className="w-full lg:w-auto">
              <h3 className="text-lg font-semibold mb-3 lg:mb-0 lg:inline-block lg:ml-4">الفئات:</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-[#5CAF90] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full lg:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] text-sm sm:text-base"
              >
                <option value="newest">الأحدث</option>
                <option value="discount">أعلى خصم</option>
                <option value="price">أقل سعر</option>
              </select>
            </div>
          </div>
        </div>

        {/* Featured Offers Grid */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FaGift className="text-[#5CAF90]" />
            العروض المميزة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedOffers.filter(offer => offer.isFeatured).map((offer) => (
              <div 
                key={offer.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => handleProductClick(offer.id)}
              >
                <div className="relative">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {offer.isHot && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <FaFire /> HOT
                      </span>
                    )}
                    <span className="bg-[#5CAF90] text-white px-3 py-1 rounded-full font-bold text-sm">
                      -{offer.discount}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                      ينتهي: {new Date(offer.validUntil).toLocaleDateString('ar-EG')}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <MdLocalOffer className="text-[#5CAF90]" />
                    <span className="text-sm text-gray-500">{offer.category}</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {offer.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                    {offer.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl font-bold text-[#5CAF90]">
                        {offer.salePrice}
                      </span>
                      <span className="text-gray-500 line-through text-sm sm:text-base">
                        {offer.originalPrice}
                      </span>
                    </div>
                    <span className="text-green-600 font-semibold text-sm sm:text-base">
                      توفير {(parseFloat(offer.originalPrice.replace('$', '')) - parseFloat(offer.salePrice.replace('$', ''))).toFixed(0)}$
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(offer);
                      }}
                      disabled={buyingStates[offer.id]}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 sm:py-3 rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-sm sm:text-base disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <FaCreditCard className="w-4 h-4" />
                      {buyingStates[offer.id] ? "جاري المعالجة..." : "اشتري الآن 🔥"}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(offer);
                      }}
                      className="w-full bg-[#5CAF90] text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#4a9b7f] transition-colors duration-300 text-sm sm:text-base"
                    >
                      أضف للسلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Offers Grid */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FaTag className="text-[#5CAF90]" />
            جميع العروض
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sortedOffers.map((offer) => (
              <div 
                key={offer.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleProductClick(offer.id)}
              >
                <div className="relative">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    {offer.isHot && (
                      <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-bold">
                        HOT
                      </span>
                    )}
                    <span className="bg-[#5CAF90] text-white px-2 py-0.5 rounded font-bold text-xs">
                      -{offer.discount}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 sm:p-4">
                  <span className="text-xs text-gray-500">{offer.category}</span>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 line-clamp-2">
                    {offer.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#5CAF90]">
                        {offer.salePrice}
                      </span>
                      <span className="text-gray-400 line-through text-sm">
                        {offer.originalPrice}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(offer);
                      }}
                      disabled={buyingStates[offer.id]}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-1.5 sm:py-2 rounded font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-xs disabled:opacity-50 flex items-center justify-center gap-1"
                    >
                      <FaCreditCard className="w-3 h-3" />
                      {buyingStates[offer.id] ? "معالجة..." : "اشتري الآن"}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(offer);
                      }}
                      className="w-full bg-[#5CAF90] text-white py-1.5 sm:py-2 rounded font-medium hover:bg-[#4a9b7f] transition-colors duration-300 text-sm"
                    >
                      أضف للسلة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-[#5CAF90] to-[#4a9b7f] rounded-xl p-6 sm:p-8 mt-12 text-center text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            لا تفوت أحدث العروض!
          </h3>
          <p className="text-white/90 mb-6 text-sm sm:text-base">
            اشترك في النشرة الإخبارية للحصول على إشعارات بأحدث العروض والتخفيضات
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none text-sm sm:text-base"
            />
            <button className="bg-white text-[#5CAF90] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base">
              اشترك
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;