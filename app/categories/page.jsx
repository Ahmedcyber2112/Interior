"use client";
import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiArrowRight, FiGrid, FiTrendingUp } from "react-icons/fi";

// Mock categories data
const CATEGORIES_DATA = [
  {
    id: 1,
    name: "الأثاث",
    englishName: "Furniture",
    description: "أثاث منزلي عصري وكلاسيكي",
    image: "/Vector1.png",
    productCount: 145,
    subCategories: ["غرف النوم", "غرف المعيشة", "غرف الطعام", "المكاتب"],
    isPopular: true,
    bgColor: "from-blue-400 to-blue-600"
  },
  {
    id: 2,
    name: "المطبخ",
    englishName: "Kitchen",
    description: "أدوات ومعدات المطبخ",
    image: "/Vector2.png",
    productCount: 89,
    subCategories: ["أجهزة المطبخ", "أدوات الطبخ", "أطباق وأكواب", "تخزين"],
    isPopular: true,
    bgColor: "from-green-400 to-green-600"
  },
  {
    id: 3,
    name: "الحمام",
    englishName: "Bathroom",
    description: "مستلزمات وأكسسوارات الحمام",
    image: "/Vector3.png",
    productCount: 67,
    subCategories: ["المناشف", "أكسسوارات", "تخزين", "إضاءة"],
    isPopular: false,
    bgColor: "from-purple-400 to-purple-600"
  },
  {
    id: 4,
    name: "الإضاءة",
    englishName: "Lighting",
    description: "إضاءة منزلية متنوعة",
    image: "/Vector4.png",
    productCount: 123,
    subCategories: ["لمبات LED", "ثريات", "إضاءة خارجية", "إضاءة ذكية"],
    isPopular: true,
    bgColor: "from-yellow-400 to-orange-500"
  },
  {
    id: 5,
    name: "الحديقة",
    englishName: "Garden",
    description: "أثاث ومستلزمات الحديقة",
    image: "/Vector5.png",
    productCount: 78,
    subCategories: ["أثاث خارجي", "نباتات", "أدوات البستنة", "ديكورات"],
    isPopular: false,
    bgColor: "from-emerald-400 to-teal-600"
  },
  {
    id: 6,
    name: "الديكور",
    englishName: "Decoration",
    description: "قطع ديكورية وفنية",
    image: "/Vector6.png",
    productCount: 234,
    subCategories: ["اللوحات", "المزهريات", "الوسائد", "السجاد"],
    isPopular: true,
    bgColor: "from-pink-400 to-rose-600"
  },
  {
    id: 7,
    name: "التخزين",
    englishName: "Storage",
    description: "حلول تنظيم وتخزين ذكية",
    image: "/cc1.png",
    productCount: 156,
    subCategories: ["خزائن", "صناديق", "رفوف", "منظمات"],
    isPopular: false,
    bgColor: "from-gray-400 to-gray-600"
  },
  {
    id: 8,
    name: "المكتب",
    englishName: "Office",
    description: "أثاث ومستلزمات المكتب",
    image: "/cc2.png",
    productCount: 91,
    subCategories: ["مكاتب", "كراسي", "خزائن ملفات", "أكسسوارات"],
    isPopular: false,
    bgColor: "from-indigo-400 to-blue-600"
  }
];

const CategoryCard = ({ category, index }) => {
  return (
    <Link href={`/products?category=${category.englishName}`}>
      <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        {/* Popular Badge */}
        {category.isPopular && (
          <div className="absolute top-3 right-3 z-10">
            <span className="flex items-center space-x-1 space-x-reverse bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              <FiTrendingUp className="w-3 h-3" />
              <span>رائج</span>
            </span>
          </div>
        )}

        <div className="p-6">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className={`w-16 h-16 bg-gradient-to-br ${category.bgColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-8 h-8 filter brightness-0 invert"
              />
            </div>
          </div>

          {/* Category Name */}
          <h3 className="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-[#5CAF90] transition-colors duration-300">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-center text-sm mb-4">
            {category.description}
          </p>

          {/* Product Count */}
          <div className="text-center mb-4">
            <span className="text-2xl font-bold text-[#5CAF90]">
              {category.productCount}
            </span>
            <span className="text-gray-500 text-sm block">منتج</span>
          </div>

          {/* Sub Categories */}
          <div className="space-y-1 mb-4">
            {category.subCategories.slice(0, 3).map((sub, idx) => (
              <div key={idx} className="text-xs text-gray-500 text-center">
                • {sub}
              </div>
            ))}
            {category.subCategories.length > 3 && (
              <div className="text-xs text-gray-400 text-center">
                +{category.subCategories.length - 3} المزيد
              </div>
            )}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button className="inline-flex items-center space-x-2 space-x-reverse text-[#5CAF90] font-medium group-hover:text-[#4B9B7A] transition-colors duration-300">
              <span>تصفح المنتجات</span>
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopularOnly, setShowPopularOnly] = useState(false);

  const filteredCategories = CATEGORIES_DATA.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPopular = !showPopularOnly || category.isPopular;
    
    return matchesSearch && matchesPopular;
  });

  const popularCategories = CATEGORIES_DATA.filter(cat => cat.isPopular);
  const totalProducts = CATEGORIES_DATA.reduce((sum, cat) => sum + cat.productCount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            فئات المنتجات
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            اكتشف مجموعتنا الواسعة من المنتجات المنزلية والديكورات
          </p>
          
          {/* Stats */}
          <div className="flex justify-center space-x-8 space-x-reverse mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#5CAF90]">
                {CATEGORIES_DATA.length}
              </div>
              <div className="text-gray-500">فئة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#5CAF90]">
                {totalProducts}+
              </div>
              <div className="text-gray-500">منتج</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#5CAF90]">
                {popularCategories.length}
              </div>
              <div className="text-gray-500">فئة رائجة</div>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="البحث في الفئات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 space-x-reverse">
            <button
              onClick={() => setShowPopularOnly(false)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                !showPopularOnly 
                  ? "bg-[#5CAF90] text-white" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              جميع الفئات
            </button>
            <button
              onClick={() => setShowPopularOnly(true)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                showPopularOnly 
                  ? "bg-[#5CAF90] text-white" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              الفئات الرائجة
            </button>
          </div>
        </div>

        {/* Popular Categories Banner */}
        {!showPopularOnly && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-[#5CAF90] to-[#4B9B7A] rounded-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    الفئات الأكثر رواجاً
                  </h2>
                  <p className="text-white/90">
                    اكتشف أحدث صيحات الديكور المنزلي
                  </p>
                </div>
                <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                  {popularCategories.slice(0, 3).map((cat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                        <img 
                          src={cat.image} 
                          alt={cat.name} 
                          className="w-6 h-6 filter brightness-0 invert"
                        />
                      </div>
                      <div className="text-sm font-medium">{cat.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {showPopularOnly ? "الفئات الرائجة" : "جميع الفئات"}
            </h2>
            <div className="text-gray-500">
              {filteredCategories.length} فئة
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <FiGrid className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                لا توجد فئات مطابقة
              </h3>
              <p className="text-gray-500">
                جرب البحث بكلمات مختلفة أو قم بإزالة المرشحات
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category, index) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            لم تجد ما تبحث عنه؟
          </h2>
          <p className="text-gray-600 mb-6">
            تصفح جميع منتجاتنا أو تواصل معنا للحصول على مساعدة شخصية
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
            <Link href="/products">
              <button className="bg-[#5CAF90] text-white px-8 py-3 rounded-lg hover:bg-[#4B9B7A] transition-colors">
                تصفح جميع المنتجات
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                تواصل معنا
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;