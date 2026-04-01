import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Truck, CreditCard, Clock, MapPin, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/api";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get(`/auth/order/${orderId}`);
        if (response.data.order) {
          setOrder(response.data.order);
          setOrderItems(response.data.items || []);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const createdAt = order?.created_at ? new Date(order.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }) : "";

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-50">
      <Navbar isTransparent={false} />

      {isLoading ? (
        <main className="flex-grow w-full mt-16 pb-20 flex items-center justify-center">
          <div className="text-gray-600">Loading order details...</div>
        </main>
      ) : (
        <>

      <main className="flex-grow w-full mt-16 pb-20">
        {/* Success Banner */}
        <div 
          className="w-full py-16"
          style={{ 
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)"
          }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            {/* Animated Check Icon */}
            <div className="mb-6 inline-block">
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "white" }}
                >
                  <CheckCircle style={{ width: "48px", height: "48px", color: "#10b981" }} />
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3">Order Placed Successfully!</h1>
            <p className="text-lg opacity-90 mb-2">Thank you for shopping with Samsung</p>
            {order && (
              <p className="text-sm opacity-75">Order #{order.order_id} • {createdAt}</p>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-8">
          {/* Order Status Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="font-bold text-lg mb-6">Order Status</h2>
            <div className="flex items-center justify-between">
              {/* Step 1 - Order Placed */}
              <div className="flex flex-col items-center flex-1">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: "#10b981" }}
                >
                  <CheckCircle style={{ width: "24px", height: "24px", color: "white" }} />
                </div>
                <p className="text-sm font-medium text-center">Order Placed</p>
                <p className="text-xs text-gray-500">Confirmed</p>
              </div>

              {/* Line */}
              <div className="flex-1 h-1 mx-2" style={{ backgroundColor: "#e5e7eb" }}>
                <div className="h-full w-0" style={{ backgroundColor: "#10b981" }}></div>
              </div>

              {/* Step 2 - Processing */}
              <div className="flex flex-col items-center flex-1">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: "#fef3c7", border: "2px solid #f59e0b" }}
                >
                  <Clock style={{ width: "24px", height: "24px", color: "#f59e0b" }} />
                </div>
                <p className="text-sm font-medium text-center">Processing</p>
                <p className="text-xs text-gray-500">In Progress</p>
              </div>

              {/* Line */}
              <div className="flex-1 h-1 mx-2" style={{ backgroundColor: "#e5e7eb" }}></div>

              {/* Step 3 - Shipped */}
              <div className="flex flex-col items-center flex-1">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: "#f3f4f6" }}
                >
                  <Truck style={{ width: "24px", height: "24px", color: "#9ca3af" }} />
                </div>
                <p className="text-sm font-medium text-center text-gray-400">Shipped</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>

              {/* Line */}
              <div className="flex-1 h-1 mx-2" style={{ backgroundColor: "#e5e7eb" }}></div>

              {/* Step 4 - Delivered */}
              <div className="flex flex-col items-center flex-1">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                  style={{ backgroundColor: "#f3f4f6" }}
                >
                  <Package style={{ width: "24px", height: "24px", color: "#9ca3af" }} />
                </div>
                <p className="text-sm font-medium text-center text-gray-400">Delivered</p>
                <p className="text-xs text-gray-400">Pending</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Order Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Package style={{ width: "20px", height: "20px" }} />
                Order Details
              </h2>

              {order && (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Order ID</span>
                    <span className="font-medium">#{order.order_id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Status</span>
                    <span 
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ 
                        backgroundColor: order.payment_status === "paid" ? "#dcfce7" : "#fef3c7",
                        color: order.payment_status === "paid" ? "#166534" : "#92400e"
                      }}
                    >
                      {order.payment_status?.toUpperCase()}
                    </span>
                  </div>
                  {order.discount_amount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Discount</span>
                      <span style={{ color: "#10b981" }}>-${parseFloat(order.discount_amount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>${parseFloat(order.shipping_fee || 10).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-100">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl">${parseFloat(order.total_amount).toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Items Ordered */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="font-bold text-lg mb-4">Items Ordered ({orderItems.length})</h2>
              
              <div className="space-y-3">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package style={{ width: "20px", height: "20px", color: "#9ca3af" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product_name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} × ${parseFloat(item.unit_price).toFixed(2)}</p>
                    </div>
                    <p className="font-medium">${parseFloat(item.total_price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
            <h2 className="font-bold text-lg mb-4">What's Next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📧</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Email Confirmation</p>
                  <p className="text-xs text-gray-600">Check your inbox for order details</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📦</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Shipping Updates</p>
                  <p className="text-xs text-gray-600">We'll notify you when it ships</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🎁</span>
                </div>
                <div>
                  <p className="font-medium text-sm">Earn Rewards</p>
                  <p className="text-xs text-gray-600">Points added after delivery</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/my-orders">
              <button
                className="w-full sm:w-auto px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2"
                style={{ backgroundColor: "#3b82f6", color: "white" }}
              >
                View My Orders
                <ArrowRight style={{ width: "18px", height: "18px" }} />
              </button>
            </Link>
            <Link to="/">
              <button
                className="w-full sm:w-auto px-8 py-4 rounded-full font-medium border-2 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
        </>
      )}
    </div>
  );
};

export default OrderSuccess;
