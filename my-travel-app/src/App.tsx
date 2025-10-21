import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import AboutUs from "./component/AboutUs";
import Destination from "./component/Destination";
import { isGuide, isLogin, isTraveller } from "./service/AuthService";
import Dashboard from "./component/Dashboard";
import DestinationPlaces from "./component/DestinationPlaces";
import BookingForm from "./component/BookinForm";
import MyTrips from "./component/MyTrips";
import Overview from "./component/Overview";
import CreateCategory from "./component/CreateCategory";
import CreateDestination from "./component/CreateDestination";
import ManageDestinations from "./component/ManageDestinations";
import CreatePlaces from "./component/CreatePlaces";
import Settings from "./component/Settings";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Register from "./component/Register";
import PayMent from "./component/PayMent";

function AppContent() {
  const beTraveller = isTraveller();
  const beLogin = isLogin();
  const beGuide = isGuide();
  const location = useLocation();

  // ✅ hide Navbar/Footer in dashboard, login, register
  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/destination-places/:id" element={<DestinationPlaces />} />
        <Route path="/book/:id" element={<BookingForm />} />
        <Route path="/my-trips" element={<MyTrips />} />
        {/* <Route path="/payment/:id" element={<PayMent />} /> */}

        {/* Dashboard + nested routes */}
        <Route
          path="/dashboard"
          element={ <Dashboard />}
        >
          <Route path="overview" element={<Overview />} />
          {beGuide && (
            <Route path="create-category" element={<CreateCategory />} />
          )}
          <Route path="create-destination" element={<CreateDestination />} />
          <Route path="manage-destinations" element={<ManageDestinations />} />
          <Route path="create-places/:id" element={<CreatePlaces />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
