import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getLoggedInUser } from "../service/AuthService";
import type { BookingDto } from "../dto/BookingDto";
import { createBooking, getAllDestinations } from "../service/TravelAppService";
import type { DestinationDto } from "../dto/DestinationDto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingForm() {
  const [destinations, setDestinations] = useState<DestinationDto[]>([]);
  const { id } = useParams();
  const [travellerCount, setTravellerCount] = useState(1);
  const [status] = useState("PENDING");
  const username = getLoggedInUser();
  const destinationId = Number(id);
  const navigator = useNavigate();

  // Custom Colors
  const primaryColor = "text-[#B2945B]"; // Dark Gold/Bronze for text
  const primaryBg = "bg-[#B2945B]"; // Dark Gold/Bronze for backgrounds
  const primaryBgHover = "hover:bg-[#8D6B4F]"; // Warm Brown for hover
  const softBg = "bg-[#FAF7F0]"; // Warm Off-White (Sand)

  useEffect(() => {
    fetchAllDestinations();
  }, []);

  const fetchAllDestinations = () => {
    getAllDestinations()
      .then((res) => setDestinations(res.data))
      .catch((err) => console.error(err));
  };

  const selectedDestination = destinations.find(
    (d) => d.destinationId === destinationId
  );

  const fees = selectedDestination
    ? selectedDestination.fees * travellerCount
    : 0;

  const bookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bookingDto: BookingDto = {
      travellerCount,
      bookingDate: new Date(),
      status,
      username,
      destinationId,
      fees,
    };

    createBooking(bookingDto)
      .then((res) => {
        toast.success("✅ Booking confirmed!", { position: "top-center" });
        navigator("/");
      })
      .catch((err) => {
        console.error("❌ Booking error:", err);
        toast.error("❌ Booking failed!", { position: "top-center" });
      });
  };

  return (
    <div className={`flex justify-center items-center min-h-screen ${softBg} pt-20 font-sans`}>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        {/* Title */}
        <h2
          className={`text-3xl font-bold text-gray-800 text-center mb-8 ${primaryColor} font-['Playfair_Display']`}
        >
          Confirm Your Trip Booking
        </h2>

        {/* Destination Info Card */}
        {selectedDestination && (
          <div className="mb-8 text-center bg-[#F7F3E8] p-4 rounded-lg border border-[#E5D5B8]">
            <p className="text-gray-600 text-sm uppercase tracking-wider">
              Destination
            </p>
            <p className={`text-xl font-bold ${primaryColor}`}>
              {selectedDestination.title}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Fee per traveller:{" "}
              <span className="font-semibold text-gray-800">
                {selectedDestination.fees} Ks
              </span>
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={bookingSubmit} className="space-y-6">
          {/* Traveller Count */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              🧑‍🤝‍🧑 Number of Travellers
            </label>
            <input
              type="number"
              min={1}
              value={travellerCount}
              onChange={(e) => setTravellerCount(Number(e.target.value))}
              className="w-full text-gray-800 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B2945B] focus:border-[#B2945B] focus:outline-none transition duration-150"
              required
            />
          </div>

          {/* Auto-calculated Fees (readonly) */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              💰 Total Fees (Ks)
            </label>
            <input
              type="text"
              value={`${fees} USD`}
              readOnly
              className="w-full px-4 py-3 border border-[#B2945B] rounded-lg bg-[#EAE4D7] text-gray-800 font-bold cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full ${primaryBg} text-white font-bold py-3 rounded-lg ${primaryBgHover} transition duration-300 shadow-lg mt-8 transform hover:scale-[1.01]`}
          >
            ✅ Confirm & Book Trip
          </button>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
