"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoSearchSharp, IoCloseOutline } from "react-icons/io5";
import { DataProducts } from "./Content";
import Link from "next/link";

const SearchComponent = ({ 
  placeholder = "البحث عن المنتجات...", 
  className = "",
  value: externalValue,
  onChange: externalOnChange
}) => {
  const [searchTerm, setSearchTerm] = useState(externalValue || "");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // إذا كان هناك value خارجي، استخدمه
  useEffect(() => {
    if (externalValue !== undefined) {
      setSearchTerm(externalValue);
    }
  }, [externalValue]);

  // البحث في المنتجات
  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      setIsLoading(true);
      
      // محاكاة تأخير البحث للحصول على تجربة أكثر واقعية
      const searchTimeout = setTimeout(() => {
        const filteredProducts = DataProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.dish?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.prise.includes(searchTerm) ||
          product.prise2?.includes(searchTerm)
        );
        
        setSearchResults(filteredProducts);
        setIsSearchOpen(true);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(searchTimeout);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
      setIsLoading(false);
    }
  }, [searchTerm]);

  // إغلاق نتائج البحث عند النقر خارج المكون
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProductClick = (productId) => {
    setSearchTerm("");
    setIsSearchOpen(false);
    router.push(`/product/${productId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setIsSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearchOpen(false);
    if (externalOnChange) {
      externalOnChange("");
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            const newValue = e.target.value;
            setSearchTerm(newValue);
            if (externalOnChange) {
              externalOnChange(newValue);
            }
          }}
          placeholder={placeholder}
          className="w-full py-2 px-4 pl-12 pr-10 rounded-lg border border-gray-200 outline-0 focus:border-[#5CAF90] focus:ring-2 focus:ring-[#5CAF90]/20 transition-all text-sm"
          onFocus={() => {
            if (searchResults.length > 0) {
              setIsSearchOpen(true);
            }
          }}
        />
        
        <IoSearchSharp 
          className="absolute top-2.5 right-4 text-lg text-[#4B5966] cursor-pointer hover:text-[#5CAF90] transition-colors" 
          onClick={handleSearchSubmit}
        />
        
        {searchTerm && (
          <IoCloseOutline 
            className="absolute top-2.5 left-4 text-lg text-gray-400 cursor-pointer hover:text-red-500 transition-colors" 
            onClick={clearSearch}
          />
        )}
        
        {isLoading && (
          <div className="absolute top-2.5 left-8 w-4 h-4 border-2 border-[#5CAF90] border-t-transparent rounded-full animate-spin"></div>
        )}
      </form>

      {/* نتائج البحث */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-96 overflow-y-auto z-50">
          {searchResults.length > 0 ? (
            <>
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm text-gray-600">
                  تم العثور على {searchResults.length} منتج{searchResults.length > 1 ? "ات" : ""}
                </p>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-b-0"
                  >
                    <img 
                      src={product.img} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate text-sm">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.dish || "منتج عام"}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-[#5CAF90]">
                          {product.prise2 || product.prise}
                        </span>
                        {product.prise2 && (
                          <span className="text-xs text-gray-400 line-through">
                            {product.prise}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-400">
                      <span className="text-xs">→</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {searchResults.length > 5 && (
                <div className="p-3 border-t border-gray-100">
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full py-2 px-4 bg-[#5CAF90] text-white rounded-lg text-sm font-medium hover:bg-[#4a9b7f] transition-colors"
                  >
                    عرض جميع النتائج ({searchResults.length})
                  </button>
                </div>
              )}
            </>
          ) : searchTerm.trim().length > 0 && !isLoading ? (
            <div className="p-6 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-600 mb-2">لم يتم العثور على نتائج</p>
              <p className="text-sm text-gray-400">
                جرب البحث بكلمات مختلفة أو تحقق من الإملاء
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;