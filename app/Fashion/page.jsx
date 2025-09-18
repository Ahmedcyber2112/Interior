"use client";
import { useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import {
  DataFashion,
  DataProductFashion,
  DataProductFashions,
  DataAbout,
  DataItem,
  DataPated,
  DataSelling
} from "../Components/Content";
import Countdown from "../Components/Countdown";
const page = () => {
  const [active, setActive] = useState("All");
  return (
    <>
      <div className="bg-[#F7F7F7]">
        <div className="hh space-y-3 sm:space-y-5 pl-[5%] sm:pl-[10%] py-[8%] sm:py-[10%]">
          <p className="text-[#5CAF90] font-medium text-sm sm:text-base">Starting at $ 29.99</p>
          <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">
            Explore glasses
            <br />
            sale for Women's
          </h1>
          <button className="flex gap-1 rounded-md items-center text-sm sm:text-base py-1.5 px-3 font-bold bg-[#4B5966] text-[#FFFFFF] hover:bg-[#5CAF90] transition-colors">
            Shop Now
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>

        <div className="mx-[3%] my-6 sm:my-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-5 px-[2%] sm:px-[4%] py-6 sm:py-10 bg-white rounded-md">
          {DataFashion.map((no) => (
            <article
              key={no.id}
              className="relative bg-[#F7F7F7] rounded-md mx-auto text-center py-2 sm:py-3 px-2 w-full"
            >
              <img src={no.img} alt={no.title} className="mx-auto w-12 h-12 sm:w-16 sm:h-16 object-contain" />
              <h4 className="text-[#4B5966] font-bold text-sm sm:text-base">{no.title}</h4>
              <p className="text-[#777777] text-xs sm:text-sm">{no.dish}</p>
              <small className="absolute bg-[#5CAF90] text-white text-xs sm:text-sm top-2 right-2 px-1 py-0.5 rounded">
                {no.sala}
              </small>
            </article>
          ))}
        </div>

        <div className="px-[3%] sm:px-[4%] lg:px-[8%]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-0">
            <div>
              <h3 className="text-[#4B5966] text-2xl sm:text-3xl font-bold">
                Day of the <span className="text-[#5CAF90]">deal</span>
              </h3>
              <p className="text-[#777777] text-sm sm:text-base mt-2">Don't wait. The time will never be just right.</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Countdown targetDate="2025-04-10T00:00:00" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 mt-6 sm:mt-10">
            {DataProductFashion.map((pero) => (
              <article
                key={pero.id}
                className="border-2 border-[#777777]/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img src={pero.img} alt={pero.name} className="w-full h-48 sm:h-52 object-cover" />
                  <p className="absolute text-white bg-[#FF7070] rounded-md top-2 sm:top-4 right-2 sm:right-4 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm font-bold">
                    {pero.sale}
                  </p>
                </div>
                <div className="border-t border-[#777]/30 w-full"></div>
                <div className="p-3 sm:p-5">
                  <p className="text-[#777777] text-xs sm:text-sm">{pero.dish}</p>
                  <h3 className="text-base sm:text-lg font-bold mt-1">{pero.name}</h3>
                  <div className="flex gap-1 sm:gap-2 text-sm sm:text-lg my-2">
                    <FaStar className="text-yellow-300" />
                    <FaStar className="text-yellow-300" />
                    <FaStar className="text-yellow-300" />
                    <FaStar className="text-[#777777]" />
                    <FaStar className="text-[#777777]" />
                  </div>
                  <div className="flex gap-3 sm:gap-5">
                    <p className="font-bold text-sm sm:text-base">{pero.prise}</p>
                    <p className="text-[#777777] line-through text-sm sm:text-base">
                      {pero.prise2}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="jj mx-[3%] flex justify-center sm:justify-end text-center px-[5%] sm:px-[5%] lg:pr-[5%] rounded-2xl sm:rounded-3xl py-[6%] sm:py-[9%] mt-8 sm:mt-15">
          <div className="space-y-3 sm:space-y-5">
            <p className="text-white text-base sm:text-lg">30% off sale</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Latest Exclusive
              <br />
              Summer Collection
            </h1>
            <button className="bg-[#5CAF90] text-white py-1.5 px-4 sm:px-5 rounded-md text-sm sm:text-base hover:bg-[#4B9D7F] transition-colors">
              Shop now
            </button>
          </div>
        </div>

        <div className="px-[3%] sm:px-[8%] mt-8 sm:mt-15">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-0">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                New <span className="text-[#5CAF90]">Arrivals</span>
              </h2>
              <p className="text-[#777777] text-sm sm:text-base mt-2">
                Shop online for new arrivals and get free shipping!
              </p>
            </div>
            <ul className="flex flex-wrap gap-2 sm:gap-5 mt-4 sm:mt-0">
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
                Snack & Spices
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
            {DataProductFashions.map((no) => (
              <article
                key={no.id}
                className="border-2 border-[#777777]/30 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img src={no.img} alt={no.name} className="w-full h-48 sm:h-52 object-cover" />
                  <p className="absolute text-white bg-[#FF7070] rounded-md top-2 sm:top-4 right-2 sm:right-4 px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm font-bold">
                    {no.sale}
                  </p>
                </div>
                <div className="border-t border-[#777]/30 w-full"></div>
                <div className="p-3 sm:p-5">
                  <p className="text-[#777777] text-xs sm:text-sm">{no.dish}</p>
                  <h3 className="text-base sm:text-lg font-bold mt-1">{no.name}</h3>
                  <div className="flex gap-1 sm:gap-2 text-sm sm:text-lg my-2">
                    <FaStar className="text-yellow-300" />
                    <FaStar className="text-yellow-300" />
                    <FaStar className="text-yellow-300" />
                    <FaStar className="text-[#777777]" />
                    <FaStar className="text-[#777777]" />
                  </div>
                  <div className="flex gap-3 sm:gap-5">
                    <p className="font-bold text-sm sm:text-base">{no.prise}</p>
                    <p className="text-[#777777] line-through text-sm sm:text-base">{no.prise2}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-10 mx-[3%] sm:mx-[8%] py-[4%]">
          <div className="kk w-full md:w-1/3 rounded-lg py-[6%] sm:py-[3%] pl-4 sm:pl-5">
            <h2 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">
              Women's
              <br />
              Collection
            </h2>
            <button className="text-white py-1 px-2 rounded-md bg-[#5CAF90] text-sm sm:text-base mt-2 hover:bg-[#4B9D7F] transition-colors">
              Shop Now
            </button>
          </div>
          <div className="ll w-full md:w-1/3 rounded-lg py-[6%] sm:py-[3%] pl-4 sm:pl-5">
            <h2 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">
              Kid's
              <br />
              Collection
            </h2>
            <button className="text-white py-1 px-2 rounded-md bg-[#5CAF90] text-sm sm:text-base mt-2 hover:bg-[#4B9D7F] transition-colors">
              Shop Now
            </button>
          </div>
          <div className="zz w-full md:w-1/3 rounded-lg py-[6%] sm:py-[3%] pl-4 sm:pl-5">
            <h2 className="text-white font-bold text-xl sm:text-2xl lg:text-3xl">
              Men's
              <br />
              Collection
            </h2>
            <button className="text-white py-1 px-2 rounded-md bg-[#5CAF90] text-sm sm:text-base mt-2 hover:bg-[#4B9D7F] transition-colors">
              Shop Now
            </button>
          </div>
        </div>

        <div className="bg-white mx-[3%] sm:mx-[4%] lg:mx-[8%] rounded-lg py-[4%] sm:py-[2%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 px-[4%] sm:px-[8%] text-center">
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

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-[2%] px-[3%] sm:px-[8%]">
          <h2 className="text-[#4B5966] text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">
            Trending<span className="text-[#5CAF90]">Items</span>
          </h2>
          <div className="flex gap-1 text-xl sm:text-2xl text-[#4B5966]">
            <IoIosArrowBack className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
            <IoIosArrowForward className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 px-[4%] sm:px-[8%]">
          {DataItem.map((noo) => (
            <article key={noo.id} className="flex gap-3 sm:gap-5 p-2 sm:p-0">
              <img src={noo.img} alt={noo.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold text-sm sm:text-base text-[#777777]">
                  {noo.title}
                </h3>
                <p className="text-[#999999] text-xs sm:text-sm">{noo.dish}</p>
                <div className="flex gap-3 sm:gap-10 mt-1">
                  <p className="font-bold text-sm sm:text-base">{noo.prise}</p>
                  <p className="text-[#777777] line-through text-sm sm:text-base">{noo.prise2}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-[2%] px-[3%] sm:px-[8%]">
          <h2 className="text-[#4B5966] text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">
            Top<span className="text-[#5CAF90]">Rated</span>
          </h2>
          <div className="flex gap-1 text-xl sm:text-2xl text-[#4B5966]">
            <IoIosArrowBack className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
            <IoIosArrowForward className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 px-[4%] sm:px-[8%]">
          {DataPated.map((nooo) => (
            <article key={nooo.id} className="flex gap-3 sm:gap-5 p-2 sm:p-0">
              <img src={nooo.img} alt={nooo.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold text-sm sm:text-base text-[#777777]">
                  {nooo.title}
                </h3>
                <p className="text-[#999999] text-xs sm:text-sm">{nooo.dish}</p>
                <div className="flex gap-3 sm:gap-10 mt-1">
                  <p className="font-bold text-sm sm:text-base">{nooo.prise}</p>
                  <p className="text-[#777777] line-through text-sm sm:text-base">{nooo.prise2}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-[2%] px-[3%] sm:px-[8%]">
          <h2 className="text-[#4B5966] text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">
            Top<span className="text-[#5CAF90]">Selling</span>
          </h2>
          <div className="flex gap-1 text-xl sm:text-2xl text-[#4B5966]">
            <IoIosArrowBack className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
            <IoIosArrowForward className="cursor-pointer hover:text-[#5CAF90] transition-colors" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-10 px-[4%] sm:px-[8%] pb-6 sm:pb-10">
          {DataSelling.map((noooo) => (
            <article key={noooo.id} className="flex gap-3 sm:gap-5 p-2 sm:p-0">
              <img src={noooo.img} alt={noooo.title} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold text-sm sm:text-base text-[#777777]">
                  {noooo.title}
                </h3>
                <p className="text-[#999999] text-xs sm:text-sm">{noooo.dish}</p>
                <div className="flex gap-3 sm:gap-10 mt-1">
                  <p className="font-bold text-sm sm:text-base">{noooo.prise}</p>
                  <p className="text-[#777777] line-through text-sm sm:text-base">{noooo.prise2}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
