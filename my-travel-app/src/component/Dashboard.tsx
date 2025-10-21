import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, logoutApiCall } from "../service/AuthService";

export default function Dashboard() {
  const navigator = useNavigate();
  const loginUser = getLoggedInUser();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const logoutHandler = () => {
    logoutApiCall();
    navigator("/login");
    window.location.reload();
  };

  const primaryColor = "#B2945B";
  const primaryBg = "#B2945B";
  const softBg = "#FAF7F0";

  return (
    <div className="flex h-screen" style={{ backgroundColor: softBg }}>
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } text-white flex flex-col p-6 transition-all duration-300 ease-in-out shadow-lg`}
        style={{ backgroundColor: primaryBg }}
      >
        {/* Header & Toggle */}
        {/* Header & Toggle */}
<div className="flex justify-between items-center mb-8">
  <h2
    className={`text-2xl font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${
      isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
    }`}
  >
    TravelGuide
  </h2>

  <button
    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg text-primary transition-all duration-300 transform hover:scale-110"
    title={isSidebarOpen ? "Collapse" : "Expand"}
  >
    <span
      className={`text-xl font-bold text-[#B2945B] transition-transform duration-300 ${
        isSidebarOpen ? "" : "rotate-180"
      }`}
    >
      »
    </span>
  </button>
</div>


        {/* Navigation */}
        <nav className="flex-1 space-y-4">
          {[
            { name: "Overview", icon: "📊", path: "overview" },
            { name: "Create Category", icon: "➕", path: "create-category" },
            { name: "Create Destination", icon: "🌍", path: "create-destination" },
            { name: "Manage Destinations", icon: "📍", path: "manage-destinations" },
            { name: "Settings", icon: "⚙️", path: "settings" },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 px-3 py-2 hover:bg-white/20 rounded transition"
            >
              <span>{link.icon}</span>
              {isSidebarOpen && <span>{link.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="mt-auto">
          <button
            onClick={logoutHandler}
            className={`flex items-center justify-center w-full rounded-lg px-3 py-2 transition font-semibold ${
              isSidebarOpen ? "" : "w-10 h-10 mx-auto"
            }`}
            style={{ backgroundColor: "white", color: primaryBg }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FAF7F0")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
          >
            <span className="text-lg">⏻</span>
            {isSidebarOpen && <span className="ml-2">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 px-6 py-4 rounded-xl shadow bg-white">
          <h1 className="text-2xl md:text-3xl font-bold" style={{ color: primaryColor }}>
            ✨ Dashboard
          </h1>
          <div className="flex items-center space-x-3">
            <div className={`text-right hidden sm:block ${!isSidebarOpen && "mr-2"}`}>
              <p className="font-semibold text-gray-800">{loginUser}</p>
              <p className="text-sm text-gray-500">Welcome back</p>
            </div>
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full font-bold shadow"
              style={{ backgroundColor: "#FAF7F0", color: primaryColor }}
            >
              {loginUser?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
