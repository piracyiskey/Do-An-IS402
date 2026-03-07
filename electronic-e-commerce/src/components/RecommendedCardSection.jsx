import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import api from "../lib/api";

// Component RecommendedCard - Đã sửa lỗi ảnh bị chìm
export function RecommendedCard({
  productId,
  imageSrc = "https://via.placeholder.com/300x300",
  description,
}) {

  return (
    <Link to={`/product/${productId}`} className="group flex-shrink-0 w-[295px] flex flex-col cursor-pointer">
      {/* Image Container - Đã sửa bg-gray-50 và border để ảnh nổi bật hơn */}
      <div
        className="w-[295px] h-[350px] flex justify-center items-center bg-gray-50 rounded-lg mb-4 
                   group-hover:bg-white transition-all overflow-hidden shadow-md border border-gray-100 relative"
      >
        <img
          src={imageSrc}
          alt={description}
          className="max-w-[85%] max-h-[85%] object-contain relative z-10 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col">
        <h3
          className="text-base font-bold leading-snug mb-3 line-clamp-2" // Chỉnh lại line-clamp cho gọn
          style={{ fontFamily: "Inter, sans-serif", color: "#000" }}
        >
          {description}
        </h3>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2 flex-wrap">
            
          </div>
          
        </div>
      </div>
    </Link>
  );
}

export default function RecommendedCardSection() {
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products/recommended?limit=12");
        const data = response.data || [];
        

        setProducts(data);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(Math.min(progress, 100));
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < maxScroll - 1);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll, products]);

  const scrollAmount = 400;
  const scrollLeftFn = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  }, []);

  const scrollRightFn = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-black mb-6">Recommended for you</h2>
        <div className="flex justify-center items-center h-[350px]">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-black mb-6">Recommended for you</h2>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <RecommendedCard
              key={product.product_id}
              productId={product.product_id}
              imageSrc={product.image_url}
              description={product.alt_text}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mt-8">
        <div className="w-96 h-1 relative bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.max(scrollProgress, 10)}%`, backgroundColor: "#000" }}
          ></div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={scrollLeftFn}
            disabled={!canScrollLeft}
            className="flex items-center justify-center transition-all bg-white"
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: canScrollLeft ? "1px solid #000" : "1px solid #d1d5db",
              cursor: canScrollLeft ? "pointer" : "not-allowed",
              fontSize: "20px", fontWeight: "bold",
              color: canScrollLeft ? "#000" : "#d1d5db",
            }}
          >
            ‹
          </button>

          <button
            onClick={scrollRightFn}
            disabled={!canScrollRight}
            className="flex items-center justify-center transition-all bg-white"
            style={{
              width: "40px", height: "40px", borderRadius: "50%",
              border: canScrollRight ? "1px solid #000" : "1px solid #d1d5db",
              cursor: canScrollRight ? "pointer" : "not-allowed",
              fontSize: "20px", fontWeight: "bold",
              color: canScrollRight ? "#000" : "#d1d5db",
            }}
          >
            ›
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}