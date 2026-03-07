import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, ChevronDown, Tag, Check, MapPin, Phone, User, FileText } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getCart, clearCart } from "../lib/cartService";
import api from "../lib/api";

// Order Summary Sidebar
const OrderSummary = ({ cartItems, subtotal, discount, promoCode, promoInput, setPromoInput, onApplyPromo, isApplyingPromo, user, onPlaceOrder, isSubmitting }) => {
  const shipping = 10; // $10 shipping fee
  const total = Math.max(0, subtotal - discount + shipping);
  const rewardPoints = Math.floor(total * (user?.point_per_dollar || 1));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Order summary</h2>
        <Link to="/cart" className="text-sm text-blue-600 hover:underline">Edit cart</Link>
      </div>

      {/* Cart Items Preview - NO SCROLL */}
      <div className="mb-4 border-b border-gray-200 pb-4">
        {cartItems.map((item) => {
          const price = (parseFloat(item.sale_price) || parseFloat(item.base_price) || 0) + (parseFloat(item.additional_price) || 0);
          return (
            <div key={item.cart_item_id} className="flex gap-3 mb-3">
              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                <img
                  src={item.image_url || "https://via.placeholder.com/64"}
                  alt={item.product_name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{item.product_name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium">${(price * item.quantity).toFixed(2)}</p>
            </div>
          );
        })}
      </div>

      {/* Promo Code */}
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
            className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            {isApplyingPromo ? <Loader2 className="w-4 h-4 animate-spin" /> : "Apply"}
          </button>
        </div>
      </div>

      {/* Applied Promo */}
      {promoCode && (
        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#ecfdf5', border: '1px solid #10b981' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check style={{ width: '16px', height: '16px', color: '#10b981' }} />
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
      <div className="space-y-2 py-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span style={{ color: '#10b981' }}>Discount</span>
            <span style={{ color: '#10b981' }}>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Estimated tax</span>
          <span className="text-gray-400 text-xs">Calculated later</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between">
          <span className="text-lg font-bold">Estimated Total</span>
          <span className="text-lg font-bold">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Samsung Rewards */}
      {user && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Tag className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">Samsung Rewards</p>
              <p className="text-xs text-gray-600">You'll earn {rewardPoints} pts on this purchase</p>
            </div>
          </div>
        </div>
      )}

      {/* Place Order Button - AT BOTTOM */}
      <div className="mt-6">
        <button
          onClick={onPlaceOrder}
          disabled={isSubmitting}
          className="w-full py-4 rounded-full font-medium text-lg flex items-center justify-center gap-2"
          style={{ backgroundColor: "#3b82f6", color: "white" }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Promo
  const [promoInput, setPromoInput] = useState("");
  const [promoCode, setPromoCode] = useState(null);
  const [promoCodes, setPromoCodes] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    receiver_name: "",
    receiver_phone: "",
    city: "",
    district: "",
    ward: "",
    address_line1: "",
    address_line2: "",
    address_type: "home",
    notes: "",
  });

  const [errors, setErrors] = useState({});


  // Fetch cart and user data
  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setFormData(prev => ({
            ...prev,
            receiver_name: userData.full_name || "",
            receiver_phone: userData.phone_number || "",
          }));
        } catch (e) {
          console.error("Error parsing user", e);
        }
      }

      try {
        const data = await getCart();
        if (data.success && data.data && data.data.length > 0) {
          setCartItems(data.data);
          setSubtotal(parseFloat(data.total_price) || 0);
        } else {
          // Empty cart, redirect to cart page
          navigate("/cart");
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        navigate("/cart");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Apply promo code
  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setIsApplyingPromo(true);
    try {
      const response = await api.get(`/auth/check-coupon?code=${promoInput}`);
      if (response.data.exists && response.data.promotion) {
        const promo = response.data.promotion;
        
        // Check if already applied
        if (promoCodes.includes(promo.promotion_code)) {
          alert("This promo code is already applied");
          return;
        }

        setPromoCode(promo);
        setPromoCodes(prev => [...prev, promo.promotion_code]);
        
        let discountAmount = 0;
        if (promo.discount_type === "percentage") {
          discountAmount = (subtotal * parseFloat(promo.discount_value)) / 100;
        } else {
          discountAmount = parseFloat(promo.discount_value);
        }
        setDiscount(prev => prev + discountAmount);
        setPromoInput("");
        alert(`Coupon applied! You save $${discountAmount.toFixed(2)}`);
      } else {
        alert("Invalid promo code");
      }
    } catch (error) {
      alert(error.response?.data?.message ||"Invalid promo code");
    } finally {
      setIsApplyingPromo(false);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.receiver_name.trim()) newErrors.receiver_name = "Name is required";
    if (!formData.receiver_phone.trim()) newErrors.receiver_phone = "Phone number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (!formData.ward.trim()) newErrors.ward = "Ward is required";
    if (!formData.address_line1.trim()) newErrors.address_line1 = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit order
  const handleSubmitOrder = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        ...formData,
        promotion_codes: promoCodes,
      };

      const response = await api.post("/auth/create-order", orderData);
      
      if (response.data.order_id) {
        // Clear cart after successful order
        await clearCart();
        
        // Navigate to order confirmation
        navigate(`/order-success?order_id=${response.data.order_id}`);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert(error.response?.data?.message || "Failed to create order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen w-screen bg-gray-50">
        <Navbar isTransparent={false} />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-50">
      <Navbar isTransparent={false} />

      <main className="flex-grow w-full mt-16 pb-20">
        {/* Header */}
        <div className="w-full bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Details
                </h2>

                {/* Address Type */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                  <div className="flex gap-4">
                    {["home", "office", "other"].map((type) => (
                      <label
                        key={type}
                        className={`flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer transition ${
                          formData.address_type === type
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="address_type"
                          value={type}
                          checked={formData.address_type === type}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span className="capitalize text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* City, District, Ward */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      className={`w-full border rounded-lg px-3 py-2 text-sm ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      District <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      placeholder="Enter district"
                      className={`w-full border rounded-lg px-3 py-2 text-sm ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ward <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="ward"
                      value={formData.ward}
                      onChange={handleInputChange}
                      placeholder="Enter ward"
                      className={`w-full border rounded-lg px-3 py-2 text-sm ${errors.ward ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.ward && <p className="text-red-500 text-xs mt-1">{errors.ward}</p>}
                  </div>
                </div>

                {/* Address Lines */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address_line1"
                    value={formData.address_line1}
                    onChange={handleInputChange}
                    placeholder="Street address, house number"
                    className={`w-full border rounded-lg px-3 py-2 text-sm ${errors.address_line1 ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address_line1 && <p className="text-red-500 text-xs mt-1">{errors.address_line1}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address Line 2 <span className="text-gray-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="address_line2"
                    value={formData.address_line2}
                    onChange={handleInputChange}
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Receiver Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Receiver Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="receiver_name"
                      value={formData.receiver_name}
                      onChange={handleInputChange}
                      placeholder="Enter receiver name"
                      className={`w-full border rounded-lg px-3 py-2 text-sm ${errors.receiver_name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.receiver_name && <p className="text-red-500 text-xs mt-1">{errors.receiver_name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="receiver_phone"
                      value={formData.receiver_phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className={`w-full border rounded-lg px-3 py-2 text-sm ${errors.receiver_phone ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.receiver_phone && <p className="text-red-500 text-xs mt-1">{errors.receiver_phone}</p>}
                  </div>
                </div>

                <p className="text-xs text-gray-500 flex items-start gap-1">
                  <Phone className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  We'll send SMS updates about your order status to this number.
                </p>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Order Notes <span className="text-gray-400 font-normal text-sm">(Optional)</span>
                </h2>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Add any special instructions for delivery..."
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none"
                />
              </div>
            </div>

            {/* Right - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary
                cartItems={cartItems}
                subtotal={subtotal}
                discount={discount}
                promoCode={promoCode}
                promoInput={promoInput}
                setPromoInput={setPromoInput}
                onApplyPromo={handleApplyPromo}
                isApplyingPromo={isApplyingPromo}
                user={user}
                onPlaceOrder={handleSubmitOrder}
                isSubmitting={isSubmitting}
              />

              {/* Info Cards */}
              <div className="mt-4 space-y-3">
                <div className="bg-gray-900 text-white rounded-lg p-4 text-center">
                  <p className="text-sm">
                    Enjoy exclusive benefits with{" "}
                    <Link to="/my-rewards" className="underline">Samsung VIP</Link>
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium mb-1">🔒 Secure Checkout</p>
                  <p className="text-xs text-gray-500">Your payment information is encrypted and secure.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium mb-1">📦 Easy Returns</p>
                  <p className="text-xs text-gray-500">Free returns within 15 days of delivery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
