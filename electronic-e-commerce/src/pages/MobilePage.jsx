import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MobilePage = () => {
    const { child_slug } = useParams();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    // 1. Định nghĩa BASE_URL để dùng cho cả API và Ảnh
    const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;
    
    const [filters, setFilters] = useState({
        keyword: '',
        ram: [],
        storage: [],
        color: [],
        sort: 'desc',
        last_id: 0,
        limit: 12
    });

    const fetchProducts = useCallback(async (isRefresh = true) => {
        if (!child_slug) return;
        setLoading(true);
        setErrorMsg(null);
        
        try {
            const currentLastId = isRefresh ? 0 : filters.last_id;
            
            const params = {
                ...filters,
                ram: filters.ram.join(','),
                storage: filters.storage.join(','),
                color: filters.color.join(','),
                last_id: currentLastId
            };

            // 2. Sử dụng BASE_URL trong lời gọi API
            const response = await axios.get(`${BASE_URL}/mobile/${child_slug}`, { params });
            
            if (Array.isArray(response.data)) {
                const data = response.data;
                if (isRefresh) setProducts(data);
                else setProducts(prev => [...prev, ...data]);

                if (data.length < filters.limit) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                    setFilters(prev => ({ ...prev, last_id: data[data.length - 1].product_id }));
                }
            }
        } catch (error) {
            setErrorMsg("Không thể kết nối đến máy chủ.");
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    }, [child_slug, filters]);

    useEffect(() => {
        if (!child_slug) {
            navigate('/mobile/galaxy-smartphone');
        } else {
            fetchProducts(true);
        }
    }, [child_slug, navigate]);

    const toggleArrayFilter = (key, value) => {
        const current = [...filters[key]];
        const index = current.indexOf(value);
        index > -1 ? current.splice(index, 1) : current.push(value);
        setFilters(prev => ({ ...prev, [key]: current }));
    };

    return (
        <div className="bg-white min-h-screen w-full flex flex-col">
            <Navbar isTransparent={false} />

            <div className="flex-grow w-full px-4 md:px-10 py-8 flex flex-col md:flex-row gap-8 mt-14">
                
                <aside className="w-full md:w-72 flex-shrink-0 space-y-8 bg-gray-50 p-6 rounded-2xl h-fit relative top-26">
                    <h3 className="font-bold text-xl justify-center border-b pb-3 text-black flex items-center gap-2">
                        <span></span> Bộ lọc Mobile
                    </h3>
                    
                    <div>
                        <h4 className="text-black font-bold mb-3 text-xs uppercase tracking-widest">Thứ tự hiển thị</h4>
                        <select 
                            value={filters.sort}
                            onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                            className="w-full border-none rounded-xl p-3 text-sm outline-none bg-white shadow-sm font-medium"
                        >
                            <option value="desc">Giá: Cao đến Thấp</option>
                            <option value="asc">Giá: Thấp đến Cao</option>
                        </select>
                    </div>

                    <div>
                        <h4 className="text-black font-bold mb-3 text-xs uppercase tracking-widest">Dung lượng RAM</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {['6GB', '8GB', '12GB', '16GB'].map(item => (
                                <button 
                                    key={item}
                                    onClick={() => toggleArrayFilter('ram', item)}
                                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                                        filters.ram.includes(item) 
                                        ? 'bg-black border-black text-white shadow-md' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-black'
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-black font-bold mb-3 text-xs uppercase tracking-widest">Bộ nhớ trong</h4>
                        <div className="space-y-2">
                            {['128GB', '256GB', '512GB', '1TB'].map(item => (
                                <label key={item} className="flex items-center gap-3 cursor-pointer group p-1">
                                    <input type="checkbox" className="w-5 h-5 rounded-md accent-black" 
                                        checked={filters.storage.includes(item)} 
                                        onChange={() => toggleArrayFilter('storage', item)} 
                                    />
                                    <span className="text-sm font-medium text-gray-600 group-hover:text-black transition-colors">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-black font-bold mb-3 text-xs uppercase tracking-widest">Màu sắc</h4>
                        <div className="flex flex-wrap gap-3">
                            {['Titanium Gray', 'Phantom Black', 'Cream', 'Lavender'].map(color => (
                                <button
                                    key={color}
                                    onClick={() => toggleArrayFilter('color', color)}
                                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                                        filters.color.includes(color) ? 'border-blue-500 scale-110 shadow-lg' : 'border-gray-200'
                                    }`}
                                    title={color}
                                    style={{ backgroundColor: color.split(' ').pop().toLowerCase() }}
                                />
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={() => fetchProducts(true)} 
                        className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
                    >
                        Áp dụng bộ lọc
                    </button>
                </aside>

                <main className="flex-1">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
                            {child_slug?.replace(/-/g, ' ')}
                        </h1>
                        <p className="text-gray-400 font-medium mt-1">Khám phá thế giới Galaxy mới nhất</p>
                    </div>

                    {errorMsg && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 font-bold text-center border border-red-100">{errorMsg}</div>}

                    {Array.isArray(products) && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div 
                                    key={product.product_id} 
                                    onClick={() => navigate(`/product/${product.product_id}`)}
                                    className="cursor-pointer bg-white rounded-[32px] p-6 border border-gray-50 hover:shadow-2xl transition-all duration-500 group"
                                >
                                    <div className="aspect-square w-full mb-6 relative rounded-2xl bg-gray-50 p-6 overflow-hidden">
                                        <img 
                                            // 3. FIX: Nối BASE_URL vào ảnh
                                            src={`${product.image_url}`} 
                                            alt={product.product_name} 
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                                        />
                                    </div>
                                    
                                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {product.product_name}
                                    </h3>

                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-2xl font-black text-black">
                                            ${Math.floor(Number(product.price)).toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="bg-black text-white py-3 rounded-2xl font-bold text-sm hover:opacity-80 transition-opacity">
                                            Mua ngay
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/product/${product.product_id}`);
                                            }}
                                            className="bg-white border-2 border-black text-black py-3 rounded-2xl font-bold text-sm hover:bg-black hover:text-white transition-all"
                                        >
                                            Chi tiết
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !loading && (
                            <div className="text-center py-32 bg-gray-50 rounded-3xl">
                                <p className="text-gray-400 text-lg font-medium">Rất tiếc, chưa tìm thấy điện thoại phù hợp.</p>
                            </div>
                        )
                    )}
                    
                    {loading && (
                        <div className="text-center py-20 flex flex-col items-center">
                            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="font-bold text-gray-600 tracking-widest">GALAXY LOADING...</p>
                        </div>
                    )}

                    {hasMore && products.length > 0 && !loading && (
                        <div className="mt-16 text-center pb-12">
                            <button 
                                onClick={() => fetchProducts(false)} 
                                className="bg-white border-2 border-black text-black px-16 py-4 rounded-full font-black hover:bg-black hover:text-white transition-all transform active:scale-90 shadow-xl"
                            >
                                KHÁM PHÁ THÊM
                            </button>
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default MobilePage;