// src/components/HeroSection.js
import React from "react";

export default function Home_Phone({ 
  bgImage, 
  title = "Galaxy Z Fold7", 
  subTitle = "Galaxy AI ✨" 
}) {
  return (
    <div className="relative h-[90vh] max-w-7xl mx-auto overflow-hidden flex items-center justify-center mt-20 px-4 md:px-8">
      
      {/* KHUNG NỀN */}
      <div className="absolute inset-0 z-0 rounded-1xl overflow-hidden bg-black"> {/* Thêm bg-black để nếu ảnh chưa kịp load thì nền không bị trắng xóa */}
        <img
          src={bgImage} 
          alt={title}
          className="w-full h-full object-cover"
          // Thêm dòng onError này để bạn biết ngay nếu link bị chết
          onError={(e) => {
            console.error("Link ảnh bị lỗi hoặc không truy cập được:", bgImage);
            e.target.style.display = 'none'; // Ẩn ảnh nếu lỗi để không hiện icon 'broken image'
          }}
        />
        {/* SỬA CHỖ NÀY: Đổi bg-gray-100 thành bg-black và tăng opacity một chút 
            để chữ trắng nổi bật hơn trên nền ảnh (nền xám cũ dễ làm ảnh bị đục/mờ) */}
        <div className="absolute inset-0 bg-opacity-30" />
      </div>

      {/* NỘI DUNG CHỮ */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center px-4 pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
          {title} 
        </h1>
        <p className="mt-2 text-xl md:text-2xl font-light mb-8 drop-shadow-md">
          {subTitle}
        </p>
      </div>
    </div>
  );
}