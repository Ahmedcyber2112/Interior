"use client";
import Link from "next/link";
import { useState } from "react";
import { IoSearchSharp, IoHeartOutline, IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart, useAuth, useWishlist } from "../context/AppContext";
import SearchComponent from "./SearchComponent";

export default function Nav() {
  const [active, setActive] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { getCartItemsCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { items: wishlistItems } = useWishlist();

  const cartCount = getCartItemsCount();
  const wishlistCount = wishlistItems.length;

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Products", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "Offers", href: "/offers" }
  ];
  
  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#F8F8FB] text-[#777777] px-4 sm:px-[8%] py-2 text-sm">
        <p className="text-center">World's Fastest Online Shopping Destination</p>
      </div>

      {/* Main Navigation */}
      <div className="px-4 sm:px-[8%] py-3 flex justify-between items-center relative">
        {/* Logo with Home Link */}
        <Link href="/" onClick={() => setActive("Home")}>
          <img 
            src="/logo.svg" 
            alt="Logo" 
            className="w-20 sm:w-24 cursor-pointer hover:scale-105 transition-transform duration-300" 
          />
        </Link>
        
        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:block w-[30%]">
          <SearchComponent placeholder="البحث عن المنتجات..." />
        </div>

        {/* Mobile Icons */}
        <div className="flex lg:hidden gap-3 items-center">
          <Link href="/cart">
            <div className="text-2xl text-[#4B5966] relative cursor-pointer hover:text-[#5CAF90] transition-colors">
              <HiOutlineShoppingBag />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl text-[#4B5966] hover:text-[#5CAF90] transition-colors"
          >
            {isMobileMenuOpen ? <IoCloseOutline /> : <IoMenuOutline />}
          </button>
        </div>

        {/* Desktop Icons */}
        <div className="hidden lg:flex gap-4 items-center">
          <Link href={isAuthenticated ? "/account" : "/signin"}>
            <div className="flex gap-1 items-center cursor-pointer hover:text-[#5CAF90] transition-colors">
              <div className="text-2xl text-[#4B5966]"><AiOutlineUser /></div>
              <div className="hidden xl:block">
                <small className="text-[#777777] text-xs block">Account</small>
                <p className="text-[#4B5966] font-bold text-sm">
                  {isAuthenticated ? user?.name || "Profile" : "Login"}
                </p>
              </div>
            </div>
          </Link>
          
          <Link href="/wishlist">
            <div className="flex gap-1 items-center cursor-pointer hover:text-[#5CAF90] transition-colors">
              <div className="text-2xl text-[#4B5966] relative">
                <IoHeartOutline />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:block">
                <small className="text-[#777777] text-xs block">Wishlist</small>
                <p className="text-[#4B5966] font-bold text-sm">
                  {wishlistCount > 0 ? `${wishlistCount} items` : "0 items"}
                </p>
              </div>
            </div>
          </Link>
          
          <Link href="/cart">
            <div className="flex gap-1 items-center cursor-pointer hover:text-[#5CAF90] transition-colors">
              <div className="text-2xl text-[#4B5966] relative">
                <HiOutlineShoppingBag />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden xl:block">
                <small className="text-[#777777] text-xs block">Cart</small>
                <p className="text-[#4B5966] font-bold text-sm">
                  {cartCount > 0 ? `${cartCount} items` : "0 items"}
                </p>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation Menu */}
        <nav className="hidden lg:flex gap-6">
          {navigationItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <span
                onClick={() => setActive(item.name)}
                className={`cursor-pointer px-3 py-2 rounded-md transition-all duration-300 hover:bg-[#5CAF90] hover:text-white ${
                  active === item.name ? "bg-[#5CAF90] text-white" : ""
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-80 h-full shadow-2xl animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <img src="/logo.svg" alt="Logo" className="w-20" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl text-gray-600 hover:text-[#5CAF90] p-2 rounded-full hover:bg-gray-100 transition-all"
                >
                  <IoCloseOutline />
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-6">
                <SearchComponent placeholder="البحث عن المنتجات..." />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-1 mb-6">
                {navigationItems.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <div
                      onClick={() => {
                        setActive(item.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#5CAF90] hover:text-white cursor-pointer group ${
                        active === item.name ? "bg-[#5CAF90] text-white shadow-md" : "text-[#4B5966] hover:shadow-sm"
                      }`}
                    >
                      <span className="font-medium">{item.name}</span>
                      <span className="ml-auto text-sm opacity-60 group-hover:opacity-100">→</span>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* Mobile Icons Section */}
              <div className="space-y-3 border-t pt-6">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-4">الحساب والتسوق</p>
                
                <Link href={isAuthenticated ? "/account" : "/signin"}>
                  <div 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-10 h-10 bg-[#5CAF90]/10 rounded-full flex items-center justify-center">
                      <AiOutlineUser className="text-lg text-[#5CAF90]" />
                    </div>
                    <div>
                      <p className="text-[#4B5966] font-medium">
                        {isAuthenticated ? user?.name || "الملف الشخصي" : "تسجيل الدخول"}
                      </p>
                      <small className="text-[#777777] text-xs">إدارة الحساب</small>
                    </div>
                  </div>
                </Link>

                <Link href="/wishlist">
                  <div 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center relative">
                      <IoHeartOutline className="text-lg text-red-500" />
                      {wishlistCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {wishlistCount}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-[#4B5966] font-medium">المفضلة</p>
                      <small className="text-[#777777] text-xs">
                        {wishlistCount > 0 ? `${wishlistCount} عنصر` : "0 عناصر"}
                      </small>
                    </div>
                  </div>
                </Link>

                <Link href="/cart">
                  <div 
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center relative">
                      <HiOutlineShoppingBag className="text-lg text-blue-500" />
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                          {cartCount}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-[#4B5966] font-medium">العربة</p>
                      <small className="text-[#777777] text-xs">
                        {cartCount > 0 ? `${cartCount} عنصر` : "0 عناصر"}
                      </small>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="border-t border-[#EEEEEE]"></div>
    </>
  );
}
