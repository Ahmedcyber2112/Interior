"use client";
import { useState } from "react";
import Countdown from "./Components/Countdown";
import ProductCard from "./Components/ProductCard";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import {
  DataProduct,
  DataProducts,
  DataAbout,
  DataProductt,
  DataCards
} from "./Components/Content";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useCart } from "./context/AppContext";
import Link from "next/link";

export default function App() {
  const [active, setActive] = useState("All");
  const { addToCart } = useCart();
  return (
    <>
      <div className="aa space-y-3 sm:space-y-5 pl-[5%] sm:pl-[10%] py-[8%] sm:py-[10%]">
        <p className="text-[#5CAF90] font-medium text-sm sm:text-base">ابتداءً من $ 29.99</p>
        <h1 className="text-[#4B5966] text-3xl sm:text-4xl lg:text-5xl font-bold">
          اكتشف الأثاث<br />
          العصري والأنيق
        </h1>
        <Link href="/products">
          <button className="flex items-center text-sm sm:text-base py-1.5 px-3 font-bold bg-[#4B5966] text-[#FFFFFF] hover:bg-[#5CAF90] transition-colors rounded-md">
            تسوق الآن
            <MdKeyboardDoubleArrowRight />
          </button>
        </Link>
      </div>

      <div className="px-[3%] sm:px-[8%] py-6 sm:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        <div className="text-center rounded-md p-2 sm:p-3 bg-gradient-to-b from-[#5CAF90]/50 via-[#000000] to-[#FFFFFF]">
          <div className="py-2 sm:py-3 w-full max-w-[180px] mx-auto bg-white rounded">
            <img className="mx-auto w-12 h-12 sm:w-16 sm:h-16 object-contain" src="/Vector1.png" alt="Fruits" />
            <h4 className="text-base sm:text-lg font-bold">Fruits</h4>
            <p className="text-[#777777] text-xs sm:text-sm">320 Items</p>
          </div>
        </div>
        <div className="text-center rounded-md p-2 sm:p-3 bg-gradient-to-b from-[#5CAF90]/50 via-[#000000] to-[#FFFFFF]">
          <div className="py-2 sm:py-3 w-full max-w-[180px] mx-auto bg-white rounded">
            <img className="mx-auto w-12 h-12 sm:w-16 sm:h-16 object-contain" src="/Vector2.png" alt="Bakery" />
            <h4 className="text-base sm:text-lg font-bold">Bakery</h4>
            <p className="text-[#777777] text-xs sm:text-sm">65 Items</p>
          </div>
        </div>
        <div className="text-center rounded-md p-2 sm:p-3 bg-gradient-to-b from-[#5CAF90]/50 via-[#000000] to-[#FFFFFF]">
          <div className="py-2 sm:py-3 w-full max-w-[180px] mx-auto bg-white rounded">
            <img className="mx-auto w-12 h-12 sm:w-16 sm:h-16 object-contain" src="/Vector3.png" alt="Vegetables" />
            <h4 className="text-base sm:text-lg font-bold">Vegetables</h4>
            <p className="text-[#777777] text-xs sm:text-sm">548 Items</p>
          </div>
        </div>
        <div className="text-center rounded-md p-2 sm:p-3 bg-gradient-to-b from-[#5CAF90]/50 via-[#000000] to-[#FFFFFF]">
          <div className="py-2 sm:py-3 w-full max-w-[180px] mx-auto bg-white rounded">
            <img className="mx-auto w-12 h-12 sm:w-16 sm:h-16 object-contain" src="/Vector4.png" alt="Dairy & Milk" />
            <h4 className="text-base sm:text-lg font-bold">Dairy & Milk</h4>
            <p className="text-[#777777] text-xs sm:text-sm">48 Items</p>
          </div>
        </div>
        <div className="text-center rounded-md p-2 sm:p-3 bg-gradient-to-b from-[#5CAF90]/50 via-[#000000] to-[#FFFFFF]">
          <div className="py-2 sm:py-3 w-full max-w-[180px] mx-auto bg-white rounded">
            <img className="mx-auto w-12 h-12 sm:w-16 sm:h-16 object-contain" src="/Vector5.png" alt="Snack & Spice" />
            <h4 className="text-base sm:text-lg font-bold">Snack & Spice</h4>
            <p className="text-[#777777] text-xs sm:text-sm">59 Items</p>
          </div>
        </div>
        <div className="text-center rounded-md p-2 sm:p-3 bg-gradient-to-b from-[#5CAF90]/50 via-[#000000] to-[#FFFFFF]">
          <div className="py-2 sm:py-3 w-full max-w-[180px] mx-auto bg-white rounded">
            <img className="mx-auto w-12 h-12 sm:w-16 sm:h-16 object-contain" src="/Vector6.png" alt="Juice & Drinks" />
            <h4 className="text-base sm:text-lg font-bold">Juice & Drinks</h4>
            <p className="text-[#777777] text-xs sm:text-sm">845 Items</p>
          </div>
        </div>
      </div>

      <div className="px-3 sm:px-[5%] lg:px-[8%]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div className="">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Day of the <span className="text-[#5CAF90]">deal</span>
            </h2>
            <p className="text-[#777777] text-sm sm:text-base">
              Don`t wait. The time will never be just right.
            </p>
          </div>
          <div className="w-full sm:w-auto">
            <Countdown targetDate="2025-04-10T00:00:00" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mt-6 sm:mt-10">
          {DataProduct.map((product) => (
            <div key={product.id} className="w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-3 sm:mx-[4%] lg:mx-[8%] flex flex-col lg:flex-row justify-center items-center text-center rounded-3xl py-8 sm:py-[4%] mt-10 sm:mt-15 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="space-y-4 sm:space-y-5 px-4 sm:px-8 w-full max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#4B5966]">
            أثاث عصري
            <br />
            تصاميم أنيقة
          </h1>
          <p className="text-[#777777] text-lg sm:text-xl">
            <span className="text-[#5CAF90] font-semibold text-xl sm:text-2xl">خصم 30%</span> أسرع الآن!!!
          </p>
          <button className="bg-[#5CAF90] text-white py-3 sm:py-4 px-8 sm:px-10 rounded-lg text-lg font-semibold hover:bg-[#4a9b7f] transition-all duration-300 transform hover:scale-105 shadow-lg">
            تسوق الآن
          </button>
        </div>
      </div>

      <div className="px-3 sm:px-[5%] lg:px-[8%] mt-10 sm:mt-15">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
          <div className="">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              New <span className="text-[#5CAF90]">Arrivals</span>
            </h2>
            <p className="text-[#777777] text-sm sm:text-base">
              Shop online for new arrivals and get free shipping!
            </p>
          </div>
          <ul className="flex flex-wrap gap-2 sm:gap-5">
            <li
              onClick={() => setActive("All")}
              className={`cursor-pointer flex items-center gap-1 font-medium text-sm sm:text-lg px-2 sm:px-3 py-1 rounded-md transition-all duration-300 ${
                active === "All" ? "text-[#5CAF90]" : ""
              }`}
            >
              All
            </li>
            <li
              onClick={() => setActive("Snack")}
              className={`cursor-pointer flex items-center gap-1 font-medium text-sm sm:text-lg px-2 sm:px-3 py-1 rounded-md transition-all duration-300 ${
                active === "Snack" ? "text-[#5CAF90]" : ""
              }`}
            >
              <span className="hidden sm:inline">Snack & </span>Spices
            </li>
            <li
              onClick={() => setActive("Fruits")}
              className={`cursor-pointer flex items-center gap-1 font-medium text-sm sm:text-lg px-2 sm:px-3 py-1 rounded-md transition-all duration-300 ${
                active === "Fruits" ? "text-[#5CAF90]" : ""
              }`}
            >
              Fruits
            </li>
            <li
              onClick={() => setActive("Vegetables")}
              className={`cursor-pointer flex items-center gap-1 font-medium text-sm sm:text-lg px-2 sm:px-3 py-1 rounded-md transition-all duration-300 ${
                active === "Vegetables" ? "text-[#5CAF90]" : ""
              }`}
            >
              Vegetables
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 mt-6 sm:mt-10">
          {DataProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <div className="mx-[3%] sm:mx-[4%] lg:mx-[8%] flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center text-center rounded-2xl sm:rounded-3xl py-6 sm:py-[4%] mt-8 sm:mt-15 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="w-full lg:w-[45%] py-[4%] sm:py-[3%] flex justify-center">
          <div className="space-y-3 sm:space-y-5 bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4B5966]">
              أثاث مميز
              <br />وجودة عالية
            </h1>
            <p className="text-[#777777] text-base sm:text-lg">
              طعم الجمال
              <br />
              في كل قطعة
            </p>
            <button className="bg-[#5CAF90] text-white py-2 px-6 rounded-lg text-sm sm:text-base hover:bg-[#4a9b7f] transition-all duration-300 transform hover:scale-105 shadow-md">
              تسوق الآن
            </button>
          </div>
        </div>
        <div className="w-full lg:w-[45%] py-[4%] sm:py-[3%] flex justify-center">
          <div className="space-y-3 sm:space-y-5 bg-white p-6 rounded-xl shadow-lg">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4B5966]">
              ديكور راقي
              <br />وعصري
            </h1>
            <p className="text-[#777777] text-base sm:text-lg">
              تصاميم أنيقة
              <br />
              لكل منزل
            </p>
            <button className="bg-[#5CAF90] text-white py-2 px-6 rounded-lg text-sm sm:text-base hover:bg-[#4a9b7f] transition-all duration-300 transform hover:scale-105 shadow-md">
              تسوق الآن
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 px-[3%] sm:px-[8%] text-center my-6 sm:my-10">
        {DataAbout.map((item) => (
          <article
            key={item.id}
            className="border border-gray-300 rounded-md p-3 sm:p-5"
          >
            <img className="mx-auto w-12 h-12 sm:w-16 sm:h-16 object-contain" src={item.icon} alt={item.title} />
            <h2 className="text-base sm:text-lg font-bold my-1 sm:my-2">{item.title}</h2>
            <p className="text-sm sm:text-base text-gray-600">{item.dish}</p>
          </article>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-15 my-6 sm:my-10 px-[3%] sm:px-[5%]">
        <div className="gg w-full lg:w-[25%] pt-6 sm:pt-10 space-y-3 sm:space-y-4">
          <h2 className="text-xl sm:text-2xl text-[#444444] pl-0 sm:pl-5 font-bold">
            أفضل منتجاتنا
            <br />
            اكتشفها الآن
          </h2>
          <button className="ml-0 sm:ml-5 bg-[#5CAF90] text-white py-1 px-4 rounded-md text-sm sm:text-base hover:bg-[#4a9b7f] transition-colors">
            تسوق الآن
          </button>
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0">
              <h4 className="text-xl sm:text-2xl font-bold">
                Trending <span className="text-[#5CAF90]">Items</span>
              </h4>
              <div className="flex">
                <IoIosArrowBack className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
                <IoIosArrowForward className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0">
              <h4 className="text-xl sm:text-2xl font-bold">
                Top <span className="text-[#5CAF90]">Rated</span>
              </h4>
              <div className="flex">
                <IoIosArrowBack className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
                <IoIosArrowForward className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0">
              <h4 className="text-xl sm:text-2xl font-bold">
                Top <span className="text-[#5CAF90]">Selling</span>
              </h4>
              <div className="flex">
                <IoIosArrowBack className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
                <IoIosArrowForward className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 sm:mt-5 gap-3 sm:gap-5">
            {DataProductt.map((product) => (
              <div
                key={product.id}
                className="flex gap-3 border border-[#777777]/30 rounded-md p-2 cursor-pointer hover:shadow-md transition-shadow"
              >
                <img src={product.img} alt={product.title} className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded" />
                <div className="flex-1">
                  <h2 className="text-[#777777] text-sm sm:text-base">{product.title}</h2>
                  <p className="text-[#999999] text-xs sm:text-sm">{product.dish}</p>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex gap-2">
                      <p className="font-bold text-sm sm:text-base">{product.prise}</p>
                      <p className="text-[#777777] line-through text-sm sm:text-base">{product.prise2}</p>
                    </div>
                    <button
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.title,
                        price: parseFloat(product.prise.replace(/[^0-9.]/g, '')),
                        originalPrice: parseFloat(product.prise2?.replace(/[^0-9.]/g, '') || product.prise.replace(/[^0-9.]/g, '')),
                        image: product.img,
                        category: product.dish
                      })}
                      className="text-[#5CAF90] hover:text-[#4a9b7f] transition-colors text-sm sm:text-base"
                    >
                      <FaShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-[3%] sm:px-[5%]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Latest <span className="text-[#5CAF90]">Blog</span>
            </h3>
            <p className="text-[#777777] text-sm sm:text-base">
              We tackle interesting topics every day in 2023.
            </p>
          </div>
          <button className="flex gap-1 text-[#777777] items-center text-sm sm:text-base hover:text-[#5CAF90] transition-colors">
            All Blogs
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
        <div className="my-6 sm:my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {DataCards.map((item) => (
            <article key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="overflow-hidden rounded-t-lg">
                <img src={item.img} alt={item.title} className="w-full h-40 sm:h-48 object-cover" />
              </div>
              <div className="p-3 sm:p-4">
                <p className="text-[#999999] text-xs sm:text-sm">{item.dish}</p>
                <h2 className="text-sm sm:text-base font-bold text-[#4B5966] mt-1 mb-2">
                  {item.title}
                </h2>
                <button className="text-[#4B5966] flex items-center gap-1 text-sm hover:text-[#5CAF90] transition-colors">
                  {item.button}
                  <MdKeyboardDoubleArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
