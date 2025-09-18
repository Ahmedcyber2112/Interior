"use client";
import Link from "next/link";
import { FiInfo, FiMail, FiFileText, FiShield, FiHelpCircle, FiUsers, FiPhone, FiMapPin } from "react-icons/fi";

const PAGES_DATA = [
  {
    id: 1,
    title: "من نحن",
    description: "تعرف على قصتنا ورؤيتنا في تجهيز المنازل",
    icon: FiInfo,
    url: "/about",
    color: "from-blue-400 to-blue-600"
  },
  {
    id: 2,
    title: "تواصل معنا",
    description: "نحن هنا لمساعدتك في أي وقت",
    icon: FiMail,
    url: "/contact",
    color: "from-green-400 to-green-600"
  },
  {
    id: 3,
    title: "الشروط والأحكام",
    description: "قواعد وشروط استخدام الموقع",
    icon: FiFileText,
    url: "/terms",
    color: "from-purple-400 to-purple-600"
  },
  {
    id: 4,
    title: "سياسة الخصوصية",
    description: "كيف نحمي بياناتك ونحافظ على خصوصيتك",
    icon: FiShield,
    url: "/privacy",
    color: "from-red-400 to-red-600"
  },
  {
    id: 5,
    title: "الأسئلة الشائعة",
    description: "إجابات على أكثر الأسئلة تكراراً",
    icon: FiHelpCircle,
    url: "/faq",
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: 6,
    title: "فريق العمل",
    description: "تعرف على الفريق المبدع وراء نجاحنا",
    icon: FiUsers,
    url: "/team",
    color: "from-pink-400 to-rose-600"
  }
];

const PageCard = ({ page }) => {
  const IconComponent = page.icon;
  
  return (
    <Link href={page.url}>
      <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${page.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
        
        <div className="p-6">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            <div className={`w-16 h-16 bg-gradient-to-br ${page.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 text-center mb-3 group-hover:text-[#5CAF90] transition-colors duration-300">
            {page.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-center text-sm">
            {page.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Pages = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            الصفحات الإضافية
          </h1>
          <p className="text-gray-600 text-lg">
            معلومات مفيدة وروابط مهمة لتحسين تجربتك معنا
          </p>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PAGES_DATA.map(page => (
            <PageCard key={page.id} page={page} />
          ))}
        </div>

        {/* Quick Contact Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            تواصل معنا بسرعة
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#5CAF90] rounded-full flex items-center justify-center mx-auto mb-3">
                <FiPhone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">اتصل بنا</h3>
              <p className="text-gray-600 text-sm mb-3">
                خدمة عملاء متاحة 24/7
              </p>
              <a 
                href="tel:+971987654321" 
                className="text-[#5CAF90] hover:text-[#4B9B7A] font-medium"
              >
                +971 98 765 4321
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#5CAF90] rounded-full flex items-center justify-center mx-auto mb-3">
                <FiMail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">راسلنا</h3>
              <p className="text-gray-600 text-sm mb-3">
                نرد خلال 24 ساعة
              </p>
              <a 
                href="mailto:info@grabit.com" 
                className="text-[#5CAF90] hover:text-[#4B9B7A] font-medium"
              >
                info@grabit.com
              </a>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#5CAF90] rounded-full flex items-center justify-center mx-auto mb-3">
                <FiMapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">زورنا</h3>
              <p className="text-gray-600 text-sm mb-3">
                معرض الأثاث الرئيسي
              </p>
              <span className="text-[#5CAF90] font-medium">
                دبي، الإمارات العربية المتحدة
              </span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-[#5CAF90] to-[#4B9B7A] rounded-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              نحن هنا لمساعدتك
            </h2>
            <p className="text-white/90 mb-6">
              هل لديك سؤال أو تحتاج مساعدة؟ فريقنا جاهز للإجابة على جميع استفساراتك
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
              <Link href="/contact">
                <button className="bg-white text-[#5CAF90] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                  تواصل معنا
                </button>
              </Link>
              <Link href="/faq">
                <button className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium">
                  الأسئلة الشائعة
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pages;