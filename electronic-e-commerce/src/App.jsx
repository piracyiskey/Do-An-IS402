import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./global.css";
/* =======================
   Lazy-loaded pages
======================= */
import AuthenticatedRoute from "./pages/AuthenticatedRoute.jsx";
import AuthRoute from "./pages/AuthRoute.jsx";
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Career = lazy(() => import("./pages/Career"));
const AboutUs = lazy(() => import("./pages/About_Us"));
const ContactUs = lazy(() => import("./pages/Contact_Us"));
const DashBoard = lazy(() => import("./pages/Dash_Board"));
const VerifiedEmail = lazy(() => import("./pages/VerifiedEmail"));
const Profile = lazy(() => import("./pages/Profile"));
const MyRewards = lazy(() => import("./pages/MyRewards"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const MobilePage = lazy(() => import("./pages/MobilePage.jsx"));
const ShopPage = lazy(() => import("./pages/ShopPage.jsx"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage.jsx"));
const SearchResults = lazy(() => import("./components/SearchResults"));
const TVAVPage = lazy(() => import("./pages/TV-AVPage.jsx"));
const ComputingPage = lazy(() => import("./pages/ComputingPage.jsx"));
const GoogleCallback = lazy(() => import("./pages/GoogleCallback.jsx"));

/* =======================
   App Component
======================= */

function App() {

  return (
    <Router>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          </div>
        }
      >
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/auth/callback" element={<GoogleCallback />} />
          </Route>
          
          
          <Route element={<AuthenticatedRoute />}>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-rewards" element={<MyRewards />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/order/:orderId" element={<OrderDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>


          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/verified_email" element={<VerifiedEmail />} />
          <Route path="/career" element={<Career />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/mobile/:child_slug" element={<MobilePage />} />
          <Route
            path="/mobile"
            element={<Navigate to="/mobile/galaxy-smartphone" replace />}
          />

          <Route path="/tv-av/:child_slug" element={<TVAVPage />} />
          <Route
            path="/tv-av"
            element={<Navigate to="/tv-av/premium-flagship-tvs" replace />}
          />

          <Route path="/computing-displays/:child_slug" element={<ComputingPage />} />
          <Route
            path="/computing-displays"
            element={<Navigate to="/computing-displays/galaxy-book-laptop" replace />}
          />

          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:product_id" element={<ProductDetailPage />} />
          <Route path="/resultsearch" element={<SearchResults />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;