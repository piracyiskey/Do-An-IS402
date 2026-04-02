import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

const VerifiedEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const emailFromState = location.state?.email;

  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const [email] = useState(emailFromState || "");
  const [verificationCode, setVerificationCode] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [hasAutoSent, setHasAutoSent] = useState(false); // ✅ Track xem đã auto gửi chưa

  // Gửi mã xác thực qua email
  const handleSendCode = useCallback(async () => {
    if (!email || isResending || resendCooldown > 0) return;

    setIsResending(true);
    setMessage("");
    try {
      const response = await axios.post(`${API_BASE_URL}/send-code`, { email });
      if (response.data.sent) {
        setMessage("Verification code sent! Please check your inbox.");
        setResendCooldown(60);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to send code. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  }, [email, isResending, resendCooldown]);

  // ✅ Tự động gửi code KHI VỪA VÀO TRANG (chỉ 1 lần duy nhất)
  useEffect(() => {
    if (email && !hasAutoSent) {
      handleSendCode();
      setHasAutoSent(true); // ✅ Đánh dấu đã gửi rồi
    }
  }, [email, handleSendCode, hasAutoSent]);

  // Countdown cho resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(
        () => setResendCooldown(resendCooldown - 1),
        1000
      );
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Xác thực mã code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!email || !verificationCode || verificationCode.length !== 6) {
      setMessage("Please enter a valid 6-digit code");
      return;
    }

    setIsVerifying(true);
    setMessage("");
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-code`, {
        email,
        code: verificationCode,
      });

      if (response.data.verified) {
        setStatus("success");
        setMessage("Email verified successfully!");
      } else {
        setStatus("error");
        setMessage(response.data.message || "Verification failed");
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  // Xử lý input code (chỉ cho phép số)
  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(value);
  };

  const renderContent = () => {
    // Verify thành công
    if (status === "success") {
      return (
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Email Verified!
          </h2>
          <p className="text-gray-600 mb-8">{message}</p>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <p className="text-black">Continue to Login</p>
          </button>
        </div>
      );
    }

    // Verify thất bại
    if (status === "error") {
      return (
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Verification Failed
          </h2>
          <p className="text-gray-600 mb-8">{message}</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setStatus("pending");
                setVerificationCode("");
                setMessage("");
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <p className="text-black">Try Again</p>
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="block mx-auto px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Back to Sign Up
            </button>
          </div>
        </div>
      );
    }

    // Trạng thái pending - nhập mã xác thực
    return (
      <div className="text-center">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-12 h-12 text-blue-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Verify your email
        </h2>
        <p className="text-gray-600 mb-2">
          We&apos;ve sent a 6-digit verification code to:
        </p>
        <p className="text-blue-600 font-medium text-lg mb-6">
          {email || "your email address"}
        </p>

        <form onSubmit={handleVerifyCode} className="space-y-4">
          {/* Input mã 6 số */}
          <div>
            <input
              type="text"
              value={verificationCode}
              onChange={handleCodeChange}
              placeholder="Enter 6-digit code"
              className="w-full text-center text-2xl tracking-widest font-mono py-4 px-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              maxLength={6}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isVerifying || verificationCode.length !== 6}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : null}
            <p className="text-black">
              {isVerifying ? "Verifying..." : "Verify Email"}
            </p>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-3">
            Didn&apos;t receive the code?
          </p>
          <button
            onClick={handleSendCode}
            disabled={isResending || resendCooldown > 0 || !email}
            className="px-6 py-2 text-blue-600 hover:text-blue-700 transition font-medium disabled:opacity-50 flex items-center justify-center mx-auto gap-2"
          >
            {isResending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend Code"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 text-sm ${message.includes("sent") || message.includes("Sent") ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>
        )}

        <button
          onClick={() => navigate("/login")}
          className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
        >
          Back to Login
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gray-50 overflow-x-hidden">
      <Navbar isTransparent={false} />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 pt-24 pb-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {renderContent()}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VerifiedEmail;