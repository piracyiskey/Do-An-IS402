import React from 'react';
import { User, ShoppingCart, LogOut } from 'lucide-react';

// DỮ LIỆU CỦA MENU POP-UP
const accountMenuItems = [
  { name: "My Orders", icon: ShoppingCart },
  { name: "My Page & Products" },
  { name: "My Rewards" },
  { name: "Product Registration" },
  { name: "Samsung Account" },
];

// ============================================
// COMPONENT: UserAccountPopup
// ============================================

/**
 * Component hiển thị menu pop-up khi click vào biểu tượng User (Profile).
 * @param {object} props - Các props của component.
 * @param {boolean} props.isVisible - Trạng thái hiển thị (true/false).
 * @param {function} props.onClose - Hàm xử lý khi đóng popup (ví dụ: click ra ngoài).
 */
function UserAccountPopup({ isVisible }) {
  if (!isVisible) return null;

  return (
    // Backdrop (có thể dùng để đóng popup khi click ra ngoài)
    // Tôi sẽ chỉ tập trung vào giao diện pop-up để dễ tích hợp
    
    <div 
      className="absolute top-12 right-0 w-64 bg-white shadow-2xl rounded-xl p-4 transform origin-top-right transition-all duration-300 ease-out"
      style={{
        // Thiết lập vị trí và độ sâu
        zIndex: 50, 
        // Hiệu ứng Fade-in và Scale-up nhỏ
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
      }}
    >
      
      {/* 1. Phần Header/Profile */}
      <div className="flex items-center space-x-3 border-b pb-4 mb-4">
        <div className="p-2 bg-gray-100 rounded-full">
          {/* Thay thế icon User bằng ảnh profile nếu cần */}
          <User className="w-5 h-5 text-gray-700" />
        </div>
        <p className="font-semibold text-lg text-gray-900">
          Phan Phuc
        </p>
      </div>

      {/* 2. Danh sách Menu */}
      <ul className="space-y-3 text-gray-700">
        {accountMenuItems.map((item, index) => (
          <li key={index}>
            <a 
              href="#" 
              className="text-sm block py-1 hover:text-blue-600 transition"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>

      {/* 3. Log Out */}
      <div className="border-t pt-4 mt-4">
        <a 
          href="#" 
          className="flex items-center text-sm font-semibold text-gray-700 hover:text-red-500 transition"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </a>
      </div>
    </div>
  );
}

export default UserAccountPopup;