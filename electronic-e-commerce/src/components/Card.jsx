// src/components/Card.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import BuyNowButton from './BuyNowButton';
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;
const Card = ({ title, imageSrc, productId }) => {
  const navigate = useNavigate();
  

  const fullImageSrc = imageSrc;
    return (
    <div 
      className="group w-[295px] h-[380px] bg-white relative overflow-hidden shadow-md cursor-pointer border border-gray-100 transition-all duration-500 hover:shadow-xl flex-shrink-0 flex flex-col"
      onClick={() => productId && navigate(`/product/${productId}`)}
    >
      {/* 1. TÊN SẢN PHẨM Ở TRÊN ĐẦU */}
      <div className="pt-6 px-4 z-10">
        <h3 className="text-base font-bold text-center text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]"> 
          {title}
        </h3>
      </div>

      {/* 2. KHUNG CHỨA ẢNH Ở GIỮA */}
      <div className="flex-grow flex items-center justify-center p-6 relative">
        <img 
          src={fullImageSrc} 
          alt={title} 
          // Cố định chiều cao ảnh để Card trông đều nhau
          className="max-w-full max-h-[180px] object-contain transition-transform duration-700 group-hover:scale-105" 
        />
      </div>
      
      {/* 3. NÚT MUA NGAY Ở DƯỚI CÙNG (Hiện lên khi hover) */}
      <div className="h-16 flex items-center justify-center pb-4">
        <div 
          className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out"
          onClick={(e) => { 
            e.stopPropagation(); 
            productId && navigate(`/product/${productId}`); 
          }}
        >
          <BuyNowButton text="Buy now" /> 
        </div>
      </div>
    </div>
  );
};

export default Card;