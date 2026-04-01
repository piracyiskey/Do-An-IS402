import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, SearchX, ChevronDown, ChevronUp, Filter, ShoppingCart, CreditCard } from 'lucide-react';
import { buildApiUrl, buildImageUrl } from '../lib/url';

// IMPORT NAVBAR VÀ FOOTER CỦA BẠN TẠI ĐÂY
import Navbar from "./Navbar"; 
import Footer from "./Footer"; // Giả định bạn đã có file Footer.jsx

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobileOpen, setIsMobileOpen] = useState(true);
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseFloat(amount) || 0);
  };

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(buildApiUrl('/products/search'), {
          params: { keyword: keyword, category: selectedCategory !== "All" ? selectedCategory : null }
        });
        setProducts(response.data);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    if (keyword) fetchResults();
  }, [keyword, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. NAVBAR */}
      <Navbar isTransparent={false} /> 

      {/* 2. MAIN CONTENT AREA */}
      {/* Thêm pt-24 để không bị Navbar fixed che khuất nội dung */}
      <main className="flex-grow w-full bg-white pt-24 pb-20 px-4 md:px-8 lg:px-12">
        <div className="w-full flex flex-col md:flex-row gap-8">
          
          {/* --- SIDEBAR FILTER --- */}
          <aside className="w-full md:w-64 flex-shrink-0 border-r border-gray-100 pr-6">
            <div className="sticky top-28"> {/* Chỉnh top để khớp với chiều cao Navbar */}
              <div className="flex items-center gap-2 mb-6 border-b pb-4 border-gray-100">
                <Filter size={18} className="text-black" />
                <h2 className="text-lg font-bold uppercase tracking-tighter">Bộ lọc</h2>
              </div>

              <div className="space-y-2">
                {/* ... (Phần logic Category giữ nguyên như cũ) ... */}
                <div className="border-b border-gray-50 pb-2">
                  <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="flex items-center justify-between w-full py-2 text-left font-bold text-black">
                    <span className="text-[15px]">Danh mục chính</span>
                    {isMobileOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {isMobileOpen && (
                    <div className="pl-3 mt-1 space-y-2 pb-2">
                      {['Galaxy Smartphone', 'Galaxy Tab', 'TV & AV', 'Laptop'].map(sub => (
                        <label key={sub} className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="cat" className="w-4 h-4 accent-black" onChange={() => setSelectedCategory(sub)} checked={selectedCategory === sub} />
                          <span className="text-sm text-gray-700 font-medium group-hover:text-black">{sub}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setSelectedCategory("All")}
                  className="w-full mt-6 py-2.5 text-[11px] font-black border border-black rounded-full hover:bg-black hover:text-white transition-all uppercase tracking-widest"
                >
                  Xóa bộ lọc
                </button>
              </div>
            </div>
          </aside>

          {/* --- PRODUCT GRID --- */}
          <section className="flex-1">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-black mb-2 uppercase tracking-tighter italic">
                "{keyword}"
              </h1>
              <p className="text-gray-400 text-sm font-medium">Tìm thấy {products.length} sản phẩm phù hợp</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="animate-spin text-black" size={40} /></div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.product_id} className="group flex flex-col bg-white border border-gray-100 rounded-[24px] p-4 hover:shadow-2xl transition-all duration-500 cursor-pointer" onClick={() => navigate(`/product/${product.product_id}`)}>
                    <div className="aspect-square mb-4 bg-[#f7f7f7] rounded-[18px] p-6 flex items-center justify-center overflow-hidden">
                      <img src={buildImageUrl(product.image_url)} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" alt={product.product_name} onError={(e) => {e.target.src = 'https://via.placeholder.com/300?text=Samsung';}} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-[14px] leading-tight mb-2 line-clamp-2 uppercase italic">{product.product_name}</h3>
                      <div className="flex flex-col mb-4">
                        <span className="text-black font-black text-lg">{formatCurrency(product.sale_price || product.base_price)}</span>
                        {product.sale_price && <span className="text-gray-400 text-xs line-through">{formatCurrency(product.base_price)}</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-black text-white py-2.5 rounded-full text-[11px] font-bold hover:bg-gray-800 transition-all uppercase tracking-widest">Mua ngay</button>
                      <button className="w-10 h-10 border border-gray-200 text-black rounded-full hover:bg-black hover:text-white transition-all flex items-center justify-center flex-shrink-0"><ShoppingCart size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                <SearchX className="mx-auto mb-4 text-gray-200" size={80} />
                <p className="font-black text-gray-400 text-xl uppercase italic">Không tìm thấy sản phẩm nào</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* 3. FOOTER */}
      <Footer />
    </div>
  );
};

export default SearchResults;