import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, Package, ChevronDown, ChevronUp, ShoppingBag, Calendar, CreditCard } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/api";

// Status Badge Component
const StatusBadge = ({ status, type = "order" }) => {
  const getStatusStyle = () => {
    if (type === "payment") {
      switch (status?.toLowerCase()) {
        case "paid":
          return { bg: "#dcfce7", color: "#166534", label: "Paid", icon: "✓" };
        case "pending":
          return { bg: "#fef3c7", color: "#92400e", label: "Pending", icon: "⏳" };
        default:
          return { bg: "#f3f4f6", color: "#374151", label: status || "Unknown", icon: "•" };
      }
    }
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return { bg: "#dcfce7", color: "#166534", label: "Delivered", icon: "✓" };
      case "shipping":
      case "shipped":
        return { bg: "#dbeafe", color: "#1e40af", label: "Shipping", icon: "🚚" };
      case "processing":
        return { bg: "#e0e7ff", color: "#3730a3", label: "Processing", icon: "⚙️" };
      case "pending":
        return { bg: "#fef3c7", color: "#92400e", label: "Pending", icon: "⏳" };
      case "cancelled":
      case "canceled":
        return { bg: "#fee2e2", color: "#991b1b", label: "Cancelled", icon: "✕" };
      default:
        return { bg: "#f3f4f6", color: "#374151", label: status || "Unknown", icon: "•" };
    }
  };

  const style = getStatusStyle();
  return (
    <span
      className="px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {style.label}
    </span>
  );
};

