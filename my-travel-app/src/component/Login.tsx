import React from "react";
import {
  loginApiCall,
  setLoggedInUser,
  setLoggedInUserRole,
  setToken,
} from "../service/AuthService";
import Mandalay from "../assets/images/AirBalloon.jpg";
import type { LoginDto } from "../dto/LoginDto";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigator = useNavigate();

  const loginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const login: LoginDto = { username, password };

    loginApiCall(login)
      .then((res) => {
        const token = "Basic " + btoa(username + ":" + password);
        setToken(token);
        setLoggedInUser(login.username);
        setLoggedInUserRole(res.data);
        setUsername("");
        setPassword("");

        toast.success("✅ Login successful!", { position: "top-center" });

        if (res.data === "ROLE_GUIDE") {
          navigator("/dashboard/overview");
        } else {
          navigator("/");
        }

        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(() => {
        toast.error("❌ Invalid username or password!", { position: "top-center" });
      });
  };

  const primaryColor = "text-[#B2945B]";
  const primaryBg = "bg-[#B2945B]";
  const primaryBgHover = "hover:bg-[#8D6B4F]";
  const softBg = "bg-[#FAF7F0]";

  return (
    <div
      className="min-h-screen flex relative bg-cover bg-center font-sans"
      style={{ backgroundImage: `url(${Mandalay})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Left Section */}
      <div className="relative z-10 md:w-1/2 flex flex-col justify-center items-center md:items-start p-12 text-center md:text-left text-white">
        <h2 className="font-['Playfair_Display'] text-xl mb-2">Travel Guide</h2>
        <h1
          className={`font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold ${primaryColor} mb-6 tracking-wide drop-shadow-lg`}
        >
          Myanmar
        </h1>
        <p className="max-w-md text-gray-200 drop-shadow-md">
          From the floating gardens and stilt-house villages in Inle Lake to the
          temples of Bagan, discover undiscovered Myanmar.
        </p>
      </div>

      {/* Right Section (Login Card) */}
      <div className="relative z-10 md:w-1/2 flex justify-center items-center p-8">
        <div
          className={`w-full max-w-md ${softBg} backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/40`}
        >
          <h2 className={`text-2xl font-semibold text-center ${primaryColor} mb-8`}>
            Login to Continue
          </h2>

          <form onSubmit={loginSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-[#8D6B4F] mb-1 font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#B2945B] 
                           bg-white/80 text-[#B2945B] placeholder:text-[#B2945B]"
                placeholder="Enter your username"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[#8D6B4F] mb-1 font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-[#B2945B] 
                           bg-white/80 text-[#B2945B] placeholder:text-[#B2945B]"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-3 rounded-lg ${primaryBg} text-white font-semibold shadow-lg ${primaryBgHover} transition-all duration-300 hover:scale-[1.02]`}
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-700">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#8D6B4F] hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Toast container for feedback */}
      <ToastContainer />
    </div>
  );
}
