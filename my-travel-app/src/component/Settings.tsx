import React, { useState } from "react";
import type { ChangePasswordDto } from "../dto/ChangePasswordDto";
import { changePasswordApiCall, getLoggedInUser } from "../service/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const logginUsername = getLoggedInUser();

  const [username, setUsername] = useState(logginUsername);
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const changePs: ChangePasswordDto = {
      username: logginUsername,
      password,
    };

    changePasswordApiCall(changePs)
      .then((res) => {
        console.log(res);
        toast.success("Settings saved!");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to save settings.");
      })
      .finally(() => setLoading(false));
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 text-[#8D6B4F] placeholder:text-[#B2945B] focus:outline-none focus:ring-2 focus:ring-[#B2945B] bg-white transition-all duration-200";

  return (
    <div className="space-y-6 bg-[#FAF7F0] min-h-screen p-8 rounded-2xl shadow-inner">
      <h2 className="text-3xl font-semibold text-[#B2945B] mb-6">Settings</h2>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#eae2d6] space-y-4">
        <h3 className="text-xl font-semibold text-[#8D6B4F]">Profile</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Username"
            disabled
            onChange={(e) => setUsername(e.target.value)}
            className={inputClass}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#eae2d6] space-y-4">
        <h3 className="text-xl font-semibold text-[#8D6B4F]">Change Password</h3>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Notifications Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-[#eae2d6] flex items-center justify-between">
        <span className="text-[#8D6B4F] font-medium">Email Notifications</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#B2945B] peer-focus:ring-4 peer-focus:ring-[#B2945B]/50 transition-all duration-300"></div>
          <span className="ml-3 text-[#8D6B4F]">
            {notifications ? "On" : "Off"}
          </span>
        </label>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-[#B2945B] text-white px-8 py-3 rounded-xl shadow-md hover:bg-[#8D6B4F] hover:scale-[1.02] transition-all duration-300"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* ✅ Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
