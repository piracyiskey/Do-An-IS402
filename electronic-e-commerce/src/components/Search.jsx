import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import { buildApiUrl } from '../lib/url';

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(amount) || 0);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (keyword.trim().length > 1) {
        setLoading(true);
        try {
          const response = await axios.get(buildApiUrl('/products/search'), {
            params: { keyword: keyword, limit: 5 }
          });
          setResults(response.data);
          setShowDropdown(true);
        } catch (error) {
          console.error("Search error", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  return (
    <div className="relative w-full max-w-[400px]" ref={searchRef}>
      <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full border border-transparent focus-within:bg-white focus-within:border-gray-300 transition-all shadow-sm">
        <SearchIcon size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Bạn đang tìm gì?..."
          className="bg-transparent text-sm pl-3 outline-none w-full text-black font-medium"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => keyword.length > 1 && setShowDropdown(true)}
        />
        {loading ? <Loader2 size={16} className="animate-spin text-gray-400" /> : 
         keyword && <X size={18} className="cursor-pointer text-gray-400 hover:text-black" onClick={() => setKeyword("")} />}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 w-full bg-white mt-2 shadow-2xl rounded-2xl border border-gray-100 overflow-hidden z-[100]">
          {results.length > 0 ? (
            <>
              <div className="max-h-[400px] overflow-y-auto">
                {results.map((item) => (
                  <div 
                    key={item.product_id}
                    onClick={() => { navigate(`/product/${item.product_id}`); setShowDropdown(false); }}
                    className="flex items-start gap-4 p-4 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-none"
                  >
                    <img src={`${item.image_url}`} className="w-14 h-14 object-contain" alt="" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-800 leading-tight whitespace-normal break-words">{item.product_name}</p>
                      <p className="text-sm text-blue-600 font-bold">{formatCurrency(item.sale_price || item.base_price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div 
                className="p-3 text-center text-xs font-black text-white bg-black hover:bg-gray-800 cursor-pointer transition-all uppercase"
                onClick={() => {
                    // ĐÃ SỬA: Điều hướng sang resultsearch
                    navigate(`/resultsearch?keyword=${encodeURIComponent(keyword)}`);
                    setShowDropdown(false);
                }}
              >
                Xem tất cả kết quả cho "{keyword}"
              </div>
            </>
          ) : (
            !loading && <div className="p-4 text-center text-sm text-gray-400 italic">Không tìm thấy sản phẩm nào</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;