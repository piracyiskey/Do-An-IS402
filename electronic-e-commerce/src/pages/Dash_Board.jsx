import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Shield,
  Lock,
  MapPin,
  Cloud,
  Smartphone,
  Grid3X3,
  AlertTriangle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/api";

function DashBoard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lấy thông tin user từ API
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/user");
        const userData = response.data.data || response.data;
        setUser(userData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const tabs = [
    { id: "account", label: "Account" },
    { id: "security", label: "Security" },
    { id: "privacy", label: "Privacy" },
    { id: "location", label: "Location" },
    { id: "services", label: "Services" },
    { id: "devices", label: "Devices" },
  ];

  const services = [
    { icon: "🎵", name: "Samsung Music", color: "bg-pink-500" },
    { icon: "📱", name: "SmartThings", color: "bg-green-500" },
    { icon: "💜", name: "Samsung Health", color: "bg-purple-500" },
    { icon: "🔵", name: "Samsung Pay", color: "bg-blue-500" },
    { icon: "⚙️", name: "Settings", color: "bg-gray-500" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-screen flex flex-col">
      {/* Navbar */}
      <Navbar isTransparent={false} />

      {/* Sub Header - Tabs */}
      <div className="bg-white border-b border-gray-200 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm px-3 py-2 transition-colors ${
                activeTab === tab.id 
                  ? "text-blue-600 font-medium" 
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Profile */}
          <div className="lg:col-span-1">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{user?.full_name || user?.name || "User"}</h2>
              <p className="text-sm text-gray-500 mt-1">{user?.email || "email@example.com"}</p>
            </div>

            {/* Services Card */}
            <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Grid3X3 className="w-4 h-4 text-pink-500" />
                </div>
                <span className="font-semibold text-gray-900">Services</span>
              </div>
              
              <p className="text-xs text-gray-500 mb-4">Apps using Samsung ID</p>
              
              <div className="flex gap-2 mb-4">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className={`w-10 h-10 ${service.color} rounded-xl flex items-center justify-center text-white text-lg`}
                  >
                    {service.icon}
                  </div>
                ))}
                <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                  •••
                </button>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-4">
                <p className="text-xs text-gray-500 mb-1">Linked accounts</p>
                <p className="text-sm text-gray-700">You haven't linked any services yet</p>
              </div>
            </div>
          </div>


          {/* Middle Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recovery Email Warning */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">No recovery email set</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Add an email so you can recover your account if you forget your password or get locked out.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Lock className="w-4 h-4 text-green-500" />
                </div>
                <span className="font-semibold text-gray-900">Security</span>
              </div>
              <p className="text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  Logged in on Chrome
                </span>
              </p>
            </div>

            {/* Devices Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-teal-500" />
                </div>
                <span className="font-semibold text-gray-900">Devices</span>
              </div>
              
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500">Registered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">0</p>
                  <p className="text-xs text-gray-500">Logged in</p>
                </div>
              </div>
              
              <p className="text-xs text-gray-400 text-center mt-4">No active devices</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Privacy Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-500" />
                </div>
                <span className="font-semibold text-gray-900">Privacy</span>
              </div>
              <p className="text-xs text-gray-500">
                Review Samsung's privacy policy and manage your personal data.
              </p>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-red-500" />
                </div>
                <span className="font-semibold text-gray-900">Location</span>
              </div>
              <p className="text-xs text-gray-500">
                Register a location to find your devices.
              </p>
            </div>

            {/* Samsung Cloud Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Cloud className="w-4 h-4 text-indigo-500" />
                </div>
                <span className="font-semibold text-gray-900">Samsung Cloud</span>
              </div>
              <p className="text-xs text-gray-500">
                Open files, sync data, and keep your data safe and secure on the cloud.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Side Icons */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700">
          📱
        </button>
        <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700">
          💬
        </button>
        <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700">
          📧
        </button>
        <button className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-gray-700">
          ⬇️
        </button>
      </div>
    </div>
  );
}

export default DashBoard;
