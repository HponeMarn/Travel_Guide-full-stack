import React, { useEffect, useState } from "react";
import {
  acceptBooking,
  getBookingByGuideName,
  getDestinationByGuideName,
  getGuideNetWorth,
  rejectBooking,
} from "../service/TravelAppService";
import type { BookingResponse } from "../dto/BookingResponse";
import type { DestinationDto } from "../dto/DestinationDto";
import { getLoggedInUser } from "../service/AuthService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Overview() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [destinations, setDestinations] = useState<DestinationDto[]>([]);
  const [netWorth, setNetWorth] = useState<number>(0);
  const username = getLoggedInUser();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (username) {
      fetchBookingByGuideName(username);
      fetchAllDestinations(username);
      getNetWorth(username);
    }
  }, [username]);

  const getNetWorth = (username: string) => {
    getGuideNetWorth(username)
      .then((res) => setNetWorth(res.data.netWorth))
      .catch((err) => console.error(err));
  };

  const fetchBookingByGuideName = (username: string) => {
    getBookingByGuideName(username)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  };

  const fetchAllDestinations = (username: string) => {
    getDestinationByGuideName(username)
      .then((res) => setDestinations(res.data))
      .catch((err) => console.error(err));
  };

  const rejectStatus = (id: number) => {
    rejectBooking(id)
      .then(() => fetchBookingByGuideName(username!))
      .catch((err) => console.error(err));
  };

  const acceptStatus = (id: number) => {
    acceptBooking(id)
      .then(() => fetchBookingByGuideName(username!))
      .catch((err) => console.error(err));
  };

  const destinationCount = destinations.length;
  const totalBookings = bookings.length;

  // 🧭 Prepare chart data (example: count bookings by destination title)
  const chartData = destinations.map((dest) => {
    const count = bookings.filter((b) => b.title === dest.title).length;
    return {
      name: dest.title,
      bookings: count,
    };
  });

  return (
    <div className="space-y-6 mt-8 px-6">
      <h2 className="text-3xl font-bold text-[#8D6B4F] mb-4">Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Destinations", value: destinationCount },
          { title: "Total Bookings", value: totalBookings },
          { title: "Earned", value: netWorth.toLocaleString() + " USD" },
          { title: "Pending Reviews", value: 12 },
        ].map((card) => (
          <div
            key={card.title}
            className="p-6 rounded-xl shadow flex flex-col items-start"
            style={{ backgroundColor: "#FAF7F0" }}
          >
            <h3 className="text-[#8D6B4F] font-medium">{card.title}</h3>
            <span className="text-3xl font-bold text-[#B2945B]">
              {card.value}
            </span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div
        className="p-6 rounded-xl shadow"
        style={{ backgroundColor: "#FAF7F0" }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-center text-[#8D6B4F]">
          Recent Bookings
        </h3>
        <div className="max-h-64 overflow-y-auto">
          <table className="w-full text-left border-collapse">
            <thead style={{ backgroundColor: "#B2945B", color: "#FAF7F0" }}>
              <tr>
                {[
                  "ID",
                  "Traveller",
                  "Package",
                  "Count",
                  "Date",
                  "Status",
                  "",
                ].map((th) => (
                  <th
                    key={th}
                    className="py-2 px-4 text-center font-medium"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking.bookingId}
                  className="border-b hover:bg-[#E8DAB7]"
                >
                  <td className="py-2 px-4 text-center text-[#8D6B4F]">
                    {booking.bookingId}
                  </td>
                  <td className="py-2 px-4 text-center text-[#8D6B4F]">
                    {booking.username}
                  </td>
                  <td className="py-2 px-4 text-center text-[#8D6B4F]">
                    {booking.title}
                  </td>
                  <td className="py-2 px-4 text-center text-[#8D6B4F]">
                    {booking.travellerCount}
                  </td>
                  <td className="py-2 px-4 text-center text-[#8D6B4F]">
                    {booking.bookingDate?.toString()}
                  </td>
                  <td className="py-2 px-4 text-center text-[#8D6B4F]">
                    {booking.status ?? "Pending"}
                  </td>
                  <td className="py-2 px-4 flex justify-center gap-3">
                    <button
                      onClick={() => rejectStatus(booking.bookingId)}
                      className="px-4 py-2 rounded-full font-medium shadow-md bg-gradient-to-r from-red-500 to-red-600 text-white hover:scale-105"
                    >
                      ❌ Reject
                    </button>
                    <button
                      onClick={() => acceptStatus(booking.bookingId)}
                      className="px-4 py-2 rounded-full font-medium shadow-md bg-gradient-to-r from-[#B2945B] to-[#8D6B4F] text-white hover:scale-105"
                    >
                      ✅ Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📊 Chart Section */}
      <div
        className="p-6 rounded-xl shadow"
        style={{ backgroundColor: "#FAF7F0" }}
      >
        <h3 className="text-2xl font-semibold mb-4 text-[#8D6B4F]">
          Bookings Chart
        </h3>
        <div
          className="w-full h-64 rounded-lg"
          style={{ backgroundColor: "#E8DAB7" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="bookings" fill="#8D6B4F" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
