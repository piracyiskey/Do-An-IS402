import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Globe,
  MapPin,
  Shield,
  ChevronRight,
} from "lucide-react";
import api from "../lib/api";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra đăng nhập
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    // Lấy thông tin user
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/user");
        // API trả về { success: true, data: {...user} }
        const userData = response.data.data || response.data;
        setUser(userData);
        // Cập nhật localStorage với data mới nhất
        localStorage.setItem("user", JSON.stringify(userData));
      } catch {
        // Nếu lỗi, thử lấy từ localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const profileData = {
    name: user?.full_name || user?.name || "User",
    email: user?.email || "email@example.com",
    phone: user?.phone || "Chưa thiết lập",
    alternatePhone: user?.alternate_phone || "Chưa thiết lập",
    birthday: user?.date_of_birth || "Chưa thiết lập",
    nickname: user?.nickname || "Chưa thiết lập",
    occupation: user?.occupation || "Chưa thiết lập",
    language: user?.language || "English",
    country: user?.country || "Hoa Kỳ",
    zipCode: user?.zip_code || "12345",
    googleConnected: user?.google_id ? true : false,
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <nav className="p-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <ul className="flex justify-between items-center">
            <li
              className="text-xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Samsung Account
            </li>
            <li className="text-gray-500 hover:text-gray-800 cursor-pointer">
              <div className="w-6 h-6 border rounded-full bg-white flex items-center justify-center text-xs">
                ?
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex justify-center py-10 px-4">
        <div className="w-full max-w-2xl">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            {/* Avatar & Name */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-gray-500" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                {profileData.name}
              </h1>
              <p className="text-sm text-gray-500">{profileData.email}</p>
            </div>

            {/* Email & Google Connection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email ID</p>
                  <p className="text-sm text-gray-800">{profileData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                <img
                  src="https://img.icons8.com/color/24/google-logo.png"
                  alt="Google"
                  className="w-5 h-5"
                />
                <div>
                  <p className="text-xs text-gray-500">Đăng nhập mạng xã hội</p>
                  <p className="text-sm text-gray-800">
                    {profileData.googleConnected ? "Đã kết nối" : "Bật"}
                  </p>
                </div>
              </div>
            </div>

            {/* Manage Samsung Account Button */}
            <div className="flex justify-center">
              <button 
                className="px-6 py-3 rounded-full hover:opacity-90 transition text-sm font-medium"
                style={{ backgroundColor: '#3b82f6', color: 'white' }}
              >
                Quản lý Samsung Tài khoản
              </button>
            </div>
          </div>

          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-lg font-medium text-gray-700 mb-6 text-center">
              Thông tin cá nhân
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
              {/* Name */}
              <div className="flex items-center gap-3 py-4 border-b border-gray-100">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Tên</p>
                  <p className="text-sm text-gray-800">{profileData.name}</p>
                </div>
              </div>

              {/* Birthday */}
              <div className="flex items-center gap-3 py-4 border-b border-gray-100">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Ngày sinh</p>
                  <p className="text-sm text-gray-800">
                    {profileData.birthday}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 py-4 border-b border-gray-100">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Số điện thoại DĐ</p>
                  <p className="text-sm text-gray-800">{profileData.phone}</p>
                </div>
              </div>

              {/* Nickname */}
              <div className="flex items-center gap-3 py-4 border-b border-gray-100">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Biệt danh</p>
                  <p className="text-sm text-gray-800">
                    {profileData.nickname}
                  </p>
                </div>
              </div>

              {/* Alternate Phone */}
              <div className="flex items-center gap-3 py-4 border-b border-gray-100">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Số điện thoại phụ</p>
                  <p className="text-sm text-gray-800">
                    {profileData.alternatePhone}
                  </p>
                </div>
              </div>

              {/* Occupation */}
              <div className="flex items-center gap-3 py-4 border-b border-gray-100">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Công việc</p>
                  <p className="text-sm text-gray-800">
                    {profileData.occupation}
                  </p>
                </div>
              </div>

              {/* Language */}
              <div className="flex items-center gap-3 py-4 border-b border-gray-100">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Ngôn ngữ</p>
                  <p className="text-sm text-gray-800">
                    {profileData.language}
                  </p>
                </div>
              </div>

              {/* Country */}
              <div className="flex items-center gap-3 py-4 border-b border-gray-100">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Quốc gia/khu vực cư trú</p>
                  <p className="text-sm text-gray-800">{profileData.country}</p>
                </div>
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              </div>

              {/* Zip Code */}
              <div className="flex items-center gap-3 py-4 border-b border-gray-100">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Mã bưu điện</p>
                  <p className="text-sm text-gray-800">{profileData.zipCode}</p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-center mt-8">
              <button 
                className="px-6 py-3 rounded-full hover:opacity-90 transition text-sm font-medium"
                style={{ backgroundColor: '#3b82f6', color: 'white' }}
              >
                Chỉnh sửa thông tin cá nhân
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <div className="flex flex-wrap gap-4 mb-2 md:mb-0">
              <span>Hiển thị Tiếng Việt</span>
              <a href="#" className="hover:underline">
                Điều khoản và Điều kiện
              </a>
              <a href="#" className="hover:underline">
                Thông báo Về quyền riêng tư của Samsung account
              </a>
              <a href="#" className="hover:underline">
                Thông báo
              </a>
              <a href="#" className="hover:underline">
                Liên hệ với chúng tôi
              </a>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm text-gray-700">
                Samsung Account
              </p>
              <p>Copyright © 1995-2025 Samsung. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