// Order Item Component (like Cart Item)
const OrderItemCard = ({ item }) => {
  const unitPrice = parseFloat(item.unit_price) || 0;
  const totalPrice = parseFloat(item.total_price) || 0;
  const quantity = item.quantity || 1;

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* Product Image */}
      <div 
        className="w-24 h-24 flex-shrink-0 rounded-xl flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#f9fafb", border: "1px solid #e5e7eb" }}
      >
        {item.image_url ? (
          <img 
            src={item.image_url} 
            alt={item.product_name}
            className="w-full h-full object-contain p-2"
          />
        ) : (
          <Package style={{ width: "36px", height: "36px", color: "#9ca3af" }} />
        )}
      </div>
      
      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 text-base">{item.product_name}</h4>
        {item.variant_sku && (
          <p className="text-sm text-gray-500 mt-0.5">SKU: {item.variant_sku}</p>
        )}
        <div className="flex items-center gap-4 mt-2">
          <span 
            className="text-sm px-3 py-1 rounded-full"
            style={{ backgroundColor: "#f3f4f6", color: "#374151" }}
          >
            Qty: {quantity}
          </span>
          <span className="text-sm text-gray-500">
            ${unitPrice.toFixed(2)} each
          </span>
        </div>
      </div>
      
      {/* Price */}
      <div className="text-right flex flex-col justify-center">
        <p className="font-bold text-lg text-gray-900">${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order, onCancel, isCancelling }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const createdAt = order.created_at
    ? new Date(order.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";

  const canCancel = order.status?.toLowerCase() === "pending" && order.payment_status?.toLowerCase() === "pending";

  // Fetch order items when expanded
  const handleToggle = async () => {
    if (!isExpanded && items.length === 0) {
      setIsLoadingItems(true);
      try {
        const response = await api.get(`/auth/order/${order.order_id}`);
        if (response.data.items) {
          setItems(response.data.items);
        }
      } catch (error) {
        console.error("Error fetching order items:", error);
      } finally {
        setIsLoadingItems(false);
      }
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden mb-4 transition-shadow hover:shadow-lg"
      style={{ border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
    >
      {/* Order Header */}
      <div 
        className="p-5 cursor-pointer transition"
        onClick={handleToggle}
        style={{ backgroundColor: isExpanded ? "#fafafa" : "white" }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Order ID & Date */}
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#eff6ff" }}
              >
                <ShoppingBag style={{ width: "20px", height: "20px", color: "#3b82f6" }} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Order #{order.order_id}</h3>
                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Calendar style={{ width: "14px", height: "14px" }} />
                  <span>{createdAt}</span>
                </div>
              </div>
            </div>
            
            {/* Status Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={order.status} type="order" />
              <StatusBadge status={order.payment_status} type="payment" />
            </div>
          </div>
          
          {/* Price & Expand Icon */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-bold text-2xl text-gray-900">${parseFloat(order.total_amount || 0).toFixed(2)}</p>
              {order.discount_amount > 0 && (
                <p className="text-sm font-medium" style={{ color: "#10b981" }}>
                  Saved ${parseFloat(order.discount_amount).toFixed(2)}
                </p>
              )}
            </div>
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center transition"
              style={{ backgroundColor: isExpanded ? "#e5e7eb" : "#f3f4f6" }}
            >
              {isExpanded ? (
                <ChevronUp style={{ width: "20px", height: "20px", color: "#374151" }} />
              ) : (
                <ChevronDown style={{ width: "20px", height: "20px", color: "#374151" }} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ borderTop: "1px solid #e5e7eb" }}>
          {/* Order Items */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Package style={{ width: "18px", height: "18px", color: "#6b7280" }} />
              <h4 className="font-semibold text-gray-700">Order Items ({items.length})</h4>
            </div>
            
            {isLoadingItems ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#3b82f6" }} />
              </div>
            ) : items.length > 0 ? (
              <div 
                className="rounded-xl overflow-hidden"
                style={{ backgroundColor: "#fafafa", border: "1px solid #f3f4f6" }}
              >
                <div className="px-4">
                  {items.map((item, index) => (
                    <OrderItemCard key={index} item={item} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Package style={{ width: "40px", height: "40px", color: "#d1d5db", margin: "0 auto 8px" }} />
                <p className="text-gray-500">No items found</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="px-5 pb-5">
            <div 
              className="rounded-xl p-5"
              style={{ backgroundColor: "#f9fafb", border: "1px solid #f3f4f6" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <CreditCard style={{ width: "18px", height: "18px", color: "#6b7280" }} />
                <h4 className="font-semibold text-gray-700">Payment Summary</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${parseFloat(order.subtotal || 0).toFixed(2)}</span>
                </div>
                {order.discount_amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "#10b981" }}>Discount Applied</span>
                    <span className="font-medium" style={{ color: "#10b981" }}>
                      -${parseFloat(order.discount_amount).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${parseFloat(order.shipping_fee || 10).toFixed(2)}</span>
                </div>
                <div 
                  className="flex justify-between pt-3 mt-3"
                  style={{ borderTop: "1px solid #e5e7eb" }}
                >
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">
                    ${parseFloat(order.total_amount || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div 
            className="px-5 pb-5 flex gap-3"
          >
            <Link to={`/order/${order.order_id}`} className="flex-1">
              <button
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition hover:opacity-90"
                style={{ backgroundColor: "#3b82f6", color: "white" }}
              >
                View Full Details
              </button>
            </Link>
            {canCancel && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel(order.order_id);
                }}
                disabled={isCancelling}
                className="py-3.5 px-8 rounded-xl font-semibold text-sm transition hover:bg-red-50"
                style={{ border: "2px solid #ef4444", color: "#ef4444", backgroundColor: "white" }}
              >
                {isCancelling ? <Loader2 className="w-5 h-5 animate-spin" /> : "Cancel Order"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [filter, setFilter] = useState("all");

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/auth/getallorder");
        if (response.data.orders) {
          const sortedOrders = response.data.orders.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setOrders(sortedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  // Cancel order
  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    setCancellingId(orderId);
    try {
      await api.get(`/auth/order/cancel/${orderId}`);
      setOrders((prev) => prev.filter((o) => o.order_id !== orderId));
      alert("Order cancelled successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancellingId(null);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "pending") return order.payment_status?.toLowerCase() === "pending";
    if (filter === "processing") return order.status?.toLowerCase() === "processing";
    if (filter === "completed")
      return order.status?.toLowerCase() === "completed" || order.status?.toLowerCase() === "delivered";
    if (filter === "cancelled")
      return order.status?.toLowerCase() === "cancelled" || order.status?.toLowerCase() === "canceled";
    return true;
  });

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.payment_status?.toLowerCase() === "pending").length,
    paid: orders.filter((o) => o.payment_status?.toLowerCase() === "paid").length,
    totalSpent: orders
      .filter((o) => o.payment_status?.toLowerCase() === "paid")
      .reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0),
  };

  return (
    <div className="flex flex-col min-h-screen w-screen" style={{ backgroundColor: "#f8fafc" }}>
      <Navbar isTransparent={false} />

      <main className="flex-grow w-full mt-16 pb-20">
        {/* Header */}
        <div 
          className="w-full py-10"
          style={{ 
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-2">My Orders</h1>
            <p className="text-blue-100">Track and manage all your orders in one place</p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div 
                className="rounded-xl p-4"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
              >
                <p className="text-blue-100 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <div 
                className="rounded-xl p-4"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
              >
                <p className="text-blue-100 text-sm">Pending</p>
                <p className="text-3xl font-bold text-yellow-300">{stats.pending}</p>
              </div>
              <div 
                className="rounded-xl p-4"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
              >
                <p className="text-blue-100 text-sm">Paid</p>
                <p className="text-3xl font-bold text-green-300">{stats.paid}</p>
              </div>
              <div 
                className="rounded-xl p-4"
                style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
              >
                <p className="text-blue-100 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">${stats.totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { key: "all", label: "All Orders" },
              { key: "pending", label: "Pending" },
              { key: "processing", label: "Processing" },
              { key: "completed", label: "Completed" },
              { key: "cancelled", label: "Cancelled" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition flex items-center gap-2"
                style={
                  filter === tab.key
                    ? { backgroundColor: "#1f2937", color: "#ffffff" }
                    : { backgroundColor: "#ffffff", color: "#374151", border: "1px solid #e5e7eb" }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin mb-4" style={{ color: "#3b82f6" }} />
              <p className="text-gray-500">Loading your orders...</p>
            </div>
          )}

          {/* Orders List */}
          {!isLoading && filteredOrders.length > 0 && (
            <div>
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.order_id}
                  order={order}
                  onCancel={handleCancelOrder}
                  isCancelling={cancellingId === order.order_id}
                />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredOrders.length === 0 && (
            <div 
              className="text-center py-16 rounded-2xl"
              style={{ backgroundColor: "white", border: "1px solid #e5e7eb" }}
            >
              <div 
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <ShoppingBag style={{ width: "48px", height: "48px", color: "#9ca3af" }} />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-900">No orders found</h2>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                {filter === "all"
                  ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                  : `No ${filter} orders found. Try a different filter.`}
              </p>
              <Link to="/">
                <button
                  className="px-8 py-3.5 rounded-full font-semibold transition hover:opacity-90"
                  style={{ backgroundColor: "#3b82f6", color: "white" }}
                >
                  Start Shopping
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyOrders;
