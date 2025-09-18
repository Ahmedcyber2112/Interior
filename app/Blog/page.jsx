"use client";
import { useState } from "react";
import { FaCalendarAlt, FaUser, FaSearch } from "react-icons/fa";

const blogPosts = [
  {
    id: 1,
    title: "أحدث صيحات الديكور الداخلي لعام 2025",
    excerpt: "اكتشف أحدث الاتجاهات في عالم الديكور الداخلي وكيفية تطبيقها في منزلك",
    image: "/card1.png",
    author: "أحمد محمد",
    date: "2025-01-15",
    category: "ديكور"
  },
  {
    id: 2,
    title: "كيفية اختيار الأثاث المناسب للمساحات الصغيرة",
    excerpt: "نصائح عملية لاختيار وترتيب الأثاث في المساحات المحدودة",
    image: "/card2.png",
    author: "فاطمة علي",
    date: "2025-01-10",
    category: "أثاث"
  },
  {
    id: 3,
    title: "الإضاءة الذكية وتأثيرها على المزاج",
    excerpt: "تعرف على كيفية استخدام الإضاءة لتحسين المزاج والإنتاجية",
    image: "/card3.png",
    author: "خالد حسن",
    date: "2025-01-05",
    category: "إضاءة"
  }
];

const categories = ["الكل", "ديكور", "أثاث", "إضاءة"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const categoryMatch = selectedCategory === "الكل" || post.category === selectedCategory;
    const searchMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            مدونة <span className="text-[#5CAF90]">الديكور</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            اكتشف أحدث الاتجاهات والنصائح في عالم الديكور والتصميم الداخلي
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في المقالات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5CAF90] focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? "bg-[#5CAF90] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <span className="bg-[#5CAF90] text-white px-2 py-1 rounded text-xs">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-xs" />
                    <span>{new Date(post.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaUser className="text-xs" />
                  <span>{post.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
