import { useState, useEffect } from "react";
import { ChevronRight, Trash2, Loader2, Tag, Minus, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { getCart, removeFromCart, updateCartQuantity, clearCart } from "../lib/cartService";
import api from "../lib/api";

// FAQ Component
const FAQSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "When will my item(s) be shipped or delivered?",
      answer:
        "Shipping times vary by product and location. Most in-stock items ship within 1-3 business days. You'll receive tracking information via email once your order ships.",
    },
    {
      question: "Where can I check the offers that apply toward my purchase?",
      answer:
        "Available offers and promotions will be displayed on the product page and in your cart. You can also check our Offers page for current deals.",
    },
    {
      question: "Can I return my item(s) for a full refund?",
      answer:
        "Most products can be returned within 15 days of delivery for a full refund. Some items may have different return windows. Visit our Returns page for full details.",
    },
    {
      question: "What are Energy Star Rebates?",
      answer:
        "Energy Star rebates are incentives offered by utility companies and government programs for purchasing energy-efficient appliances. Check with your local utility for available rebates.",
    },
    {
      question: "Where can I find rebate details for my order?",
      answer:
        "Rebate information is available on the product page and in your order confirmation email. You can also visit our Rebates page for more details.",
    },
    {
      question: "What is the Samsung Trade-in Program and where can I learn more?",
      answer:
        "The Samsung Trade-in Program lets you trade in eligible devices for credit toward a new purchase. Visit our Trade-in page to check your device's value.",
    },
    {
      question: 'What does the "Ships by" date mean?',
      answer:
        "The 'Ships by' date indicates when your order is expected to leave our warehouse. Delivery time depends on your shipping method and location.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-4" style={{ backgroundColor: "white" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 border-b border-gray-200"
        style={{ backgroundColor: "white", border: "none", borderBottom: "1px solid #e5e7eb" }}
      >
        <h2 className="text-xl font-bold text-black">Frequently Asked Questions</h2>
        <ChevronRight
          className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${isOpen ? "rotate-90" : "-rotate-90"}`}
        />
      </button>

      {isOpen && (
        <div style={{ backgroundColor: "white" }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ backgroundColor: "white", borderBottom: "1px solid #e5e7eb" }}>
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-5 text-left"
                style={{ backgroundColor: "white", border: "none" }}
              >
                <span className="text-sm text-gray-800">{faq.question}</span>
                <span className="text-gray-500 flex-shrink-0 text-xl font-light">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="pb-5 text-sm text-gray-600 pr-8" style={{ backgroundColor: "white" }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Cart Item Component
const CartItem = ({ item, onRemove, onUpdateQuantity, isUpdating }) => {
  // Parse prices to numbers (API returns strings)
  const salePrice = parseFloat(item.sale_price) || 0;
  const basePrice = parseFloat(item.base_price) || 0;
  const additionalPrice = parseFloat(item.additional_price) || 0;
  
  const price = (salePrice || basePrice) + additionalPrice;
  const originalPrice = basePrice + additionalPrice;
  const hasDiscount = salePrice && salePrice < basePrice;

const BASE_URL = 'http://localhost:8000';

  return (
    <div className="border-b border-gray-200 py-6">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center">
          <img
            // SỬA DÒNG NÀY: Nối BASE_URL với đường dẫn từ API
            src={item.image_url ? `${BASE_URL}${item.image_url}` : "https://via.placeholder.com/100x100?text=Product"}
            alt={item.product_name}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/100x100?text=No+Image";
            }}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 text-base">{item.product_name}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.sku || item.variant_sku}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">${(price * item.quantity).toFixed(2)}</p>
              {hasDiscount && (
                <p className="text-sm text-gray-400 line-through">${(originalPrice * item.quantity).toFixed(2)}</p>
              )}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div 
                className="flex items-center rounded-full overflow-hidden"
                style={{ border: '1px solid #d1d5db' }}
              >
                <button
                  onClick={() => item.quantity > 1 && onUpdateQuantity(item.cart_item_id, item.quantity - 1)}
                  disabled={isUpdating || item.quantity <= 1}
                  className="w-9 h-9 flex items-center justify-center transition"
                  style={{ 
                    backgroundColor: 'white', 
                    border: 'none',
                    cursor: item.quantity <= 1 || isUpdating ? 'not-allowed' : 'pointer',
                    opacity: item.quantity <= 1 || isUpdating ? 0.4 : 1,
                    fontSize: '20px',
                    fontWeight: '300',
                    color: '#000000'
                  }}
                >
                  −
                </button>
                <span 
                  className="text-center font-medium text-sm"
                  style={{ minWidth: '40px', color: '#111827' }}
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.cart_item_id, item.quantity + 1)}
                  disabled={isUpdating || item.quantity >= 99}
                  className="w-9 h-9 flex items-center justify-center transition"
                  style={{ 
                    backgroundColor: 'white', 
                    border: 'none',
                    cursor: isUpdating || item.quantity >= 99 ? 'not-allowed' : 'pointer',
                    opacity: isUpdating || item.quantity >= 99 ? 0.4 : 1,
                    fontSize: '20px',
                    fontWeight: '300',
                    color: '#000000'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {hasDiscount && (
              <span className="text-sm font-medium" style={{ color: '#2563eb' }}>
                Save ${((originalPrice - price) * item.quantity).toFixed(2)}
              </span>
            )}

            <button
              onClick={() => onRemove(item.cart_item_id)}
              disabled={isUpdating}
              className="w-9 h-9 flex items-center justify-center rounded-full transition"
              style={{ backgroundColor: 'transparent', border: '1px solid #d1d5db', cursor: 'pointer' }}
            >
              {isUpdating ? (
                <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#9ca3af' }} />
              ) : (
                <span style={{ fontSize: '16px', color: '#000000' }}>🗑</span>
              )}
            </button>
          </div>

          {/* Delivery Info */}
          <div className="flex gap-8 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>📦</span>
              <span>
                Delivers to: <span className="text-blue-600">10001</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏪</span>
              <span>In-Store pick up at: Best Buy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Summary Component
const OrderSummary = ({ subtotal, discount, promoCode, onApplyPromo, promoInput, setPromoInput, isApplyingPromo, user }) => {
  const shipping = 0; // Free shipping
  const total = subtotal - discount;
  const rewardPoints = Math.floor(total * 2); // 2 points per dollar

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-4">Order summary</h2>

      {/* Promo Code Input */}
      <div className="mb-4">
        <label className="text-sm text-gray-600 mb-2 block">Promo/Referral code</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            placeholder="Enter promo code"
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <button
            onClick={onApplyPromo}
            disabled={isApplyingPromo || !promoInput}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
          >
            {isApplyingPromo ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
          </button>
        </div>
      </div>

      {/* Applied Promo Code */}
      {promoCode && (
        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#ecfdf5', border: '1px solid #10b981' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span style={{ color: '#10b981' }}>✓</span>
              <span className="text-sm font-medium" style={{ color: '#065f46' }}>
                {promoCode.promotion_code}
              </span>
            </div>
            <span className="text-sm font-medium" style={{ color: '#10b981' }}>
              -{promoCode.discount_type === 'percentage' ? `${promoCode.discount_value}%` : `$${promoCode.discount_value}`}
            </span>
          </div>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="space-y-3 py-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span style={{ color: '#10b981' }}>Promo Discount</span>
            <span className="font-medium" style={{ color: '#10b981' }}>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-green-600">FREE</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated tax</span>
          <span className="text-gray-500 text-xs">Will be calculated later</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="flex justify-between">
          <span className="text-lg font-bold">Estimated Total</span>
          <span className="text-lg font-bold">${total.toFixed(2)}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">or starting from $7.3/mo for 24 months</p>
      </div>

      {/* Checkout Button */}
      <Link to="/checkout">
        <button
          className="w-full py-3 rounded-full font-medium mb-3"
          style={{ backgroundColor: "#3b82f6", color: "white" }}
        >
          Checkout
        </button>
      </Link>

      {/* Savings */}
      {discount > 0 && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between items-center cursor-pointer">
            <span className="text-sm font-medium">Total Savings</span>
            <span className="text-sm font-medium">${discount.toFixed(2)}</span>
          </div>
          {promoCode && (
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Promotional Discount(s)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
        </div>
      )}

      {/* Samsung Rewards */}
      {user && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Tag className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-sm">Samsung Rewards | {user.member_tier_id === 4 ? "VIP" : "Custom"}</p>
              <p className="text-xs text-gray-600 mt-1">2x points for Silver members</p>
              <p className="text-xs text-gray-600">You'll earn on this purchase</p>
              <p className="text-xs text-blue-600 mt-1">
                Check your <Link to="/my-rewards" className="underline">My Rewards</Link>
              </p>
            </div>
            <span className="text-sm font-medium ml-auto">{rewardPoints} pts</span>
          </div>
        </div>
      )}

      {/* VIP Banner */}
      <div className="mt-4 bg-gray-900 text-white rounded-lg p-4 text-center">
        <p className="text-sm">
          Enjoy our most exclusive benefits when you enroll in{" "}
          <Link to="/my-rewards" className="underline">
            Samsung VIP Advantage
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

const Cart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingItem, setUpdatingItem] = useState(null);
  const [promoInput, setPromoInput] = useState("");
  const [promoCode, setPromoCode] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const isCartEmpty = cartItems.length === 0;

  // Fetch cart data
  const fetchCart = async () => {
    try {
      const data = await getCart();
      console.log("Cart data:", data);
      if (data.success && data.data && data.data.length > 0) {
        setCartItems(data.data);
        setTotalPrice(data.total_price || 0);
      } else {
        setCartItems([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      // Cart is empty or error - clear items
      setCartItems([]);
      setTotalPrice(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");

    if (accessToken && storedUser) {
      setIsLoggedIn(true);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user", e);
      }
      fetchCart();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Remove item
  const handleRemoveItem = async (cartItemId) => {
    console.log("Removing item:", cartItemId);
    setUpdatingItem(cartItemId);
    try {
      const result = await removeFromCart(cartItemId);
      console.log("Remove result:", result);
      await fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item: " + (error.response?.data?.message || error.message));
    } finally {
      setUpdatingItem(null);
    }
  };

  // Update quantity
  const handleUpdateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    console.log("Updating quantity:", cartItemId, newQuantity);
    setUpdatingItem(cartItemId);
    try {
      const result = await updateCartQuantity(cartItemId, newQuantity);
      console.log("Update result:", result);
      await fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity: " + (error.response?.data?.message || error.message));
    } finally {
      setUpdatingItem(null);
    }
  };

  // Apply promo code
  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setIsApplyingPromo(true);
    try {
      const response = await api.get(`/auth/check-coupon?code=${promoInput}`);
      console.log("Promo response:", response.data);
      if (response.data.exists && response.data.promotion) {
        const promo = response.data.promotion;
        console.log("Promo data:", promo);
        setPromoCode(promo);
        let discountAmount = 0;
        if (promo.discount_type === "percentage") {
          discountAmount = (totalPrice * parseFloat(promo.discount_value)) / 100;
        } else {
          discountAmount = parseFloat(promo.discount_value);
        }
        console.log("Discount amount:", discountAmount);
        setDiscount(discountAmount);
        alert(`Coupon applied! You save $${discountAmount.toFixed(2)}`);
      } else {
        alert("Invalid promo code");
      }
    } catch (error) {
      console.error("Promo error:", error);
      alert(error.response?.data?.message || "Invalid promo code");
    } finally {
      setIsApplyingPromo(false);
    }
  };

  // Clear all items from cart
  const [isClearing, setIsClearing] = useState(false);
  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to remove all items from your cart?")) return;
    setIsClearing(true);
    try {
      await clearCart();
      setCartItems([]);
      setTotalPrice(0);
      setDiscount(0);
      setPromoCode(null);
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-screen bg-white font-sans">
      <Navbar isTransparent={false} />

      <main className="flex-grow w-full flex flex-col items-center mt-16 pb-20">
        {/* Header */}
        <div className="w-full pb-3 mb-8 border-b border-gray-300">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-8">
            <h1 className="text-4xl font-extrabold">Cart</h1>
            <span className="text-sm text-gray-700">
              Zip code: <span className="text-blue-600 font-medium cursor-pointer hover:underline">10001</span>
            </span>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}

        {/* Cart with items */}
        {!isLoading && !isCartEmpty && (
          <div className="max-w-7xl mx-auto w-full px-4 mb-8">
            {/* Clear Cart Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                {isClearing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                Clear Cart
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.cart_item_id}
                    item={item}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
                    isUpdating={updatingItem === item.cart_item_id}
                  />
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <OrderSummary
                  subtotal={totalPrice}
                  discount={discount}
                  promoCode={promoCode}
                  onApplyPromo={handleApplyPromo}
                  promoInput={promoInput}
                  setPromoInput={setPromoInput}
                  isApplyingPromo={isApplyingPromo}
                  user={user}
                />
              </div>
            </div>
          </div>
        )}

        {/* Empty Cart */}
        {!isLoading && isCartEmpty && (
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center py-10 flex-grow -mt-12">
            <div className="mt-10 mb-8">
              <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
              {isLoggedIn ? (
                <p className="text-base text-gray-600">
                  Hi {user?.full_name || user?.email}! You haven't added any items to your cart yet.
                </p>
              ) : (
                <p className="text-base text-gray-600">Sign in to see if you have saved some items in cart.</p>
              )}
            </div>

            {!isLoggedIn && (
              <Link to="/login">
                <button
                  className="h-11 w-64 rounded-full transition-all duration-200 font-medium text-sm flex items-center justify-center cursor-pointer border-none outline-none mb-4"
                  style={{ backgroundColor: "#3b82f6", color: "white" }}
                >
                  Sign In
                </button>
              </Link>
            )}

            <Link to="/shop">
              <p className="text-sm text-blue-600 hover:underline cursor-pointer">Continue Shopping</p>
            </Link>
          </div>
        )}

        {/* Payment Types & FAQ */}
        <div className="w-full mt-auto bg-white">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 py-6">
              <span className="text-sm text-gray-600 whitespace-nowrap mr-2">Supported payment types</span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                className="h-5 object-contain"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                alt="Mastercard"
                className="h-5 object-contain"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                alt="Amex"
                className="h-5 object-contain"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg"
                alt="Discover"
                className="h-4 object-contain"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="PayPal"
                className="h-5 object-contain"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                alt="Google Pay"
                className="h-5 object-contain"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg"
                alt="Apple Pay"
                className="h-5 object-contain"
              />
              <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">affirm</span>
              <span className="text-xs font-semibold text-pink-500 bg-pink-50 px-2 py-1 rounded">Klarna</span>
              <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded">venmo</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded flex items-center gap-1">
                <span className="w-4 h-4 bg-blue-600 rounded-sm"></span>
                Samsung Financing
              </span>
            </div>

            <FAQSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
