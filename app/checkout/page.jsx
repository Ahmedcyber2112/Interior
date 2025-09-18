"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart, useAuth } from "../context/AppContext";
import { FiCreditCard, FiMapPin, FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

const Checkout = () => {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Shipping Information
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "UAE",
  });

  // Payment Information
  const [paymentInfo, setPaymentInfo] = useState({
    method: "card", // card, paypal, cash
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  // التحقق من وجود منتجات في العربة
  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      router.push("/cart");
    }
  }, [items, router, orderPlaced]);

  // تعبئة البيانات من المستخدم المسجل
  useEffect(() => {
    if (isAuthenticated && user) {
      setShippingInfo(prev => ({
        ...prev,
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [isAuthenticated, user]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateShipping = () => {
    const newErrors = {};
    
    if (!shippingInfo.firstName.trim()) newErrors.firstName = "الاسم الأول مطلوب";
    if (!shippingInfo.lastName.trim()) newErrors.lastName = "الاسم الأخير مطلوب";
    if (!shippingInfo.email) newErrors.email = "البريد الإلكتروني مطلوب";
    else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) newErrors.email = "البريد الإلكتروني غير صحيح";
    if (!shippingInfo.phone) newErrors.phone = "رقم الهاتف مطلوب";
    if (!shippingInfo.address.trim()) newErrors.address = "العنوان مطلوب";
    if (!shippingInfo.city.trim()) newErrors.city = "المدينة مطلوبة";
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = "الرمز البريدي مطلوب";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    
    if (paymentInfo.method === "card") {
      if (!paymentInfo.cardNumber) newErrors.cardNumber = "رقم البطاقة مطلوب";
      else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ""))) newErrors.cardNumber = "رقم البطاقة غير صحيح";
      
      if (!paymentInfo.expiryDate) newErrors.expiryDate = "تاريخ الانتهاء مطلوب";
      else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) newErrors.expiryDate = "تاريخ الانتهاء غير صحيح";
      
      if (!paymentInfo.cvv) newErrors.cvv = "CVV مطلوب";
      else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) newErrors.cvv = "CVV غير صحيح";
      
      if (!paymentInfo.cardholderName.trim()) newErrors.cardholderName = "اسم حامل البطاقة مطلوب";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateShipping()) {
      setStep(2);
    } else if (step === 2 && validatePayment()) {
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    if (!validatePayment()) return;
    
    setIsLoading(true);
    
    try {
      // محاكاة طلب الدفع
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // في التطبيق الحقيقي، ستقوم بإرسال البيانات إلى API
      const orderData = {
        id: Date.now(),
        items: items,
        shipping: shippingInfo,
        payment: { ...paymentInfo, cardNumber: paymentInfo.cardNumber.slice(-4) }, // إخفاء رقم البطاقة
        total: getCartTotal(),
        date: new Date().toISOString(),
        status: "confirmed"
      };
      
      console.log("Order placed:", orderData);
      
      // إفراغ العربة
      clearCart();
      setOrderPlaced(true);
      setStep(4);
      
    } catch (error) {
      setErrors({ general: "حدث خطأ أثناء معالجة الطلب" });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentInfo(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    setPaymentInfo(prev => ({
      ...prev,
      expiryDate: value
    }));
  };

  if (orderPlaced && step === 4) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              تم تأكيد طلبك!
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              شكراً لك على طلبك. سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={() => router.push("/")}
                className="w-full bg-[#5CAF90] text-white py-2.5 sm:py-3 rounded-lg hover:bg-[#4B9B7A] transition-colors text-sm sm:text-base"
              >
                العودة للرئيسية
              </button>
              <button
                onClick={() => router.push("/products")}
                className="w-full border border-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
                متابعة التسوق
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
            {[
              { step: 1, title: "معلومات الشحن", icon: FiMapPin },
              { step: 2, title: "طريقة الدفع", icon: FiCreditCard },
              { step: 3, title: "مراجعة الطلب", icon: FiLock }
            ].map(({ step: stepNum, title, icon: Icon }) => (
              <div key={stepNum} className="flex items-center w-full sm:w-auto">
                <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                  step >= stepNum ? "bg-[#5CAF90] text-white" : "bg-gray-200 text-gray-500"
                }`}>
                  {step > stepNum ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </div>
                <span className={`ml-2 sm:ml-3 text-xs sm:text-sm font-medium ${
                  step >= stepNum ? "text-[#5CAF90]" : "text-gray-500"
                }`}>
                  {title}
                </span>
                {stepNum < 3 && (
                  <div className={`hidden sm:block ml-4 sm:ml-6 w-12 sm:w-16 h-0.5 ${
                    step > stepNum ? "bg-[#5CAF90]" : "bg-gray-200"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-2">
            {/* Step 1: Shipping Information */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">معلومات الشحن</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم الأول *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] text-sm sm:text-base ${
                          errors.firstName ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="الاسم الأول"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الاسم الأخير *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                          errors.lastName ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="الاسم الأخير"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      البريد الإلكتروني *
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={shippingInfo.email}
                        onChange={handleShippingChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                          errors.email ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="البريد الإلكتروني"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      رقم الهاتف *
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                          errors.phone ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="رقم الهاتف"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      العنوان *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                        errors.address ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="العنوان الكامل"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      المدينة *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                        errors.city ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="المدينة"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      المنطقة / الولاية
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90]"
                      placeholder="المنطقة"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الرمز البريدي *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                        errors.zipCode ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="الرمز البريدي"
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      الدولة
                    </label>
                    <select
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90]"
                    >
                      <option value="UAE">الإمارات العربية المتحدة</option>
                      <option value="SA">المملكة العربية السعودية</option>
                      <option value="EG">مصر</option>
                      <option value="JO">الأردن</option>
                      <option value="LB">لبنان</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="bg-[#5CAF90] text-white px-6 py-2 rounded-lg hover:bg-[#4B9B7A] transition-colors"
                  >
                    التالي
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6">طريقة الدفع</h2>

                {/* Payment Methods */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentInfo.method === "card"}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, method: e.target.value }))}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <FiCreditCard className="h-5 w-5 mr-2" />
                        <span>بطاقة ائتمان / خصم</span>
                        <div className="flex ml-auto space-x-2 space-x-reverse">
                          <FaCcVisa className="h-6 w-6 text-blue-600" />
                          <FaCcMastercard className="h-6 w-6 text-red-600" />
                        </div>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentInfo.method === "paypal"}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, method: e.target.value }))}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <FaCcPaypal className="h-5 w-5 mr-2 text-blue-600" />
                        <span>PayPal</span>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentInfo.method === "cash"}
                        onChange={(e) => setPaymentInfo(prev => ({ ...prev, method: e.target.value }))}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <span>الدفع عند الاستلام</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Card Details */}
                {paymentInfo.method === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        رقم البطاقة *
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength="19"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                          errors.cardNumber ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          تاريخ الانتهاء *
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.expiryDate}
                          onChange={handleExpiryDateChange}
                          maxLength="5"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                            errors.expiryDate ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="MM/YY"
                        />
                        {errors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          maxLength="4"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                            errors.cvv ? "border-red-300" : "border-gray-300"
                          }`}
                          placeholder="123"
                        />
                        {errors.cvv && (
                          <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        اسم حامل البطاقة *
                      </label>
                      <input
                        type="text"
                        name="cardholderName"
                        value={paymentInfo.cardholderName}
                        onChange={handlePaymentChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CAF90] ${
                          errors.cardholderName ? "border-red-300" : "border-gray-300"
                        }`}
                        placeholder="اسم حامل البطاقة"
                      />
                      {errors.cardholderName && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    السابق
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-[#5CAF90] text-white px-6 py-2 rounded-lg hover:bg-[#4B9B7A] transition-colors"
                  >
                    التالي
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6">مراجعة الطلب</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 space-x-reverse p-4 border rounded-lg">
                      <img
                        src={item.image || "/product1.png"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-gray-500">الكمية: {item.quantity}</p>
                      </div>
                      <div className="text-lg font-semibold text-[#5CAF90]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Info */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-3">عنوان الشحن</h3>
                    <div className="text-sm text-gray-600">
                      <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                      <p>{shippingInfo.address}</p>
                      <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                      <p>{shippingInfo.country}</p>
                      <p>{shippingInfo.phone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">طريقة الدفع</h3>
                    <div className="text-sm text-gray-600">
                      {paymentInfo.method === "card" && (
                        <p>بطاقة ائتمان منتهية بـ {paymentInfo.cardNumber.slice(-4)}</p>
                      )}
                      {paymentInfo.method === "paypal" && <p>PayPal</p>}
                      {paymentInfo.method === "cash" && <p>الدفع عند الاستلام</p>}
                    </div>
                  </div>
                </div>

                {errors.general && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                    {errors.general}
                  </div>
                )}

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    السابق
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    className="bg-[#5CAF90] text-white px-6 py-2 rounded-lg hover:bg-[#4B9B7A] transition-colors disabled:opacity-50"
                  >
                    {isLoading ? "جاري المعالجة..." : "تأكيد الطلب"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">ملخص الطلب</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span>$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span>الضريبة</span>
                  <span>${(getCartTotal() * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>المجموع الإجمالي</span>
                    <span className="text-[#5CAF90]">
                      ${(getCartTotal() + 10 + (getCartTotal() * 0.05)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <FiLock className="w-4 h-4 mr-1" />
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

export default Checkout;