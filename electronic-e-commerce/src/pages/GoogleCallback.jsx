import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleGoogleCallback } from "../lib/googleAuth";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function processGoogleCallback() {
      try {
        const res = await handleGoogleCallback();
        
        if (!res.data.success) {
          console.error("Google callback failed:", res.data.error);
          navigate("/login", { replace: true });
          return;
        }
        
        // Save tokens and user data
        if (res.data.access_token) {
          localStorage.setItem("access_token", res.data.access_token);
        }
        if (res.data.refresh_token) {
          localStorage.setItem("refresh_token", res.data.refresh_token);
        }
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }
        
        // Clear OAuth state
        sessionStorage.removeItem('oauth_state');
        
        // Dispatch login success event
        window.dispatchEvent(new Event("loginSuccess"));
        
        // Navigate to return URL or home
        const returnUrl = localStorage.getItem("returnUrl") || "/";
        localStorage.removeItem("returnUrl");
        navigate(returnUrl, { replace: true });
        
      } catch (error) {
        console.error("Google callback error:", error);
        alert("Failed to sign in with Google: " + error.message);
        navigate("/login", { replace: true });
      }
    }

    processGoogleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-gray-600 text-sm">
          Signing you in with Google...
        </p>
      </div>
    </div>
  );
}
