import { useState, useEffect } from "react";
import { HelpCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../lib/googleAuth";
import api from "../lib/api";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ FIXED: Load remembered email correctly
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("remembered_email");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLoading) return; // ✅ Prevent double click

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      if (response.data.success) {
        // Check if user is already logged in
        if (response.data.redirect) {
          // User is already authenticated, redirect them
          const returnUrl = localStorage.getItem("returnUrl") || response.data.redirect || "/";
          localStorage.removeItem("returnUrl");
          navigate(returnUrl);
          return;
        }

        // Save remembered email
        if (rememberMe) {
          localStorage.setItem("remembered_email", email);
        } else {
          localStorage.removeItem("remembered_email");
        }

        // Dispatch login event
        window.dispatchEvent(new Event("loginSuccess"));

        // Get return URL safely
        const returnUrl = localStorage.getItem("returnUrl") || "/";
        localStorage.removeItem("returnUrl");

        navigate(returnUrl);
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (error) {
      if (error.response?.data?.message === "Email not verified") {
        setError("Email not verified. Please verify your email first.");

        setTimeout(() => {
          navigate("/verified_email", { state: { email } });
        }, 1500);
      } else {
        setError(
          error.response?.data?.message ||
            "Request failed. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <nav className="p-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="text-xl font-semibold text-gray-800">
            Samsung Account
          </span>
          <HelpCircle className="w-6 h-6 text-gray-500 cursor-pointer" />
        </div>
      </nav>

      {/* Content */}
      <div className="flex justify-center pt-20 pb-10 flex-grow">
        <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-lg">

          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-2xl mb-2">One account. Any device.</h2>
            <p className="text-gray-600">Just for you.</p>
            <p className="text-sm text-gray-400 mt-1">
              Sign in to get started
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Step 1 */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-black"
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm text-gray-600">
                  Remember my ID
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Next
              </button>
            </form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="text-sm text-gray-600">
                Signing in as{" "}
                <span className="font-medium text-blue-600">
                  {email}
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="ml-2 text-blue-600 underline"
                >
                  Change
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full border-b border-gray-300 py-2 pr-10 focus:outline-none focus:border-black"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-0 top-2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isLoading && <Loader2 className="animate-spin" size={18} />}
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}

          {/* Links */}
          <div className="mt-8 space-y-2 text-sm">
            <Link to="/find-id" className="block hover:underline">
              Find ID
            </Link>
            <Link to="/signup" className="block hover:underline">
              Create account
            </Link>
          </div>

          {/* Google Login */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 border rounded-lg hover:bg-gray-100 transition"
            >
              Sign in with Google
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}