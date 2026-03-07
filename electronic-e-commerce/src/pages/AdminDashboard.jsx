import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Package, CheckCircle, Clock, XCircle, DollarSign, Users, ShoppingBag, Eye, CreditCard } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/api";

const ADMIN_EMAIL = "remembermyname2k5@gmail.com";

// Status Badge
const StatusBadge = ({ status, type = "order" }) => {
  const getStyle = () => {
    if (type === "payment") {
      switch (status?.toLowerCase()) {
        case "paid": return { bg: "#dcfce7", color: "#166534" };
        case "pending": return { bg: "#fef3c7", color: "#92400e" };
        default: return { bg: "#f3f4f6", color: "#374151" };
      }
    }
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered": return { bg: "#dcfce7", color: "#166534" };
      case "processing":
      case "shipping": return { bg: "#dbeafe", color: "#1e40af" };
      case "pending": return { bg: "#fef3c7", color: "#92400e" };
      case "cancelled": return { bg: "#fee2e2", color: "#991b1b" };
      default: return { bg: "#f3f4f6", color: "#374151" };
    }
  };
  const style = getStyle();
  return (
    <span
      className="px-2 py-1 rounded text-xs font-medium"
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      {status?.toUpperCase() || "N/A"}
    </span>
  );
};

// Order Detail Modal
const OrderDetailModal = ({ order, items, onClose, onVerifyPayment, isVerifying }) => {
  if (!order) return null;

  const createdAt = order.created_at ? new Date(order.created_at).toLocaleString() : "N/A";
  const canVerify = order.payment_status?.toLowerCase() === "pending";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Order #{order.order_id}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className="font-medium">{order.user?.full_name || order.user?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{order.user?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">{createdAt}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="flex gap-2 mt-1">
                <StatusBadge status={order.status} type="order" />
                <StatusBadge status={order.payment_status} type="payment" />
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-bold mb-3">Items ({items?.length || 0})</h3>
            <div className="space-y-2">
              {items?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity} × ${parseFloat(item.unit_price).toFixed(2)}</p>
                  </div>
                  <p className="font-medium">${parseFloat(item.total_price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>${parseFloat(order.subtotal || 0).toFixed(2)}</span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-sm mb-2" style={{ color: "#10b981" }}>
                <span>Discount</span>
                <span>-${parseFloat(order.discount_amount).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm mb-2">
              <span>Shipping</span>
              <span>${parseFloat(order.shipping_fee || 10).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>${parseFloat(order.total_amount).toFixed(2)}</span>
            </div>
          </div>

          {/* Verify Payment Button */}
          {canVerify && (
            <button
              onClick={() => onVerifyPayment(order.order_id)}
              disabled={isVerifying}
              className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              style={{ backgroundColor: "#10b981", color: "white" }}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle style={{ width: "20px", height: "20px" }} />
                  Verify Payment & Award Points
                </>
              )}
            </button>
          )}

          {order.payment_status?.toLowerCase() === "paid" && (
            <div className="text-center py-3 rounded-lg" style={{ backgroundColor: "#dcfce7", color: "#166534" }}>
              <CheckCircle style={{ width: "20px", height: "20px", display: "inline", marginRight: "8px" }} />
              Payment Verified
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [filter, setFilter] = useState("all");
  
  // Modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  // Check admin and fetch orders
  useEffect(() => {
    const checkAdminAndFetch = async () => {
      const accessToken = localStorage.getItem("access_token");
      const storedUser = localStorage.getItem("user");

      if (!accessToken) {
        navigate("/login");
        return;
      }

      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          if (userData.email !== ADMIN_EMAIL) {
            setIsAdmin(false);
            setIsLoading(false);
            return;
          }
          setIsAdmin(true);
        } catch (e) {
          console.error("Error parsing user", e);
        }
      }

      try {
        const response = await api.get("/auth/admin/orders");
        if (response.data.success) {
          setOrders(response.data.orders || []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response?.status === 403) {
          setIsAdmin(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAndFetch();
  }, [navigate]);

  // View order detail
  const handleViewOrder = async (orderId) => {
    try {
      const response = await api.get(`/auth/admin/order/${orderId}`);
      if (response.data.success) {
        setSelectedOrder(response.data.order);
        setSelectedItems(response.data.items || []);
      }
    } catch{
      alert("Failed to load order details");
    }
  };

  // Verify payment
  const handleVerifyPayment = async (orderId) => {
    setIsVerifying(true);
    try {
      const response = await api.get(`/auth/verify-payment?order_id=${orderId}`);
      if (response.data.success) {
        alert(`Payment verified!\nUser: ${response.data.user_email}\nPoints awarded: ${response.data.received_points}`);
        
        // Update orders list
        setOrders(prev => prev.map(o => 
          o.order_id === orderId 
            ? { ...o, payment_status: "paid", status: "processing" }
            : o
        ));
        
        // Update modal
        setSelectedOrder(prev => prev ? { ...prev, payment_status: "paid", status: "processing" } : null);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to verify payment");
    } finally {
      setIsVerifying(false);
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    if (filter === "all") return true;
    if (filter === "pending") return order.payment_status?.toLowerCase() === "pending";
    if (filter === "paid") return order.payment_status?.toLowerCase() === "paid";
    return true;
  });

  // Stats
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.payment_status?.toLowerCase() === "pending").length,
    paid: orders.filter(o => o.payment_status?.toLowerCase() === "paid").length,
    revenue: orders.filter(o => o.payment_status?.toLowerCase() === "paid")
      .reduce((sum, o) => sum + parseFloat(o.total_amount || 0), 0),
  };

  // Charts data helpers (derive from `orders` already fetched)
  const getMonthlyRevenue = (ordersList, months = 6) => {
    const now = new Date();
    const buckets = [];
    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      buckets.push({ key, label: d.toLocaleString(undefined, { month: 'short' }), value: 0 });
    }
    ordersList.forEach(o => {
      if (!o.created_at) return;
      const d = new Date(o.created_at);
      const k = `${d.getFullYear()}-${d.getMonth() + 1}`;
      const bucket = buckets.find(b => b.key === k);
      if (bucket && o.payment_status?.toLowerCase() === 'paid') {
        bucket.value += parseFloat(o.total_amount || 0);
      }
    });
    return buckets;
  };

  const monthlyRevenue = getMonthlyRevenue(orders, 6);

  // Product type revenue (for donut) - compute from order items, fetch details when needed
  const [productTypeRevenue, setProductTypeRevenue] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const computeRevenue = async () => {
      const map = {};
      const toFetch = [];
      for (const o of orders) {
        if ((o.payment_status || '').toLowerCase() !== 'paid') continue;
        if (o.items && o.items.length > 0) {
          for (const it of o.items) {
            const type = it.product_type || it.category || it.product_category || 'Unknown';
            const qty = parseFloat(it.quantity || 1);
            const unit = parseFloat(it.unit_price || it.price || it.sale_price || 0);
            const total = parseFloat(it.total_price || (unit * qty)) || 0;
            map[type] = (map[type] || 0) + total;
          }
        } else {
          toFetch.push(o.order_id);
        }
      }

      // fetch details for orders that lack items
      if (toFetch.length > 0) {
        for (const id of toFetch) {
          try {
            const res = await api.get(`/auth/admin/order/${id}`);
            if (res.data && res.data.success) {
              const items = res.data.items || [];
              for (const it of items) {
                const type = it.product_type || it.category || it.product_category || 'Unknown';
                const qty = parseFloat(it.quantity || 1);
                const unit = parseFloat(it.unit_price || it.price || it.sale_price || 0);
                const total = parseFloat(it.total_price || (unit * qty)) || 0;
                map[type] = (map[type] || 0) + total;
              }
            }
          } catch (e) {
            // ignore fetch errors for individual orders
            console.error('Failed to fetch order items for', id, e);
          }
        }
      }

      if (cancelled) return;
      const arr = Object.entries(map).map(([type, value]) => ({ type, value }));
      arr.sort((a, b) => b.value - a.value);
      const total = arr.reduce((s, x) => s + x.value, 0) || 1;
      const withPercent = arr.map(x => ({ ...x, percent: (x.value / total) * 100 }));
      setProductTypeRevenue(withPercent);
    };

    computeRevenue();
    return () => { cancelled = true; };
  }, [orders]);

  // prepare SVG line chart points
  const lineChart = (() => {
    const w = Math.max(360, monthlyRevenue.length * 80);
    const h = 160;
    const pad = { t: 12, r: 20, b: 36, l: 28 };
    const innerW = w - pad.l - pad.r;
    const innerH = h - pad.t - pad.b;
    const max = Math.max(...monthlyRevenue.map(m => m.value), 1);
    const points = monthlyRevenue.map((m, i) => {
      const x = pad.l + (i / Math.max(1, monthlyRevenue.length - 1)) * innerW;
      const y = pad.t + innerH - (m.value / max) * innerH;
      return { x, y, label: m.label, value: m.value };
    });
    const poly = points.map(p => `${p.x},${p.y}`).join(' ');
    return { w, h, pad, points, poly, max };
  })();

  // build smooth path (quadratic smoothing)
  const buildSmoothPath = (pts) => {
    if (!pts || pts.length === 0) return '';
    if (pts.length === 1) return `M ${pts[0].x} ${pts[0].y}`;
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i];
      const q = pts[i + 1];
      const cx = (p.x + q.x) / 2;
      const cy = (p.y + q.y) / 2;
      d += ` Q ${p.x} ${p.y} ${cx} ${cy}`;
    }
    // final segment to last point
    const last = pts[pts.length - 1];
    d += ` T ${last.x} ${last.y}`;
    return d;
  };

  const smoothD = buildSmoothPath(lineChart.points);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen w-screen bg-gray-100">
        <Navbar isTransparent={false} />
        <div className="flex-grow flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col min-h-screen w-screen bg-gray-100">
        <Navbar isTransparent={false} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-screen bg-gray-100">
      <Navbar isTransparent={false} />

      <main className="flex-grow w-full mt-16 pb-20">
        {/* Header */}
        <div className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Manage orders and verify payments</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShoppingBag style={{ width: "20px", height: "20px", color: "#3b82f6" }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-gray-500">Total Orders</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Clock style={{ width: "20px", height: "20px", color: "#f59e0b" }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle style={{ width: "20px", height: "20px", color: "#10b981" }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.paid}</p>
                  <p className="text-sm text-gray-500">Paid</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <DollarSign style={{ width: "20px", height: "20px", color: "#8b5cf6" }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">${stats.revenue.toFixed(0)}</p>
                  <p className="text-sm text-gray-500">Revenue</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-4">
            {["all", "pending", "paid"].map((f) => {
              const isActive = filter === f;
              const classes = `px-4 py-2 rounded-full text-sm font-medium transition ${isActive ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-50'}`;
              const inlineStyle = !isActive && f === 'all' ? { backgroundColor: '#ffffff', color: '#000000' } : undefined;
              return (
               <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    backgroundColor: filter === f ? "#111827" : "#ffffff",
                    color: filter === f ? "#ffffff" : "#000000",
                    borderRadius: "9999px",
                    padding: "8px 16px",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                  className="transition hover:bg-gray-50"
                >

                  {f === 'all' ? 'All Orders' : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              );
            })}
          </div>

          {/* Charts + Orders Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow">
              {/* Monthly Revenue (simple SVG bar chart) */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold">Monthly Revenue</h3>
                  <p className="text-sm text-gray-500">In USD — last 6 months</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span style={{ width: 10, height: 10, backgroundColor: '#0369a1', borderRadius: 4, display: 'inline-block' }}></span>
                    <span className="text-sm text-gray-600">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ width: 10, height: 10, backgroundColor: '#93c5fd', borderRadius: 4, display: 'inline-block' }}></span>
                    <span className="text-sm text-gray-600">Trend</span>
                  </div>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                <svg viewBox={`0 0 ${lineChart.w} ${lineChart.h}`} width="100%" height={lineChart.h}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0369a1" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#0369a1" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {/* subtle vertical bars */}
                  {lineChart.points.map((p, i) => {
                    const barW = lineChart.w / Math.max(6, lineChart.points.length) - 8;
                    const bx = p.x - barW / 2;
                    return <rect key={i} x={bx} y={lineChart.pad.t} width={barW} height={lineChart.h - lineChart.pad.t - lineChart.pad.b} fill="#f3f4f6" opacity="0.12" rx="6" />;
                  })}
                  {/* grid lines */}
                  {(() => {
                    const innerH = lineChart.h - lineChart.pad.t - lineChart.pad.b;
                    return [0, 0.25, 0.5, 0.75, 1].map((t, i) => {
                      const y = lineChart.pad.t + t * innerH;
                      return <line key={i} x1={lineChart.pad.l} x2={lineChart.w - lineChart.pad.r} y1={y} y2={y} stroke="#f3f4f6" />;
                    });
                  })()}

                  {/* area under smooth line */}
                  <path d={`${smoothD} L ${lineChart.w - lineChart.pad.r} ${lineChart.h - lineChart.pad.b} L ${lineChart.pad.l} ${lineChart.h - lineChart.pad.b} Z`} fill="url(#areaGrad)" opacity="0.95" />

                  {/* smooth line */}
                  <path d={smoothD} fill="none" stroke="#0369a1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                  {/* points (accent) */}
                  {lineChart.points.map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="6" fill="#ffffff" stroke="#0369a1" strokeWidth="3" />
                      <circle cx={p.x} cy={p.y} r="3" fill="#0369a1" />
                      <text x={p.x} y={lineChart.h - lineChart.pad.b + 18} textAnchor="middle" fontSize="11" fill="#64748b">{p.label}</text>
                      <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="11" fill="#0f172a" fontWeight={600}>{Math.round(p.value)}</text>
                    </g>
                  ))}

                  {/* baseline */}
                  <line x1={lineChart.pad.l} y1={lineChart.h - lineChart.pad.b} x2={lineChart.w - lineChart.pad.r} y2={lineChart.h - lineChart.pad.b} stroke="#e5e7eb" strokeWidth="1" />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="text-lg font-bold mb-3">Revenue by Product Type</h3>
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center" style={{ width: 160, height: 160 }}>
                    <svg width="160" height="160" viewBox="0 0 42 42">
                      {(() => {
                        const segments = (productTypeRevenue && productTypeRevenue.length) ? productTypeRevenue : [{ type: 'No Data', value: 1, percent: 100 }];
                        const colors = ['#0369a1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#9ca3af'];
                        let offset = 0;
                        return segments.map((s, i) => {
                          const portion = Math.max(0, Math.min(100, s.percent || 0));
                          const elem = (
                            <circle key={i}
                              r="15.91549431"
                              cx="21" cy="21"
                              fill="transparent"
                              stroke={colors[i % colors.length]}
                              strokeWidth="6"
                              strokeDasharray={`${portion} ${100 - portion}`}
                              strokeDashoffset={-offset}
                              transform="rotate(-90 21 21)"
                            />
                          );
                          offset += portion;
                          return elem;
                        });
                      })()}
                      <circle r="10" cx="21" cy="21" fill="#ffffff" />
                    </svg>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="space-y-2">
                    {(() => {
                      const segs = productTypeRevenue.length ? productTypeRevenue : [{ type: 'No Data', value: 0, percent: 100 }];
                      const colors = ['#0369a1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#9ca3af'];
                      // show top 5 then group rest
                      const top = segs.slice(0, 5);
                      const others = segs.slice(5);
                      let otherTotal = 0;
                      if (others.length > 0) otherTotal = others.reduce((s, x) => s + x.percent, 0);
                      return (
                        <>
                          {top.map((s, i) => (
                            <div key={s.type} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span style={{ width: 12, height: 12, backgroundColor: colors[i % colors.length], display: 'inline-block', borderRadius: 3 }}></span>
                                <span className="text-sm text-gray-700">{s.type}</span>
                              </div>
                              <div className="text-sm font-medium">{s.percent ? s.percent.toFixed(1) : 0}%</div>
                            </div>
                          ))}
                          {others.length > 0 && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span style={{ width: 12, height: 12, backgroundColor: '#9ca3af', display: 'inline-block', borderRadius: 3 }}></span>
                                <span className="text-sm text-gray-700">Other</span>
                              </div>
                              <div className="text-sm font-medium">{otherTotal.toFixed(1)}%</div>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                  <div className="mt-3 text-xs text-gray-500">Percent share of paid revenue by product type</div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Payment</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order.order_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">#{order.order_id}</td>
                    <td className="px-4 py-3 text-sm">{order.user?.email || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-4 py-3 font-medium">${parseFloat(order.total_amount || 0).toFixed(2)}</td>
                    <td className="px-4 py-3"><StatusBadge status={order.status} type="order" /></td>
                    <td className="px-4 py-3"><StatusBadge status={order.payment_status} type="payment" /></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewOrder(order.order_id)}
                          className="p-2 rounded hover:bg-gray-100"
                          title="View Details"
                        >
                          <Eye style={{ width: "18px", height: "18px", color: "#6b7280" }} />
                        </button>
                        {order.payment_status?.toLowerCase() === "pending" && (
                          <button
                            onClick={() => handleVerifyPayment(order.order_id)}
                            className="p-2 rounded hover:bg-green-100"
                            title="Verify Payment"
                          >
                            <CreditCard style={{ width: "18px", height: "18px", color: "#10b981" }} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No orders found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          items={selectedItems}
          onClose={() => setSelectedOrder(null)}
          onVerifyPayment={handleVerifyPayment}
          isVerifying={isVerifying}
        />
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;
