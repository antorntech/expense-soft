import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  // State Management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Toggle password visibility
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Input field validation logic
  const validateField = (fieldName, value) => {
    let errorMessage = "";
    switch (fieldName) {
      case "email":
        if (!value) errorMessage = "Email is required.";
        break;
      case "password":
        if (!value) errorMessage = "Password is required.";
        else if (value.length < 6)
          errorMessage = "Password must be at least 6 characters.";
        break;
      default:
        break;
    }
    return errorMessage;
  };

  // Form-level validation
  const validateForm = () => {
    const emailError = validateField("email", email);
    const passwordError = validateField("password", password);
    return {
      ...(emailError && { email: emailError }),
      ...(passwordError && { password: passwordError }),
    };
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const formErrors = validateForm();
    if (Object.keys(formErrors).length !== 0) {
      setErrors(formErrors);
      return;
    }

    try {
      if (email === "admin@gmail.com" && password === "admin123") {
        localStorage.setItem("user", JSON.stringify({ email }));
        window.location.href = "/";
      } else {
        toast.error("Invalid email or password", { autoClose: 1000 });
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle input changes and clear errors on typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "email" ? setEmail(value) : setPassword(value);
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#F8F8FB] p-5">
      {/* Login Container */}
      <div className="w-full max-w-[450px] mx-auto bg-white rounded-md shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-start bg-[#425194] p-3 rounded-t-md">
          <div className="w-full md:w-1/2">
            <h2 className="text-white text-lg font-semibold">Welcome Back!</h2>
            <p className="text-white text-sm">
              Login to continue to Expense-Soft.
            </p>
            <p className="text-md font-normal mt-2">Email: admin@gmail.com</p>
            <p className="text-md font-normal">Password: admin123</p>
          </div>
          <div className="hidden md:w-1/2 md:block">
            <img
              src="./profile-img.png"
              alt="Profile"
              className="w-full object-contain"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="px-3 md:px-5 pt-4">
          <form onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="relative mb-4">
              <label htmlFor="email" className="block mb-1 font-normal">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:border-[#425194] focus:ring-[#199bff]/10"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-800 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative mb-4">
              <label htmlFor="password" className="block mb-1 font-normal">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-300 rounded-md focus:border-[#425194] focus:ring-[#199bff]/10"
                  placeholder="Enter your password"
                />
                <i
                  className={`absolute right-3 top-3 cursor-pointer text-gray-600 fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={toggleShowPassword}
                ></i>
              </div>
              {errors.password && (
                <p className="text-red-800 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 bg-[#425194] text-white rounded-md hover:bg-[#2f407a] transition duration-500"
            >
              Log In
            </button>
          </form>
          {/* Footer */}
          <div className="my-6 text-center">
            <p className="text-gray-600 text-md pt-2">
              © Expense-Soft. Crafted by ANTOR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
