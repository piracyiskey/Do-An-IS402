import React from "react";
import { Link } from "react-router-dom";
// Import các icon mới từ Lucide-React
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube 
} from "lucide-react";



export default function Footer() {
  // Hàm render liên kết giúp code gọn gàng hơn
  const FooterLink = ({ children, href = "#" }) => (
    <li>
      <a 
        href={href} 
        // Giữ màu mặc định của <a> là text-black để đảm bảo màu chữ là đen.
        // Class 'text-black' trong <p> sẽ củng cố điều này.
        className="text-black hover:text-blue-600 transition duration-150 ease-in-out block"
      >
        {/* Children (bao gồm cả thẻ <p> có className="text-black" mà bạn muốn) được render tại đây */}
        {children} 
      </a>
    </li>
  );

  return (
    // Footer chính: Nền trắng, Chữ đen
    <footer className="w-full text-gray-800 bg-white border-t border-gray-100 flex flex-col items-center">
      
      {/* Container nội dung chính */}
      <div className="max-w-8xl w-full mx-auto px-4 md:px-8 py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-12 text-sm">
        
        {/* SHOP */}
        <div>
          <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-black">SHOP</h3>
          <ul className="space-y-3">
            {/* Đã thêm <p className="text-black"> vào mọi liên kết */}
            <FooterLink><p className="text-black">Shop Home</p></FooterLink>
            <FooterLink><p className="text-black">Buy Direct Get More</p></FooterLink>
            <FooterLink><p className="text-black">Discover AI</p></FooterLink>
            <FooterLink><p className="text-black">SmartThings</p></FooterLink>
            <FooterLink><p className="text-black">Samsung Rewards</p></FooterLink>
            <FooterLink><p className="text-black">Student & Workplace Offers</p></FooterLink>
            <FooterLink><p className="text-black">Samsung Care+</p></FooterLink>
            <FooterLink><p className="text-black">Experience Stores</p></FooterLink>
          </ul>
        </div>

        {/* PRODUCT */}
        <div>
          <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-black">PRODUCT</h3>
          <ul className="space-y-3">
            <FooterLink><p className="text-black">Galaxy Smartphone</p></FooterLink>
            <FooterLink><p className="text-black">Galaxy Tab</p></FooterLink>
            <FooterLink><p className="text-black">Galaxy Watch</p></FooterLink>
            <FooterLink><p className="text-black">TVs</p></FooterLink>
            <FooterLink><p className="text-black">Refrigerators</p></FooterLink>
            <FooterLink><p className="text-black">Monitors</p></FooterLink>
            <FooterLink><p className="text-black">Accessories</p></FooterLink>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-black">SUPPORT</h3>
          <ul className="space-y-3">
            <FooterLink><p className="text-black">Support Home</p></FooterLink> 
            <FooterLink><p className="text-black">Manual & Software</p></FooterLink>
            <FooterLink><p className="text-black">Warranty Information</p></FooterLink>
            <FooterLink><p className="text-black">Service Center</p></FooterLink>
            <li><Link to="/contact-us" className="text-black hover:text-blue-600 transition duration-150 ease-in-out block"><p className="text-black">Contact Us</p></Link></li>
          </ul>
        </div>

        {/* ACCOUNT */}
        <div>
          <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-black">ACCOUNT</h3>
          <ul className="space-y-3">
            <FooterLink><p className="text-black">Why Samsung Account</p></FooterLink>
            <FooterLink><p className="text-black">Orders</p></FooterLink>
            <FooterLink><p className="text-black">My Page</p></FooterLink>
            <FooterLink><p className="text-black">Product Registration</p></FooterLink>
          </ul>
        </div>

        {/* SUSTAINABILITY */}
        <div>
          <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-black">SUSTAINABILITY</h3>
          <ul className="space-y-3">
            <FooterLink><p className="text-black">Environment</p></FooterLink>
            <FooterLink><p className="text-black">Digital Responsibility</p></FooterLink>
            <FooterLink><p className="text-black">Accessibility</p></FooterLink>
            <FooterLink><p className="text-black">Sustainable Supply Chain</p></FooterLink>
          </ul>
        </div>

        {/* ABOUT US */}
        <div>
          <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-black">ABOUT US</h3>
          <ul className="space-y-3">
            <FooterLink><p className="text-black">Leadership & Mission</p></FooterLink>
            <li><Link to="/about-us" className="text-black hover:text-blue-600 transition duration-150 ease-in-out block"><p className="text-black">Our Business</p></Link></li>
            <li><Link to="/career" className="text-black hover:text-blue-600 transition duration-150 ease-in-out block"><p className="text-black">Careers</p></Link></li>
            <FooterLink><p className="text-black">Investor Relations</p></FooterLink>
          </ul>
        </div>
      </div>

      {/* Phần Bản quyền và Mạng xã hội */}
      <div className="w-full border-t border-gray-200 bg-gray-50"> 
        <div className="max-w-8xl mx-auto px-4 md:px-8 py-5 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center">
          
          <p className="order-2 md:order-1 mt-3 md:mt-0">© 1995–2025 SAMSUNG. All Rights Reserved.</p>

          {/* Mạng xã hội: Dùng icon Lucide-React với hiệu ứng đẹp hơn */}
          <div className="flex items-center space-x-4 order-1 md:order-2">
            {/* Facebook */}
            <p 
              href="https://www.facebook.com/SamsungVietNam" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-gray-500 hover:text-blue-600 transition duration-150 ease-in-out transform hover:scale-110"
            >
              <Facebook className="w-5 h-5" />
            </p>
            
            {/* Twitter/X */}
            <p 
              href="https://twitter.com/SamsungMobile" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-500 hover:text-blue-600 transition duration-150 ease-in-out transform hover:scale-110"
            >
              <Twitter className="w-5 h-5" />
            </p>
            
            {/* Instagram */}
            <p 
              href="https://www.instagram.com/samsungvietnam" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-500 hover:text-blue-600 transition duration-150 ease-in-out transform hover:scale-110"
            >
              <Instagram className="w-5 h-5" />
            </p>
            
            {/* YouTube */}
            <p 
              href="https://www.youtube.com/user/SamsungMobile" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="text-gray-500 hover:text-blue-600 transition duration-150 ease-in-out transform hover:scale-110"
            >
              <Youtube className="w-5 h-5" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}