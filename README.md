# 🏠 Grabit - Interior Furniture E-Commerce Website

<div align="center">
  <img src="public/logo.svg" alt="Grabit Logo" width="120" height="120">
  
  ![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)
  ![React](https://img.shields.io/badge/React-19.0.0-blue)
  ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0.14-38B2AC)
  ![License](https://img.shields.io/badge/license-MIT-green)
</div>

## 📖 نظرة عامة

Grabit هو موقع تجارة إلكترونية متطور مختص في بيع الأثاث والديكور المنزلي. تم تطويره باستخدام أحدث التقنيات لتوفير تجربة تسوق سلسة ومريحة للمستخدمين العرب.

### ✨ المميزات الرئيسية

- 🛒 **نظام عربة التسوق المتقدم**: إضافة وإدارة المنتجات بسهولة
- ❤️ **قائمة الأمنيات**: حفظ المنتجات المفضلة
- 🔍 **البحث الذكي**: عثور سريع على المنتجات
- 📱 **تصميم متجاوب**: يعمل بكفاءة على جميع الأجهزة
- 🌙 **واجهة مستخدم أنيقة**: تصميم عصري وسهل الاستخدام
- 🔐 **نظام المصادقة**: تسجيل دخول وإنشاء حسابات
- 💳 **نظام الدفع**: إتمام المشتريات بأمان
- 📊 **لوحة تحكم المستخدم**: إدارة الحساب والطلبات

## 🛠️ التقنيات المستخدمة

- **Frontend Framework**: Next.js 15.5.3
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 4.0.14
- **Icons**: React Icons
- **State Management**: React Context API
- **Build Tool**: Next.js built-in
- **Package Manager**: NPM

## 📋 المتطلبات المسبقة

قبل البدء، تأكد من تثبيت:

- [Node.js](https://nodejs.org/) (الإصدار 18.0 أو أحدث)
- [NPM](https://www.npmjs.com/) أو [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 البدء السريع

### 1. استنساخ المشروع

```bash
git clone https://github.com/your-username/interior-ecommerce.git
cd interior-ecommerce
```

### 2. تثبيت التبعيات

```bash
npm install
# أو
yarn install
```

### 3. تشغيل الخادم المحلي

```bash
npm run dev
# أو
yarn dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح لمشاهدة الموقع.

## 📁 هيكل المشروع

```
interior/
├── app/                    # ملفات التطبيق الرئيسية
│   ├── Components/         # مكونات واجهة المستخدم
│   │   ├── Nav.jsx         # شريط التنقل
│   │   ├── Footer.jsx      # تذييل الصفحة
│   │   ├── ProductCard.jsx # بطاقة المنتج
│   │   └── SearchComponent.jsx # مكون البحث
│   ├── context/           # إدارة الحالة العامة
│   │   └── AppContext.jsx  # السياق الرئيسي
│   ├── products/          # صفحة المنتجات
│   ├── cart/              # صفحة عربة التسوق
│   ├── wishlist/          # صفحة قائمة الأمنيات
│   ├── about/             # صفحة عن الموقع
│   └── layout.jsx         # التخطيط الأساسي
├── public/                # الملفات العامة والصور
├── package.json           # معلومات المشروع والتبعيات
├── next.config.mjs        # إعدادات Next.js
├── tailwind.config.js     # إعدادات Tailwind CSS
└── README.md              # هذا الملف
```

## 🎨 المكونات الرئيسية

### 1. شريط التنقل (Nav)
- عرض شعار الموقع
- قائمة التنقل الرئيسية
- مكون البحث
- أيقونات العربة وقائمة الأمنيات

### 2. بطاقة المنتج (ProductCard)
- عرض صورة ومعلومات المنتج
- أزرار الإضافة للعربة وقائمة الأمنيات
- نظام التقييمات والتقيم

### 3. إدارة الحالة (AppContext)
- إدارة عربة التسوق
- إدارة قائمة الأمنيات
- إدارة المصادقة والمستخدمين

## 🏗️ البناء للإنتاج

```bash
# بناء المشروع
npm run build

# تشغيل النسخة المبنية محلياً
npm run start
```

## 🚀 النشر على Vercel

### الطريقة الأولى: النشر المباشر

1. ادفع المشروع إلى GitHub
2. اذهب إلى [Vercel](https://vercel.com)
3. اربط حسابك بـ GitHub
4. اختر المشروع واضغط "Deploy"

### الطريقة الثانية: استخدام Vercel CLI

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel --prod
```

### متغيرات البيئة (اختيارية)

إذا كان المشروع يحتاج متغيرات بيئة، أنشئ ملف `.env.local`:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## 📱 الصفحات المتاحة

| الصفحة | المسار | الوصف |
|--------|-------|-------|
| الرئيسية | `/` | الصفحة الرئيسية مع أهم المنتجات |
| المنتجات | `/products` | عرض جميع المنتجات مع الفلاتر |
| منتج مفرد | `/product/[id]` | تفاصيل المنتج |
| عربة التسوق | `/cart` | عرض وإدارة المنتجات في العربة |
| قائمة الأمنيات | `/wishlist` | المنتجات المحفوظة |
| التصنيفات | `/categories` | تصنيفات المنتجات |
| العروض | `/offers` | العروض والخصومات |
| حول الموقع | `/about` | معلومات عن الشركة |
| تسجيل الدخول | `/signin` | تسجيل دخول المستخدمين |
| إنشاء حساب | `/signup` | تسجيل مستخدمين جدد |

## 🎯 المميزات المخططة

- [ ] نظام الدفع الإلكتروني
- [ ] تتبع الطلبات
- [ ] نظام التقييمات والمراجعات
- [ ] نظام الإشعارات
- [ ] دعم اللغات المتعددة
- [ ] نظام الخصومات والكوبونات
- [ ] دردشة دعم العملاء

## 🐛 حل المشاكل الشائعة

### مشكلة في البناء
```bash
# امسح ملفات البناء وأعد التثبيت
rm -rf .next node_modules
npm install
npm run build
```

### مشكلة في Tailwind CSS
```bash
# أعد تشغيل الخادم
npm run dev
```

## 👥 المساهمة

نرحب بالمساهمات! إليك كيفية المساهمة:

1. انسخ المشروع (Fork)
2. أنشئ فرع جديد (`git checkout -b feature/amazing-feature`)
3. احفظ التغييرات (`git commit -m 'Add amazing feature'`)
4. ادفع للفرع (`git push origin feature/amazing-feature`)
5. افتح Pull Request

## 📜 الرخصة

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 التواصل

- **الموقع**: [https://your-website.com](https://your-website.com)
- **البريد الإلكتروني**: developer@interior.com
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/your-profile)

## 🙏 شكر وتقدير

- [Next.js](https://nextjs.org/) للفريم وورك الرائع
- [Tailwind CSS](https://tailwindcss.com/) للتصميم السريع
- [React Icons](https://react-icons.github.io/react-icons/) للأيقونات
- [Vercel](https://vercel.com/) لمنصة النشر

---

<div align="center">
  صنع بـ ❤️ للمجتمع العربي
</div>
