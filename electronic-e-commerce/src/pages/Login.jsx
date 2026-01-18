import { useState } from "react";
import { HelpCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginWithGoogle } from "../lib/googleAuth";
import { isauthenticated } from "../lib/api";
import { useLayoutEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: email, 2: password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useLayoutEffect(() => {
    const checkAuth = async () => {
      const auth = await isauthenticated();
      console.log("is authenticated:", auth);
      if (auth) {
        navigate("/");
      }
    };
    checkAuth();
  });
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
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
    if (!password) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`,
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      if (response.data.success) {
        // Lưu tokens vào localStorage
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        // Lưu email nếu remember me
        if (rememberMe) {
          localStorage.setItem("remembered_email", email);
        } else {
          localStorage.removeItem("remembered_email");
        }

        // Lấy thông tin user và lưu vào localStorage
        try {
          const userResponse = await axios.get(`${API_BASE_URL}/auth/user`, {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
            },
          });
          // API trả về { success: true, data: {...user} }
          const userData = userResponse.data.data || userResponse.data;
          localStorage.setItem("user", JSON.stringify(userData));
        } catch {
          // Nếu không lấy được user info, vẫn cho đăng nhập
          localStorage.setItem("user", JSON.stringify({ email }));
        }

        // Dispatch event để Navbar cập nhật
        window.dispatchEvent(new Event("loginSuccess"));

        // Chuyển về trang chủ
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.message === "Email not verified") {
        setError("Email not verified. Please verify your email first.");
        // Có thể redirect đến trang verify
        setTimeout(() => {
          navigate("/verified_email", { state: { email } });
        }, 2000);
      } else {
        setError(
          error.response?.data?.message || "Invalid email or password"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load remembered email on mount
  useState(() => {
    const rememberedEmail = localStorage.getItem("remembered_email");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);



  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col">
      {/* Top Navigation/Header */}
      <nav className="p-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <ul className="flex justify-between items-center">
            <li className="text-xl font-semibold text-gray-800">
              Samsung Account
            </li>
            <li className="text-gray-500 hover:text-gray-800 cursor-pointer transition">
              <HelpCircle className="w-6 h-6" />
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex justify-center pt-20 pb-10 flex-grow">
        <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-lg">
          {/* Title Section */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-normal text-center mb-2">
              One account. Any device.
            </h2>
            <p className="text-base text-gray-600">Just for you.</p>
            <p className="text-sm text-gray-400 mt-1">Sign in to get started</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleEmailSubmit}>
              <div>
                <div className="relative border-b border-gray-300 focus-within:border-gray-900">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                    className="block w-full appearance-none bg-transparent pt-3 pb-1 focus:outline-none peer"
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-0 left-0 pt-1 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                  >
                    Email address
                  </label>
                </div>
              </div>

              <div className="flex items-center mt-2">
                <input
                  id="remember-id"
                  name="remember-id"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 appearance-none rounded-full border border-gray-300 checked:bg-blue-600 checked:border-blue-600 checked:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22white%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M16.707%205.293a1%201%200%20010%201.414l-8%208a1%201%200%2001-1.414%200l-4-4a1%201%200%20011.414-1.414L8%2012.586l7.293-7.293a1%201%200%20011.414%200z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] checked:bg-center checked:bg-no-repeat cursor-pointer"
                />
                <label
                  htmlFor="remember-id"
                  className="ml-2 block text-sm text-gray-600"
                >
                  Remember my ID
                </label>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] transition duration-150 ease-in-out"
              >
                <p className="text-white">Next</p>
              </button>
            </form>
          )}

          {/* Step 2: Password */}
          {step === 2 && (
            <form className="space-y-6" onSubmit={handleLogin}>
              <div className="text-sm text-gray-600 mb-4">
                Signing in as:{" "}
                <span className="font-medium text-blue-600">{email}</span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="ml-2 text-blue-600 hover:underline"
                >
                  Change
                </button>
              </div>

              <div>
                <div className="relative border-b border-gray-300 focus-within:border-gray-900">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                    className="block w-full appearance-none bg-transparent pt-3 pb-1 pr-10 focus:outline-none peer"
                  />
                  <label
                    htmlFor="password"
                    className="absolute top-0 left-0 pt-1 text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 hover:scale-[1.01] transition duration-150 ease-in-out disabled:opacity-50"
              >
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                <p className="text-white">{isLoading ? "Signing in..." : "Sign In"}</p>
              </button>
            </form>
          )}

          {/* Links Section */}
          <div className="space-y-2 mt-8 text-left">
            <Link
              to="/find-id"
              className="block text-sm text-black hover:text-blue-800 cursor-pointer transition duration-150 w-fit"
            >
              <p className="text-black hover:underline">Find ID</p>
            </Link>

            <Link
              to="/signup"
              className="block text-sm text-black hover:text-blue-800 cursor-pointer transition duration-150 w-fit"
            >
              <p className="text-black hover:underline">Create account</p>
            </Link>
          </div>

          {/* Sign in with Google Button */}
          <div className="mt-8">
            <button
              type="button"
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out hover:scale-[1.01]"
              onClick={handleGoogleLogin}
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google logo"
                className="w-4 h-4 mr-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/16x16/cccccc/000000?text=G";
                }}
              />
              Sign in with Google
            </button>
          </div>


        </div>
      </div>

      {/* Footer Section */}
      <footer className="w-full bg-gray-100 pb-4 pt-8">
        <div className="max-w-7xl mx-auto px-4 text-xs text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-end">
            <div className="flex flex-wrap space-x-4 mb-2 md:mb-0">
              <a href="#" className="hover:underline">
                Terms and Conditions
              </a>
              <a href="#" className="hover:underline">
                Samsung account Privacy Notice
              </a>
              <a href="#" className="hover:underline">
                Notice
              </a>
              <a href="#" className="hover:underline">
                Contact us
              </a>
            </div>

            <div className="text-right mt-2 md:mt-0 flex flex-col gap-2">
              <p className="font-extrabold text-xl">Samsung Account</p>
              <p className="whitespace-nowrap">
                Copyright &copy; 1995-2025 All right serve
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
