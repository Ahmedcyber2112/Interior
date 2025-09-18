"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AppContext";
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit3, FiSave, FiX, FiShoppingBag, FiHeart, FiLogOut, FiSettings } from "react-icons/fi";

const Account = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: ""
  });
  const [activeTab, setActiveTab] = useState("profile");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, router]);

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "UAE"
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // في التطبيق الحقيقي، ستقوم بحفظ البيانات في API
    console.log("Saving user data:", formData);
    setIsEditing(false);
    // يمكنك هنا تحديث بيانات المستخدم في Context
  };

  const handleLogout = () => {
    if (window.confirm("هل تريد تسجيل الخروج؟")) {
      logout();
      router.push("/");
    }
  };

  // Mock order data
  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "تم التوصيل",
      total: 299.99,
      items: 3
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "في الطريق",
      total: 149.99,
      items: 1
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "قيد المعالجة",
      total: 89.99,
      items: 2
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "تم التوصيل":
        return "text-green-600 bg-green-100";
      case "في الطريق":
        return "text-blue-600 bg-blue-100";
      case "قيد المعالجة":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5CAF90] mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-[#5CAF90] rounded-full flex items-center justify-center">
                <FiUser className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  أهلاً بك، {user.name}
                </h1>
                <p className="text-gray-600">إدارة حسابك وطلباتك</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 space-x-reverse px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-2">
                {[
                  { id: "profile", label: "الملف الشخصي", icon: FiUser },
                  { id: "orders", label: "طلباتي", icon: FiShoppingBag },
                  { id: "wishlist", label: "المفضلة", icon: FiHeart },
                  { id: "settings", label: "الإعدادات", icon: FiSettings }
                ].map(tab => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-[#5CAF90] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    الملف الشخصي
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-[#5CAF90] text-white rounded-lg hover:bg-[#4B9B7A] transition-colors"
                    >
                      <FiEdit3 className="w-4 h-4" />
                      <span>تعديل</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2 space-x-reverse">
                      <button
                        onClick={handleSave}
                        className="flex items-center space-x-2 space-x-reverse px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FiSave className="w-4 h-4" />
                        <span>حفظ</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex items-center space-x-2 space-x-reverse px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FiX className="w-4 h-4" />
                        <span>إلغاء</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الكامل
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                          isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                          isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الهاتف
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                          isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      المدينة
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                          isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      العنوان
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={3}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                        isEditing ? "border-gray-300" : "border-gray-200 bg-gray-50"
                      }`}
                      placeholder="أدخل عنوانك الكامل"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  طلباتي
                </h2>
                
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-4 space-x-reverse mb-2">
                            <h3 className="font-semibold text-gray-900">
                              طلب #{order.id}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>تاريخ الطلب: {order.date}</p>
                            <p>عدد المنتجات: {order.items}</p>
                          </div>
                        </div>
                        <div className="text-left">
                          <div className="text-lg font-bold text-[#5CAF90] mb-2">
                            ${order.total}
                          </div>
                          <button className="text-sm text-[#5CAF90] hover:text-[#4B9B7A] font-medium">
                            عرض التفاصيل
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {orders.length === 0 && (
                  <div className="text-center py-8">
                    <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      لا توجد طلبات بعد
                    </h3>
                    <p className="text-gray-600 mb-4">
                      ابدأ التسوق واطلب منتجاتك المفضلة
                    </p>
                    <a 
                      href="/products"
                      className="inline-block bg-[#5CAF90] text-white px-6 py-2 rounded-lg hover:bg-[#4B9B7A] transition-colors"
                    >
                      تصفح المنتجات
                    </a>
                  </div>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    قائمة المفضلة
                  </h2>
                  <a 
                    href="/wishlist"
                    className="text-[#5CAF90] hover:text-[#4B9B7A] font-medium"
                  >
                    عرض الكل
                  </a>
                </div>
                
                <div className="text-center py-8">
                  <FiHeart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    إدارة قائمة المفضلة
                  </h3>
                  <p className="text-gray-600 mb-4">
                    احفظ منتجاتك المفضلة وتابع العروض عليها
                  </p>
                  <a 
                    href="/wishlist"
                    className="inline-block bg-[#5CAF90] text-white px-6 py-2 rounded-lg hover:bg-[#4B9B7A] transition-colors"
                  >
                    عرض قائمة المفضلة
                  </a>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  الإعدادات
                </h2>
                
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      إعدادات الإشعارات
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">إشعارات البريد الإلكتروني</p>
                          <p className="text-sm text-gray-600">استقبال إشعارات العروض والطلبات</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5CAF90]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5CAF90]"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">إشعارات SMS</p>
                          <p className="text-sm text-gray-600">استقبال إشعارات حالة الطلب</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5CAF90]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5CAF90]"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-b pb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      إعدادات الحساب
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full text-right px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        تغيير كلمة المرور
                      </button>
                      <button className="w-full text-right px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        تحديث معلومات الدفع
                      </button>
                      <button className="w-full text-right px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        إدارة العناوين
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      منطقة الخطر
                    </h3>
                    <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      حذف الحساب
                    </button>
                    <p className="text-sm text-gray-600 mt-2">
                      تحذير: هذا الإجراء لا يمكن التراجع عنه
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;