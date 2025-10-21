import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  getLoggedInUser,
  isGuide,
  isLogin,
  isSiteOwner,
  isTraveller,
  logoutApiCall,
} from "../service/AuthService";

export default function Navbar() {
  const navigator = useNavigate();
  const traveller = isTraveller();
  const guide = isGuide();
  const owner = isSiteOwner();
  const beLoggin = isLogin();
  const logginUsername = getLoggedInUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = () => {
    logoutApiCall();
    navigator("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md font-inter">
  <div className="container mx-auto px-6 md:px-12 flex justify-between items-center py-4">
    {/* Logo */}
    <div
      className="flex items-center space-x-2 cursor-pointer select-none"
      onClick={() => navigator("/")}
    >
      <h1 className="font-extrabold text-2xl md:text-3xl text-gray-800 tracking-tight">
        Travel<span className="text-[#B2945B]">Guide</span>
      </h1>
    </div>

    {/* Desktop Nav */}
    <div className="hidden md:flex items-center space-x-6">
      <nav className="flex items-center space-x-8 text-gray-700 font-medium">
        {/* Nav Links: Dark Gold/Bronze hover color ကို သုံးသည်။ */}
        <Link to="/" className="hover:text-[#B2945B] transition">Home</Link>
        {beLoggin && (
          <Link to="/destination" className="hover:text-[#B2945B] transition">Packages</Link>
        )}
        <Link to="/aboutUs" className="hover:text-[#B2945B] transition">About Us</Link>
      </nav>

      {/* Role-based buttons */}
      {beLoggin && traveller && (
        <Link
          to="/my-trips"
          // Button: Warm Terracotta/Brown ကို သုံးသည်။
          className="px-4 py-2 rounded-full bg-[#8D6B4F] text-white font-medium hover:bg-[#7D5F4A] transition shadow"
        >
          My Trips
        </Link>
      )}
      {beLoggin && guide && (
        <button
          onClick={() => navigator("/dashboard/overview")}
          // Button: Warm Terracotta/Brown ကို သုံးသည်။
          className="px-4 py-2 rounded-full bg-[#8D6B4F] text-white font-medium hover:bg-[#7D5F4A] transition shadow"
        >
          Guide Panel
        </button>
      )}
      {beLoggin && owner && (
        <button
          onClick={() => navigator("/admin")}
          // Button: Warm Terracotta/Brown ကို သုံးသည်။
          className="px-4 py-2 rounded-full bg-[#8D6B4F] text-white font-medium hover:bg-[#7D5F4A] transition shadow"
        >
          Admin
        </button>
      )}

      {/* Login / Logout (Logout button color ကို မူလအတိုင်းထားပြီး Login ကို ပိုမိုနွေးထွေးသော border နှင့် ပြောင်းသည်) */}
      {beLoggin ? (
        <button
          onClick={logoutHandler}
          className="px-4 py-2 border border-gray-300 text-red-500 rounded-full font-medium hover:bg-red-500 hover:text-white transition"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigator("/login")}
          // Login: နွေးထွေးသော အဖြူ/မီးခိုးဖျော့ (Light Accent) border နှင့် hover background ကို သုံးသည်။
          className="px-4 py-2 border border-[#EBE3D0] text-gray-700 rounded-full font-medium hover:bg-[#FAF7F0] transition"
        >
          Login
        </button>
      )}

      {/* Avatar initials */}
      {beLoggin && (
        <div 
          // Avatar Background ကို Light Accent သို့ ပြောင်းသည်။
          className="flex items-center space-x-2 px-3 py-2 rounded-full bg-[#FCF5E3] shadow-sm"> 
          <div 
            // Avatar Circle Color ကို Warm Terracotta/Brown သို့ ပြောင်းသည်။
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#8D6B4F] text-white font-semibold">
            {logginUsername.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium text-gray-700">{logginUsername}</span>
        </div>
      )}
    </div>

    {/* Mobile Menu Button (မပြောင်းလဲပါ) */}
    <button
      className="md:hidden text-3xl text-gray-700"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      ☰
    </button>
  </div>

  {/* Mobile Nav */}
  {menuOpen && (
    <div className="md:hidden bg-white shadow border-t">
      <ul className="space-y-3 px-6 py-4 text-gray-700 font-medium">
        {/* Nav Links: Dark Gold/Bronze hover color ကို သုံးသည်။ */}
        <li><Link to="/" className="block hover:text-[#B2945B]">Home</Link></li>
        {beLoggin && (
          <li><Link to="/destination" className="block hover:text-[#B2945B]">Packages</Link></li>
        )}
        <li><Link to="/aboutUs" className="block hover:text-[#B2945B]">About Us</Link></li>

        {beLoggin && traveller && (
          <li>
            <Link
              to="/my-trips"
              // Button: Warm Terracotta/Brown ကို သုံးသည်။
              className="block bg-[#8D6B4F] text-white px-4 py-2 rounded-md text-center hover:bg-[#7D5F4A] transition"
            >
              My Trips
            </Link>
          </li>
        )}
        {beLoggin && guide && (
          <li>
            <Link
              to="/dashboard/overview"
              // Button: Warm Terracotta/Brown ကို သုံးသည်။
              className="block bg-[#8D6B4F] text-white px-4 py-2 rounded-md text-center hover:bg-[#7D5F4A] transition"
            >
              Guide Panel
            </Link>
          </li>
        )}
        {beLoggin && owner && (
          <li>
            <Link
              to="/admin"
              // Button: Warm Terracotta/Brown ကို သုံးသည်။
              className="block bg-[#8D6B4F] text-white px-4 py-2 rounded-md text-center hover:bg-[#7D5F4A] transition"
            >
              Admin
            </Link>
          </li>
        )}
        {beLoggin ? (
          <li>
            <button
              onClick={logoutHandler}
              className="w-full text-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/login"
              
              className="block border border-[#EBE3D0] rounded-md px-4 py-2 text-center hover:bg-[#FAF7F0]"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </div>
  )}
</header>
  );
}
