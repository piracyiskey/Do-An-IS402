import { useState, useEffect, useRef } from "react";
import { Search as SearchIcon, ShoppingCart, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Search from "./Search.jsx";

// ============================================
// DỮ LIỆU CHUNG
// ============================================

const menuData = {
  Shop: {
    discover: [
      "Buy Direct Get More", "Samsung Week", "SmartThings", "Samsung Rewards",
      "Student & Workplace Offers", "Samsung Care+", "Samsung Experience Stores", "Curated Collections",
    ],
  },
  Mobile: {
    discover: [
      "5G Smartphones", "Galaxy AI Features", "Trade-In Program", "Mobile Accessories", "Samsung Care+",  
    ],
  },
  TVAV: {
    discover: [
      "Smart TV Features", "Gaming Hub", "Art Store", "SmartThings Integration", "TV Buying Guide",
    ],
  },
  "Computing-Displays": { 
    discover: [
      "Galaxy Ecosystem", "For Creators", "For Gamers", "Business Solutions", "Student Discounts",
    ],
  },
  Support: {
    links: {
      support: ["Support Home", "Manuals & Software", "Register A Product", "Samsung Care"],
      contact: ["Chat with us", "Order Help", "Product Help"],
      repair: ["Warranty Information", "Find a Service Center", "Request A Repair", "Cracked Screen Repair", "Check Repair Status"],
      additional: ["Community", "Samsung Care+", "Samsung Care+ Mobile", "Self Repair Program"],
    },
    tiles: [
      { icon: "📦", title: "Order Help" },
      { icon: "🎧", title: "Product Help" },
      { icon: "🛠️", title: "Request A Repair" },
      { icon: "📱", title: "Register A Product" },
    ],
  },
};

const ACCOUNT_MENU = [
  "My Orders", "My Page & Products", "My Rewards", "Product Registration", "Samsung Account",
];

// ============================================
// COMPONENT: MegaMenuDropdown
// ============================================
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL;
function MegaMenuDropdown({ menuKey, isVisible }) {
  const [apiProducts, setApiProducts] = useState([]);
  

  // Khai báo lại các biến logic để render mà không thêm biến vào prop
  const dataKey = menuKey === "TV-AV" ? "TVAV" : menuKey;
  const data = menuData[dataKey];
  const isSupportMenu = menuKey === "Support";

  const renderLinkGroup = (title, links) => (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase">{title}</h3>
      <ul className="space-y-1">
        {links.map((item, index) => (
          <li key={index}>
            <Link to={`/${item.toLowerCase().replace(/\s+|&/g, '-')}`} className="hover:text-blue-600 transition block">
              <p className="text-sm font-normal text-gray-700 hover:scale-[1.05] transition-transform duration-300 ease-out">{item}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  useEffect(() => {
    if (!isVisible || isSupportMenu || !data) return;

    const fetchDropdownData = async () => {
      let endpoint = "";
      if (menuKey === "Shop") endpoint = "/products/search";
      else if (menuKey === "Mobile") endpoint = "/mobile/galaxy-smartphone";
      else if (menuKey === "TV-AV") endpoint = "/tv-av/premium-flagship-tvs";
      else if (menuKey === "Computing-Displays") endpoint = "/computing-displays/galaxy-book-laptop";

      if (endpoint) {
        try {
          const res = await fetch(`${BASE_URL}${endpoint}?limit=6`);
          const result = await res.json();
          // Logic gán dữ liệu mảng hoặc object chứa products
          setApiProducts(Array.isArray(result) ? result : (result.products || []));
        } catch (err) { console.error(err); }
      }
    };
    fetchDropdownData();
  }, [menuKey, isVisible, isSupportMenu, data]);

  if (!data || !isVisible) return null;

  return (
    <div className="relative left-0 w-full bg-white shadow-xl border-t border-gray-200 z-40">
      <div className="max-w-screen-2xl mx-auto px-8 py-8 flex">
        {isSupportMenu ? (
          <div className="flex w-full justify-between">
            <div className="flex flex-1 space-x-16">
              <div className="w-1/3">
                {renderLinkGroup("SUPPORT", data.links.support)}
                {renderLinkGroup("CONTACT", data.links.contact)}
              </div>
              <div className="w-1/3">
                {renderLinkGroup("REPAIR SERVICES", data.links.repair)}
                {renderLinkGroup("ADDITIONAL SUPPORT", data.links.additional)}
              </div>
            </div>
            <div className="w-[450px] pl-10 border-l border-gray-200 grid grid-cols-3 gap-4">
              {data.tiles.map((tile, index) => (
                <Link to={`/${tile.title.toLowerCase().replace(/\s+|&/g, '-')}`} key={index} 
                      className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg text-center cursor-pointer hover:bg-gray-100 transition duration-150">
                  <span className="text-3xl mb-2">{tile.icon}</span> 
                  <p className="text-sm font-semibold text-gray-800">{tile.title}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex-2 pr-10">
              <div className="grid grid-cols-6 gap-x-4 gap-y-6">
                {/* HIỂN THỊ 6 SẢN PHẨM TỪ API */}
                {apiProducts.slice(0, 6).map((item, index) => (
                  <Link to={`/product/${item.product_id}`} key={index} 
                        className="flex flex-col items-center justify-center text-center cursor-pointer hover:opacity-75 transition-opacity">
                    <img 
                      src={`${item.image_url}`} 
                      alt={item.product_name} 
                      className="w-16 h-16 object-contain mb-2" 
                    />
                    <p className="text-[10px] font-semibold text-gray-800 line-clamp-2">{item.product_name}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-64 flex-1 border-l border-gray-200 pl-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">DISCOVER</h3>
              <ul className="space-y-3">
                {data.discover.map((item, index) => (
                  <li key={index}>
                    <Link to={`/discover/${item.toLowerCase().replace(/\s+|&/g, '-')}`} className="text-sm font-normal text-gray-700 hover:text-blue-600 transition block">
                      <p className="text-sm font-normal text-gray-700 hover:scale-[1.05] transition-transform duration-300 ease-out">{item}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// CÁC COMPONENT USER POPUP (GIỮ NGUYÊN GIAO DIỆN GỐC)
// ============================================

function UserAccountPopupBefore({ isVisible, onMouseEnter, onMouseLeave }) {
  if (!isVisible) return null;
  const menuItems = [
    { name: "Sign in/Create Account", path: "/login" },
    { name: "Track your orders", path: "/track-orders" },
    { name: "Business account", path: "/business-account" },
  ];
  return (
    <div className="absolute top-12 right-0 w-64 bg-white shadow-2xl rounded-xl p-4 transform origin-top-right transition-all duration-300 ease-out z-50" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <ul className="space-y-3 text-gray-700">
        {menuItems.map((item, index) => (
          <li key={index} className="pb-1">
            <Link to={item.path} className={`block py-1 transition ${index === 0 ? 'font-semibold text-base text-gray-900 hover:text-black' : 'text-sm font-normal text-gray-800 hover:text-gray-900'}`}>
              <p className={`text-black text-sm ml-4 transition-transform duration-300 ease-out hover:scale-[1.05] ${index === 0 ? "font-bold" : ""}`}>{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserAccountPopup({ isVisible, userName, menuItems, handleLogout, onMouseEnter, onMouseLeave }) {
  if (!isVisible) return null;
  return (
    <div className="absolute top-12 right-0 w-[280px] bg-white shadow-2xl rounded-2xl p-6 transform origin-top-right transition-all duration-300 ease-out z-50 font-sans" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-100 rounded-full"><User className="w-6 h-6 text-black" /></div>
        <span className="font-bold text-lg text-black break-all">
        {userName}
      </span>
      </div>
      <div className="flex justify-between items-center py-3 border-b border-gray-200 mb-3 cursor-pointer group">
         <div className="text-sm font-medium text-gray-800 group-hover:text-blue-600 leading-tight pr-2">Exclusive benefits with Samsung Account</div>
         <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-blue-600 flex-shrink-0"/>
      </div>
      <ul className="space-y-3">
        {menuItems.map((item, index) => {
          let path = item === "Admin Dashboard" ? "/admin" : (item === "Samsung Account" ? "/profile" : (item === "My Page & Products" ? "/dashboard" : (item === "My Rewards" ? "/my-rewards" : `/${item.toLowerCase().replace(/\s+/g, '-')}`)));
          return (
            <li key={index}>
              <Link to={path}><p className="text-black hover:underline font-normal block py-1 transition-colors">{item}</p></Link>
            </li>
          );
        })}
        <li><p className="text-black font-normal hover:text-black hover:underline block py-1 w-full text-left transition-colors cursor-pointer" onClick={handleLogout}>Log out</p></li>
      </ul>
    </div>
  );
}

// ============================================
// NAVBAR (MAIN)
// ============================================

export default function Navbar({ isTransparent = true }) {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMouseEnter, setMouseEnter] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [userName, setUserName] = useState("");
  const [isUserPopupVisible, setUserPopupVisible] = useState(false);
  const popupTimeoutRef = useRef(null);

  const loadUserFromStorage = () => {
    const storedUser = localStorage.getItem("user");
    const accessToken = localStorage.getItem("access_token");
    if (storedUser && accessToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser.full_name || parsedUser.name || parsedUser.email || "");
        setIsAdminUser(parsedUser?.roles?.some(role => role.role_id === 'admin'));
      } catch { setUserName(""); }
    } else { setUserName(""); }
  };

  useEffect(() => {
    loadUserFromStorage();
    const handleStorageChange = (e) => { if (e.key === "user" || e.key === "access_token") loadUserFromStorage(); };
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("loginSuccess", loadUserFromStorage);
    return () => { window.removeEventListener("storage", handleStorageChange); window.removeEventListener("loginSuccess", loadUserFromStorage); };
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldBeWhite = !isTransparent || isScrolled || isMouseEnter || isUserPopupVisible;

  const handleUserBlockMouseEnter = () => { if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current); setUserPopupVisible(true); setMouseEnter(true); setActiveMenu(null); };
  const handleUserBlockMouseLeave = () => { popupTimeoutRef.current = setTimeout(() => { setUserPopupVisible(false); if (activeMenu === null) setMouseEnter(false); }, 300); };
  const handlePopupMouseEnter = () => { if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current); };
  const handleLogout = () => { localStorage.removeItem("access_token"); localStorage.removeItem("refresh_token"); localStorage.removeItem("user"); setUserName(""); setUserPopupVisible(false); setMouseEnter(false); setIsAdminUser(false); };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${shouldBeWhite ? "bg-white shadow-md" : "bg-transparent"}`} onMouseLeave={() => { setActiveMenu(null); setMouseEnter(false); }}>
      <nav className={`w-full ${shouldBeWhite ? "text-black" : "text-white"}`}> 
        <div className="flex items-center justify-between px-8 py-3 max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-8">
            <Link to="/" style={{ color: shouldBeWhite ? "black" : "white", textDecoration: "none", transition: "color 0.3s ease", fontSize: "22px", fontWeight: "700" }}>SAMSUNG</Link>
            <ul className="hidden md:flex space-x-6 font-medium text-sm">
              {/* LOẠI BỎ APPLIANCES KHỎI DANH SÁCH HIỂN THỊ */}
              {["Shop", "Mobile", "TV-AV", "Computing-Displays"].map((item) => (
                <li key={item} onMouseEnter={() => { setActiveMenu(item); setMouseEnter(true); }}>
                  <Link to={item === "Shop" ? "/shop" : (item === "Mobile" ? "/mobile/galaxy-smartphone" : `/${item.toLowerCase()}`)} style={{ color: shouldBeWhite ? "black" : "white", textDecoration: "none", transition: "color 0.3s ease" }}>{item.replace("-", " & ")}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center space-x-6">
            <ul className="hidden lg:flex space-x-4 text-sm font-medium">
              <li onMouseEnter={() => { setActiveMenu("Support"); setMouseEnter(true); }}>Support</li>
              <li className="flex items-center italic">For Business <ChevronRight size={14}/></li>
            </ul>
            <div className="w-64"><Search /></div>
            <div className="flex items-center gap-4">
              <Link to="/cart" style={{ color: shouldBeWhite ? "black" : "white", textDecoration: "none", transition: "color 0.3s ease" }}><ShoppingCart size={20}/></Link>
              <div className="relative py-2" onMouseEnter={handleUserBlockMouseEnter} onMouseLeave={handleUserBlockMouseLeave}>
                <User size={20} className="cursor-pointer"/>
                {userName ? (
                  <UserAccountPopup isVisible={isUserPopupVisible} userName={userName} menuItems={isAdminUser ? ['Admin Dashboard', ...ACCOUNT_MENU] : ACCOUNT_MENU} handleLogout={handleLogout} onMouseEnter={handlePopupMouseEnter} onMouseLeave={handleUserBlockMouseLeave} />
                ) : (
                  <UserAccountPopupBefore isVisible={isUserPopupVisible} onMouseEnter={handlePopupMouseEnter} onMouseLeave={handleUserBlockMouseLeave} />
                )}
              </div>
            </div>
          </div>
        </div>
        <MegaMenuDropdown menuKey={activeMenu} isVisible={activeMenu !== null} />
      </nav>
    </div>
  );
}