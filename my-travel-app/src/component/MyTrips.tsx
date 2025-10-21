import React, { useEffect, useState } from "react";
import { getLoggedInUser } from "../service/AuthService";
import type { BookingResponse } from "../dto/BookingResponse";
import { cancelBooking, getBookingByUsername, paymentDestination } from "../service/TravelAppService";
import { Link } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyTrips() {
  const logginUsername = getLoggedInUser();
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<BookingResponse | null>(null);
  const [paymentType, setPaymentType] = useState("");

  const fetchALlBooking = (logginUsername: string) => {
    getBookingByUsername(logginUsername!)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => console.error(err));
  };

  const cancleBooking = (id: number) => {
    cancelBooking(id)
      .then((res) => {
        toast.success("✅ Booking cancelled successfully!", { position: "top-center" });
        fetchALlBooking(logginUsername!);
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ Failed to cancel booking!", { position: "top-center" });
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchALlBooking(logginUsername!);
  }, [logginUsername]);

  const handlePayment = (bookingresponse: BookingResponse) => {
    if (!paymentType) {
      toast.warning("⚠️ Please select a payment method first!", { position: "top-center" });
      return;
    }

    paymentDestination(bookingresponse)
      .then((res) => {
        toast.success(`✅ ${res.data}`, { position: "top-center" });
        setShowPaymentModal(false);
        setPaymentType("");
        fetchALlBooking(logginUsername!);
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ Payment failed!", { position: "top-center" });
      });
  };

  const primaryColor = "text-[#B2945B]";
  const secondaryColor = "text-[#8D6B4F]";
  const softBg = "bg-[#FAF7F0]";
  const lightAccent = "border-[#FCF5E3]";
  const buttonBg = "bg-[#8D6B4F]";
  const buttonHover = "hover:bg-[#7D5F4A]";

  return (
    <div className={`relative pt-24 px-6 md:px-16 lg:px-32 ${softBg}`}>
      <h2 className={`text-3xl font-bold text-center ${primaryColor} mb-10 pt-8`}>
        ✨ My Trips ✨
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 pb-8">No trips booked yet. 🗺️</p>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-300 pb-8 ${
            showPaymentModal ? "blur-sm pointer-events-none" : ""
          }`}
        >
          {bookings.map((trip) => (
            <div
              key={trip.bookingId}
              className={`bg-white shadow-lg rounded-xl p-6 ${lightAccent} border hover:shadow-2xl transition flex flex-col justify-between`}
            >
              {/* Header */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{trip.title}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  with <span className={`font-medium ${primaryColor}`}>{trip.guideName}</span>
                </p>

                <p className="text-gray-600 text-sm mb-4 border-b pb-3">
                  Booking ID: <span className="font-medium text-gray-700">{trip.bookingId}</span>
                </p>

                <div className="space-y-2 text-gray-700">
                  <p>👥 Travellers: <span className="font-medium">{trip.travellerCount}</span></p>
                  <p>📅 Date: <span className="font-medium">{new Date(trip.bookingDate).toDateString()}</span></p>
                  <p>💰 Fees: <span className={`font-extrabold text-lg ${primaryColor}`}>{trip.fees} USD</span></p>
                  <p>📝 Status:{" "}
                    <span
                      className={`font-semibold px-2 py-1 rounded-full text-xs ${
                        trip.status === "PENDING"
                          ? "bg-[#FCF5E3] text-[#B2945B] border border-[#B2945B]/50"
                          : trip.status === "ACCEPTED"
                          ? "bg-green-100 text-green-700"
                          : trip.status === "REJECTED"
                          ? "bg-red-100 text-red-700"
                          : trip.status === "CONFIRMED"
                          ? "bg-blue-100 text-blue-700"
                          : trip.status === "COMPLETED"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">
                {trip.status === "PENDING" && (
                  <button
                    onClick={() => cancleBooking(trip.bookingId)}
                    className="w-full bg-red-600 text-white py-2 rounded-lg shadow-md hover:bg-red-700 transition font-semibold"
                  >
                    Cancel Booking
                  </button>
                )}
                {trip.status === "ACCEPTED" && (
                  <button
                    onClick={() => {
                      setSelectedTrip(trip);
                      setShowPaymentModal(true);
                    }}
                    className={`w-full ${buttonBg} text-white py-2 rounded-lg shadow-md ${buttonHover} transition font-semibold`}
                  >
                    Make Payment
                  </button>
                )}
                <Link
                  to={`/destination-places/${trip.destinationId}`}
                  className={`btn w-full bg-[#B2945B] text-white py-2 rounded-lg shadow-md hover:bg-[#A38755] transition font-semibold block text-center`}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedTrip && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-[#FAF7F0]/20 z-50">
          <div className={`bg-white w-96 rounded-xl shadow-2xl p-6 relative animate-fadeIn border-t-4 border-[#8D6B4F]`}>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <h2 className={`text-2xl font-bold mb-6 text-center ${secondaryColor}`}>
              💳 Choose Payment Method
            </h2>

            <div className={`mb-4 text-center border-b pb-3 ${softBg} p-3 rounded-lg`}>
              <p className="text-lg font-semibold text-gray-700">{selectedTrip.title}</p>
              <p className="text-gray-600">Guide: {selectedTrip.guideName}</p>
              <p className={`text-xl font-bold ${secondaryColor} mt-2`}>💵 Total Amount: {selectedTrip.fees} USD</p>
            </div>

            <div className="space-y-3 mb-4">
              {["KPay", "WavePay", "AYA Pay"].map((method) => (
                <label key={method} className={`flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-[#FAF7F0]`}>
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentType === method}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="text-[#8D6B4F] focus:ring-[#B2945B]"
                  />
                  <span className="text-lg text-gray-900">{method === "KPay" ? "📱 KPay" : method === "WavePay" ? "🌊 WavePay" : "🏦 AYA Pay"}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => handlePayment(selectedTrip!)}
              className={`mt-4 w-full ${buttonBg} text-white py-2 rounded-lg ${buttonHover} transition font-bold`}
            >
              ✅ Confirm Payment
            </button>
          </div>
        </div>
      )}

      {/* Fade Animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-in-out;
        }
      `}</style>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
