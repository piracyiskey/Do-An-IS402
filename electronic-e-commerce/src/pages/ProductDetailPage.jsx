import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { addToCart } from "../lib/cartService"; // Sử dụng hàm từ service bạn đã cung cấp
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;
const ProductDetailPage = () => {
    const { product_id } = useParams();
    const navigate = useNavigate();

    const [variants, setVariants] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Thêm trạng thái để xử lý khi đang gửi dữ liệu lên server
    const [isAdding, setIsAdding] = useState(false);

    

    useEffect(() => {
        if (!product_id) return;

        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${BASE_URL}/product/${product_id}`);
                if (response.data.success) {
                    const data = response.data.product_variants;
                    const imgs = response.data.images;
                    
                    const parsedVariants = data.map(v => ({
                        ...v,
                        attributes: typeof v.attributes === 'string' ? JSON.parse(v.attributes) : v.attributes,
                        specification: typeof v.specification === 'string' ? JSON.parse(v.specification) : v.specification,
                        dimensions: typeof v.dimensions === 'string' ? JSON.parse(v.dimensions) : v.dimensions
                    }));

                    setVariants(parsedVariants);
                    setImages(imgs);
                    
                    if (parsedVariants.length > 0) {
                        setSelectedVariant(parsedVariants[0]);
                    }
                    
                    const primary = imgs.find(img => img.is_primary) || imgs[0];
                    setMainImage(primary?.image_url || '');
                }
            } catch {
                setError("Không thể tải thông tin sản phẩm.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [product_id]);

    // ============================================
    // LOGIC THỰC THI THÊM VÀO GIỎ HÀNG
    // ============================================
    const handleCartAction = async (shouldRedirectToCart = false) => {
        // Kiểm tra xem người dùng đã chọn cấu hình chưa
        if (!selectedVariant) {
            alert("Vui lòng chọn cấu hình sản phẩm.");
            return;
        }

        // Kiểm tra đăng nhập qua access_token (vì route Laravel của bạn nằm trong middleware 'auth:api')
        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("Vui lòng đăng nhập để thực hiện tính năng này.");
            navigate('/login');
            return;
        }

        try {
            setIsAdding(true);
            
            // Theo CartController.php, API cần: product_id, variant_id, quantity
            const result = await addToCart(
                selectedVariant.product_id, 
                selectedVariant.variant_id, 
                1 // Số lượng mặc định là 1
            );

            // Laravel trả về JSON message nếu thành công
            if (result.message === "Item added to cart") {
                if (shouldRedirectToCart) {
                    navigate('/cart'); // Chuyển sang trang giỏ hàng bạn đã có
                } else {
                    alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
                }
            }
        } catch (err) {
            console.error("Lỗi thêm vào giỏ hàng:", err);
            const errMsg = err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.";
            alert(errMsg);
        } finally {
            setIsAdding(false);
        }
    };

    const renderSafeValue = (value) => {
        if (value === null || value === undefined) return "";
        if (typeof value === 'object') {
            return Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', ');
        }
        return String(value);
    };

    if (loading) return <div className="h-screen flex items-center justify-center font-bold text-2xl">Đang tải...</div>;
    if (error) return <div className="h-screen flex items-center justify-center text-red-500 font-bold">{error}</div>;

    return (
        <div className="bg-white min-h-screen">
            <Navbar isTransparent = {false}/>
            
            <main className="max-w-[1440px] mx-auto px-4 md:px-10 py-24">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* GALLERY ẢNH */}
                    <div className="w-full lg:w-1/2 space-y-4">
                        <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden flex items-center justify-center p-10 border border-gray-100">
                            <img 
                                src={`${mainImage}`} 
                                alt={`${mainImage}`} 
                                className="max-h-full object-contain transition-transform duration-700 hover:scale-110" 
                            />
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                            {images.map((img, idx) => (
                                <button 
                                    key={idx} 
                                    onClick={() => setMainImage(img.image_url)}
                                    className={`w-20 h-20 flex-shrink-0 rounded-xl border-2 p-1 transition-all ${
                                        mainImage === img.image_url ? 'border-black' : 'border-gray-100'
                                    }`}
                                >
                                    <img 
                                        src={`${img.image_url}`} 
                                        className="w-full h-full object-contain" 
                                        alt={`Thumbnail ${idx}`} 
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* THÔNG TIN SẢN PHẨM */}
                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-4xl font-black text-gray-900 mb-2">{selectedVariant?.product_name}</h1>
                            <div className="flex items-center gap-4 text-sm font-bold text-gray-400">
                                <span>RATING: {selectedVariant?.rating_avg} ★</span>
                                <span>|</span>
                                <span>SKU: {selectedVariant?.sku}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-3xl mb-8">
                            <span className="text-4xl font-black text-black">
                                ${Math.floor(Number(selectedVariant?.sale_price || selectedVariant?.base_price)).toLocaleString()}
                            </span>
                        </div>

                        <div className="mb-10">
                            <h4 className="text-xs font-black uppercase text-gray-400 mb-4 tracking-widest">Chọn cấu hình</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {variants.map((v) => (
                                    <button
                                        key={v.variant_id}
                                        onClick={() => setSelectedVariant(v)}
                                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                                            selectedVariant?.variant_id === v.variant_id 
                                            ? 'border-black bg-black text-white shadow-xl' 
                                            : 'border-gray-100 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="font-bold text-sm">
                                            {Object.values(v.attributes).join(' / ')}
                                        </div>
                                        <div className={`text-xs mt-1 ${selectedVariant?.variant_id === v.variant_id ? 'text-gray-300' : 'text-gray-500'}`}>
                                            Tồn kho: {v.stock_quantity}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* NÚT BẤM TÍCH HỢP LOGIC BACKEND */}
                        <div className="mt-auto flex flex-col gap-3">
                            <button 
                                onClick={() => handleCartAction(true)}
                                disabled={isAdding}
                                className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg hover:opacity-90 disabled:bg-gray-400"
                            >
                                {isAdding ? "ĐANG XỬ LÝ..." : "MUA NGAY"}
                            </button>
                            
                            <button 
                                onClick={() => handleCartAction(false)}
                                disabled={isAdding}
                                className="w-full border-2 border-black text-black py-5 rounded-2xl font-black text-lg hover:bg-black hover:text-white transition-all disabled:border-gray-400 disabled:text-gray-400"
                            >
                                {isAdding ? "ĐANG THÊM..." : "THÊM VÀO GIỎ HÀNG"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* THÔNG SỐ KỸ THUẬT */}
                <div className="mt-24 border-t pt-16">
                    <h2 className="text-3xl font-black mb-10 uppercase italic">Specifications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-2">
                        {selectedVariant?.specification && Object.entries(selectedVariant.specification).map(([key, val]) => (
                            <div key={key} className="flex justify-between py-4 border-b border-gray-100 items-start">
                                <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">{key}</span>
                                <span className="text-gray-900 font-medium text-sm text-right max-w-[60%]">
                                    {renderSafeValue(val)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetailPage;