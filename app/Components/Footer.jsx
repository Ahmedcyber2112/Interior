import { IoLocationOutline } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
    <div className="border border-gray-200 w-full"></div>
      <div className="px-4 sm:px-[3%] lg:px-[8%] py-6 sm:py-8 lg:py-[3%] flex flex-col lg:flex-row gap-8 lg:gap-10 justify-between">
        <div className="space-y-4 sm:space-y-5 text-center lg:text-left flex-1 lg:flex-none lg:max-w-xs">
          <img src="/logo.svg" alt="Logo" className="mx-auto lg:mx-0 w-20 sm:w-auto" />
          <p className="text-[#777777] text-sm sm:text-base">
            Grabit is the biggest market of grocery products.<br />
            Get your daily needs from our store.
          </p>
          <div className="flex gap-3 sm:gap-5 justify-center lg:justify-start">
            <img src="/googleplay.png" alt="Google Play" className="h-10 sm:h-auto" />
            <img src="/appstor.png" alt="App Store" className="h-10 sm:h-auto" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 flex-1 text-center lg:text-left">
          <ul className="space-y-2 sm:space-y-3">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#4B5966] mb-3">Category</h2>
            <div className="border border-gray-200 w-full mb-3"></div>
            {["Dried Fruit", "Cookies", "Foods", "Fresh Fruit", "Tuber root", "Vegetables"].map((item) => (
              <li key={item} className="text-[#777777] text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:text-red-500 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>

          <ul className="space-y-2 sm:space-y-3">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#4B5966] mb-3">Company</h2>
            <div className="border border-gray-200 w-full mb-3"></div>
            {["About us", "Delivery", "Legal Notice", "Terms & conditions", "Secure payment", "Contact us"].map((item) => (
              <li key={item} className="text-[#777777] text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:text-red-500 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>

          <ul className="space-y-2 sm:space-y-3 sm:col-span-2 lg:col-span-1">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#4B5966] mb-3">Account</h2>
            <div className="border border-gray-200 w-full mb-3"></div>
            {["Sign In", "View Cart", "Return Policy", "Become a Vendor", "Affiliate Program", "Payments"].map((item) => (
              <li key={item} className="text-[#777777] text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:text-red-500 cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-4 sm:space-y-5 text-center lg:text-left flex-1 lg:flex-none lg:max-w-xs">
          <p className="text-[#777777] text-sm sm:text-base flex items-start gap-2 justify-center lg:justify-start">
            <IoLocationOutline className="text-[#5CAF90] text-lg sm:text-2xl mt-1 flex-shrink-0" />
            <span>2548 Broaddus Maple Court, Madisonville KY 4783, USA.</span>
          </p>
          <p className="text-[#777777] text-sm sm:text-base flex items-center gap-2 justify-center lg:justify-start">
            <IoLogoWhatsapp className="text-[#5CAF90] text-lg sm:text-2xl flex-shrink-0" />
            +00 9876543210
          </p>
          <p className="text-[#777777] text-sm sm:text-base flex items-center gap-2 justify-center lg:justify-start">
            <MdOutlineMail className="text-[#5CAF90] text-lg sm:text-2xl flex-shrink-0" />
            example@email.com
          </p>
          <div className="flex gap-3 sm:gap-5 justify-center lg:justify-start mt-4 sm:mt-5">
            <FaFacebookF className="bg-[#4B5966] text-white w-8 h-8 sm:w-9 sm:h-9 p-2 rounded-md transition-all duration-300 hover:scale-105 hover:text-blue-400 cursor-pointer" />
            <FaTwitter className="bg-[#4B5966] text-white w-8 h-8 sm:w-9 sm:h-9 p-2 rounded-md transition-all duration-300 hover:scale-105 hover:text-blue-400 cursor-pointer" />
            <FaLinkedinIn className="bg-[#4B5966] text-white w-8 h-8 sm:w-9 sm:h-9 p-2 rounded-md transition-all duration-300 hover:scale-105 hover:text-blue-400 cursor-pointer" />
            <FaInstagram className="bg-[#4B5966] text-white w-8 h-8 sm:w-9 sm:h-9 p-2 rounded-md transition-all duration-300 hover:scale-105 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-[3%] lg:px-[8%] py-3 sm:py-2 flex flex-col sm:flex-row items-center justify-between bg-[#F8F8FB] text-center gap-3 sm:gap-0">
        <small className="text-[#777777] text-xs sm:text-sm order-2 sm:order-1">
          Copyright &copy; <span className="text-[#5CAF90] font-bold">Grabit</span> all rights reserved. Powered by Grabit.
        </small>
        <img src="/footer.png" alt="Payment Methods" className="order-1 sm:order-2 h-6 sm:h-auto" />
      </div>
    </>
  );
};

export default Footer;
