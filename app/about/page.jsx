"use client";
import { FiAward, FiUsers, FiTruck, FiThumbsUp } from "react-icons/fi";

const About = () => {
  const stats = [
    { icon: FiUsers, number: "10,000+", label: "عميل سعيد" },
    { icon: FiTruck, number: "50,000+", label: "منتج تم توصيله" },
    { icon: FiAward, number: "15+", label: "سنة من الخبرة" },
    { icon: FiThumbsUp, number: "98%", label: "رضا العملاء" }
  ];

  const team = [
    {
      name: "أحمد محمد",
      position: "المدير العام",
      image: "/team1.jpg",
      description: "خبرة 20 سنة في مجال الأثاث والديكور"
    },
    {
      name: "فاطمة أحمد",
      position: "مدير التصميم",
      image: "/team2.jpg",
      description: "مصممة داخلية معتمدة ومتخصصة في الديكور العصري"
    },
    {
      name: "خالد علي",
      position: "مدير المبيعات",
      image: "/team3.jpg",
      description: "متخصص في خدمة العملاء والمبيعات الاستشارية"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            من نحن
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نحن شركة رائدة في مجال الأثاث والديكور المنزلي، نقدم أفضل المنتجات العصرية والكلاسيكية لتجهيز منزلك بأناقة وراحة
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                قصتنا
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  بدأت رحلتنا في عام 2009 برؤية بسيطة: جعل المنازل أكثر جمالاً وراحة. منذ ذلك الحين، نمت شركتنا لتصبح واحدة من أكبر موردي الأثاث والديكور في المنطقة.
                </p>
                <p>
                  نحن نؤمن بأن كل منزل يستحق أن يكون مميزاً، ولذلك نقدم مجموعة واسعة من المنتجات عالية الجودة بأسعار مناسبة للجميع.
                </p>
                <p>
                  فريقنا المتخصص يعمل بجد لضمان حصولك على أفضل تجربة تسوق ممكنة، من اختيار المنتج وحتى التوصيل والتركيب.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="/about-image.jpg" 
                alt="قصتنا" 
                className="w-full h-80 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = "/bghome.png"; // Fallback image
                }}
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-[#5CAF90] to-[#4B9B7A] rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">رؤيتنا</h3>
            <p className="text-white/90">
              أن نكون الخيار الأول للعائلات العربية في تجهيز منازلهم، ونحقق حلم كل عائلة في الحصول على منزل أنيق ومريح يعكس شخصيتهم ويلبي احتياجاتهم.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8 border">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">رسالتنا</h3>
            <p className="text-gray-600">
              نقدم منتجات أثاث وديكور عالية الجودة بأسعار مناسبة، مع خدمة عملاء متميزة وتجربة تسوق سهلة وممتعة، لنساعد عملاءنا في تحويل منازلهم إلى مساحات جميلة ومريحة.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            إنجازاتنا بالأرقام
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#5CAF90] rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-[#5CAF90] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            قيمنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiThumbsUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">الجودة</h3>
              <p className="text-gray-600">
                نحن ملتزمون بتقديم منتجات عالية الجودة تدوم طويلاً وتلبي توقعات عملائنا
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">خدمة العملاء</h3>
              <p className="text-gray-600">
                عملاؤنا هم أولويتنا، ونسعى دائماً لتقديم أفضل خدمة وتجربة تسوق ممتازة
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAward className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">الابتكار</h3>
              <p className="text-gray-600">
                نواكب أحدث صيحات الديكور والتصميم لنقدم لكم الأفضل والأحدث دائماً
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            فريق العمل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-avatar.png"; // Fallback image
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-[#5CAF90] font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#5CAF90] to-[#4B9B7A] rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            اكتشف مجموعتنا
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            تصفح آلاف المنتجات من الأثاث والديكور واجعل منزلك أكثر جمالاً وراحة
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
            <a 
              href="/products"
              className="bg-white text-[#5CAF90] px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium inline-block"
            >
              تصفح المنتجات
            </a>
            <a 
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium inline-block"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;