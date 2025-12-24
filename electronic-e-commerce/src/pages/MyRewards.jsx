import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Gift, Loader2, CheckCircle, Ticket, Copy, Check } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../lib/api";

export default function MyRewards() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [redeemAmount, setRedeemAmount] = useState(100);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isBuyingVip, setIsBuyingVip] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [promotionCodes, setPromotionCodes] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/user");
        const userData = response.data.data || response.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        // Fetch promotion codes
        try {
          const promoResponse = await api.get("/auth/my-promotions");
          setPromotionCodes(promoResponse.data.data || promoResponse.data || []);
        } catch {
          console.log("No promotions API or no promotions yet");
          setPromotionCodes([]);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // Copy promotion code
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Redeem points
  const handleRedeemPoints = async () => {
    if (redeemAmount < 100) {
      setMessage({ type: "error", text: "Minimum 100 points required" });
      return;
    }
    if (user.reward_points < redeemAmount) {
      setMessage({ type: "error", text: "Insufficient points" });
      return;
    }

    setIsRedeeming(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await api.get(`/auth/redeem-points?points=${redeemAmount}`);
      const newPromo = {
        promotion_code: response.data.promotion_code,
        discount_value: response.data.discount_value,
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
      setPromotionCodes((prev) => [newPromo, ...prev]);
      setMessage({
        type: "success",
        text: `Redeemed! Code: ${response.data.promotion_code} (-$${response.data.discount_value})`,
      });
      // Refresh user data
      const userResponse = await api.get("/auth/user");
      setUser(userResponse.data.data || userResponse.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to redeem points",
      });
    } finally {
      setIsRedeeming(false);
    }
  };

  // Buy VIP
  const handleBuyVip = async () => {
    const vipCost = 14400;
    if (user.reward_points < vipCost) {
      setMessage({ type: "error", text: `Need ${vipCost} points to buy VIP` });
      return;
    }

    setIsBuyingVip(true);
    setMessage({ type: "", text: "" });

    try {
      await api.get("/auth/buyvip");
      setMessage({ type: "success", text: "VIP purchased successfully!" });
      // Refresh user data
      const userResponse = await api.get("/auth/user");
      setUser(userResponse.data.data || userResponse.data);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to buy VIP",
      });
    } finally {
      setIsBuyingVip(false);
    }
  };

  const isVip = user?.membership_tier_id === "vip";
  const pointsValue = ((user?.reward_points || 0) / 100).toFixed(2);

  // Button gradient matching tier card
  const buttonStyle = isVip
    ? { background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", color: "#1f2937" }
    : { background: "linear-gradient(135deg, #374151 0%, #1f2937 100%)", color: "white" };

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-50">
      <Navbar isTransparent={false} />

      {/* Hero Banner */}
      <div
        className="w-full pt-20 pb-12 px-4"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #333 50%, #1a1a1a 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white italic">My Rewards</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        {/* Hello User */}
        <p className="text-gray-700 mb-6">
          Hello <span className="font-semibold">{user?.full_name || user?.email}</span>
        </p>

        {/* Rewards Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tier Card */}
            <div
              className="rounded-xl p-6 text-white"
              style={{
                background: isVip
                  ? "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
                  : "linear-gradient(135deg, #374151 0%, #1f2937 100%)",
              }}
            >
              <h2 className="text-2xl font-bold mb-4">{isVip ? "VIP" : "Custom"}</h2>
              <p className="text-sm opacity-80">
                {user?.reward_points > 0
                  ? `You have ${user.reward_points} points`
                  : "You didn't earn any points yet."}
              </p>
              <p className="text-sm opacity-80">Shop now to start earning</p>
            </div>

            {/* Available Points */}
            <div className="flex flex-col justify-center px-4 border-r border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Available now</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">
                  {user?.reward_points || 0}
                </span>
                <span className="text-sm text-gray-500">PTS</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">Equal to ${pointsValue}</p>
            </div>

            {/* Redeem Points */}
            <div className="flex flex-col justify-center px-4">
              <p className="text-sm text-gray-500 mb-2">Redeem Points</p>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={redeemAmount}
                  onChange={(e) => setRedeemAmount(Number(e.target.value))}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center"
                />
                <span className="text-sm text-gray-500">pts</span>
              </div>
              <button
                onClick={handleRedeemPoints}
                disabled={isRedeeming || (user?.reward_points || 0) < 100}
                style={buttonStyle}
                className="px-4 py-2 rounded-full text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isRedeeming && <Loader2 className="w-4 h-4 animate-spin" />}
                Redeem Now
              </button>
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* My Promotion Codes Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Ticket className="w-5 h-5 text-gray-700" />
            My Promotion Codes
          </h3>

          {promotionCodes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Ticket className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No promotion codes yet</p>
              <p className="text-sm">Redeem your points to get discount codes!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {promotionCodes.map((promo, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors"
                  style={{
                    background: "linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="font-mono font-bold text-lg"
                      style={{ color: "#374151" }}
                    >
                      {promo.promotion_code}
                    </span>
                    <button
                      onClick={() => handleCopyCode(promo.promotion_code)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === promo.promotion_code ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  <p className="text-green-600 font-semibold">
                    -${promo.discount_value} off
                  </p>
                  {promo.end_date && (
                    <p className="text-xs text-gray-400 mt-1">
                      Expires: {new Date(promo.end_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buy VIP Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* VIP Benefits */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              {isVip ? "Your VIP Benefits" : "VIP Benefits"}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>6x Points</strong> on all purchases
                </span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Free Express Shipping</strong> on all orders
                </span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Exclusive Discounts</strong> up to 20% off
                </span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Priority Support</strong> 24/7 dedicated line
                </span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Birthday Gift</strong> special reward every year
                </span>
              </li>
            </ul>
          </div>

          {/* Buy VIP Card */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {isVip ? "You're a VIP!" : "Want more benefits?"}
            </h3>

            {isVip ? (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-10 h-10 text-yellow-500" />
                  <div>
                    <p className="font-bold text-gray-900">VIP Member</p>
                    <p className="text-sm text-gray-600">Enjoy all exclusive benefits</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Thank you for being a valued VIP member!
                </p>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="w-10 h-10 text-yellow-400" />
                  <div>
                    <p className="font-bold text-lg">Upgrade to VIP</p>
                    <p className="text-sm text-gray-300">14,400 points ($144 value)</p>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-4">
                  Your points: <strong>{user?.reward_points || 0}</strong> /{" "}
                  <strong>14,400</strong> needed
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-gray-700 rounded-full mb-4">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{
                      width: `${Math.min(((user?.reward_points || 0) / 14400) * 100, 100)}%`,
                    }}
                  />
                </div>

                <button
                  onClick={handleBuyVip}
                  disabled={isVip || isBuyingVip || (user?.reward_points || 0) < 14400}
                  className="w-full py-3 bg-yellow-400 text-gray-900 rounded-full font-bold hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isBuyingVip && <Loader2 className="w-5 h-5 animate-spin" />}
                  {isVip ? "Already VIP" : (user?.reward_points || 0) >= 14400 ? "Buy VIP Now": "Not Enough Points"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
