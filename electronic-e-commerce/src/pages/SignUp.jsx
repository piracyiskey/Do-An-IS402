import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      month: "",
      day: "",
      year: "",
      zipCode: ""
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: ''
  });
  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com','atomicmail.io', 'gamintor.com','m3player.com','gm.uit.edu.vn'];
    
    if (!email) {
      return "Email is required";
    }
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    
    const domain = email.split('@')[1];
    if (!validDomains.includes(domain)) {
      return "Please use a valid email provider (Gmail, Yahoo, Outlook, Hotmail, or iCloud)";
    }
    
    return "";
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    let label = '';
    let color = '';

    if (score <= 2) {
      label = 'Weak';
      color = 'bg-red-500';
    } else if (score <= 4) {
      label = 'Medium';
      color = 'bg-yellow-500';
    } else {
      label = 'Strong';
      color = 'bg-green-500';
    }

    return { score, label, color };
  };

  // Password validation
  const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*)";
    }
    return "";
  };

  // Name validation
  const validateName = (name, field) => {
    if (!name) {
      return `${field} is required`;
    }
    if (name.length < 2) {
      return `${field} must be at least 2 characters`;
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return `${field} must contain only letters`;
    }
    return "";
  };

  // Date validation
  const validateDate = () => {
    if (!formData.month || !formData.day || !formData.year) {
      return "Complete date of birth is required";
    }
    
    const birthDate = new Date(formData.year, formData.month - 1, formData.day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    if (age < 13) {
      return "You must be at least 13 years old to create an account";
    }
    
    return "";
  };

  // ZIP code validation
  const validateZipCode = (zipCode) => {
    if (!zipCode) {
      return "ZIP code is required";
    }
    if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
      return "Please enter a valid ZIP code (5 digits)";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({...errors, [name]: ""});
    }

    // Real-time password strength check
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  // ============================================================ Gui submit form den backend ================================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    
    newErrors.email = validateEmail(formData.email);
    newErrors.password = validatePassword(formData.password);
    newErrors.firstName = validateName(formData.firstName, "First name");
    newErrors.lastName = validateName(formData.lastName, "Last name");
    newErrors.dateOfBirth = validateDate();
    newErrors.zipCode = validateZipCode(formData.zipCode);
    
    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Filter out empty errors
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([ _, value]) => value !== "")
    );
    
    setErrors(filteredErrors);
    
    // If there are errors, don't submit
    if (Object.keys(filteredErrors).length > 0) {
      setMessage("Please fix the errors before submitting");
      return;
    }
    
    setIsLoading(true);
    setMessage("");

    try {
      // Gọi API POST /register theo đúng format backend
      const response = await axios.post(`${API_BASE_URL}/register`, {
        full_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      if (response.data.success) {
        setMessage(
          "Account created successfully! Please check your email to verify."
        );

        // Chuyển đến trang xác nhận email với email đã đăng ký
        setTimeout(() => {
          navigate("/verified_email", { state: { email: formData.email } });
        }, 1500);
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      
      if (error.response?.data?.data) {
        // Xử lý validation errors từ Laravel
        const serverErrors = error.response.data.data;
        const mappedErrors = {};
        const errorMessages = [];
        
        if (serverErrors.email) {
          mappedErrors.email = serverErrors.email[0];
          errorMessages.push(serverErrors.email[0]);
        }
        if (serverErrors.password) {
          mappedErrors.password = serverErrors.password[0];
          errorMessages.push(serverErrors.password[0]);
        }
        if (serverErrors.full_name) {
          mappedErrors.firstName = serverErrors.full_name[0];
          errorMessages.push(serverErrors.full_name[0]);
        }
        if (serverErrors.password_confirmation) {
          mappedErrors.confirmPassword = serverErrors.password_confirmation[0];
          errorMessages.push(serverErrors.password_confirmation[0]);
        }
        
        setErrors(mappedErrors);
        setMessage(errorMessages.length > 0 ? errorMessages.join(", ") : "Validation errors");
      } else if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error creating account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
// ============================================================ Gui submit form den backend ================================================================

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen w-screen">
      <nav className="p-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <ul className="flex justify-between items-center">
            <li className="text-xl font-semibold text-gray-800">
              Samsung Account
            </li>
            <li className="text-gray-500 hover:text-gray-800 cursor-pointer">
              <div className="w-6 h-6 border rounded-full bg-white flex items-center justify-center text-xs">
                ?
              </div>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className='flex flex-col items-center pt-20 pb-10'>
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg w-full max-w-md mt-6 mb-12">
          <h2 className="text-2xl font-normal text-center mb-6">Create your Samsung account</h2>
          
          {message && (
            <div className={`p-3 mb-4 rounded ${message.includes('Error') || message.includes('fix') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none py-2 text-base`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div> {/* Container cha chung */}
              <div className="relative"> {/* Container RIÊNG cho input và icon để định vị */}
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full border-b ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none py-2 text-base pr-10`}
                />
                <span 
                  className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.632-2.147A.75.75 0 0112 9c.928 0 1.776.23 2.534.625l3.527 3.527m-.574 3.56A10.05 10.05 0 0021 12c-1.275-4.057-5.065-7-9.543-7a9.97 9.97 0 00-4.029.704" />
                    </svg>
                  )}
                </span>
              </div>
              
              {/* Đưa phần hiển thị lỗi và thanh độ mạnh mật khẩu ra ngoài div relative của input */}
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded">
                      <div 
                        className={`h-full rounded transition-all ${passwordStrength.color}`}
                        style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{passwordStrength.label}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Password must contain: 8+ characters, uppercase, lowercase, number, and special character
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full border-b ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none py-2 text-base pr-10`}
                />
                <span 
                  className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.632-2.147A.75.75 0 0112 9c.928 0 1.776.23 2.534.625l3.527 3.527m-.574 3.56A10.05 10.05 0 0021 12c-1.275-4.057-5.065-7-9.543-7a9.97 9.97 0 00-4.029.704" />
                    </svg>
                  )}
                </span>
              </div>
              {/* Đưa lỗi confirm password ra ngoài div relative */}
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* First Name Field */}
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full border-b ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none py-2 text-base mt-2`}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>

            {/* Last Name Field */}
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full border-b ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none py-2 text-base mt-2`}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
            
            {/* Date of Birth Field */}
            <div className="pt-2">
              <div className="flex space-x-2">
                <select 
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className={`w-1/3 border-b ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none py-2 text-base text-gray-500`}
                >
                  <option value="">Month</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
                <select 
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className={`w-1/3 border-b ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none py-2 text-base text-gray-500`}
                >
                  <option value="">Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <select 
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-1/3 border-b ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none py-2 text-base text-gray-500`}
                >
                  <option value="">Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
            </div>
            
            {/* ZIP Code Field */}
            <div>
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP code"
                value={formData.zipCode}
                onChange={handleChange}
                maxLength="10"
                className={`w-full border-b ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:outline-none py-2 text-base mt-2`}
              />
              {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center pt-8 space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={isLoading}
                className="w-40 h-12 py-3 border-b rounded-md border border-gray-300 bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-40 h-12 py-3 border-b rounded-md bg-blue-500 text-white hover:bg-blue-600 transition disabled:opacity-50 flex items-center justify-center"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <p className='text-black'>Next</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <footer className="w-full bg-gray-100 pb-4 pt-8">
        <div className="max-w-7xl mx-auto px-4 text-xs text-gray-500">
          <div className="flex flex-col md:flex-row justify-between items-end">
            <div className="flex flex-wrap space-x-4 mb-2 md:mb-0">
                <p className="hover:underline cursor-pointer">Terms and Conditions</p>
                <p className="hover:underline cursor-pointer">Samsung account Privacy Notice</p>
                <p className="hover:underline cursor-pointer">Notice</p>
                <p className="hover:underline cursor-pointer">Contact us</p>
            </div>
            <div className="text-right mt-2 md:mt-0 flex flex-col gap-2">
                <p className="font-extrabold text-xl">Samsung Account</p>
                <p className="whitespace-nowrap">Copyright &copy; 1995-2025 All right serve</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUp;