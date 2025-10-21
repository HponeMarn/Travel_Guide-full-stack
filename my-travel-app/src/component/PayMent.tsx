import React, { useState } from "react";
import { useParams } from "react-router";
import { getLoggedInUser } from "../service/AuthService";

export default function PayMent() {
  const { id } = useParams();
  const [paymentType, setPaymentType] = useState("");
  // const loggedInUser = getLoggedInUser();

  const handlePayment = () => {
    if (!paymentType) {
      alert("Please select a payment method first!");
      return;
    }
    alert(`Booking ${id} paid with ${paymentType}`);
    // 👉 ဒီနေရာမှာ backend API call ပို့နိုင်တယ်
    // fetch(`/api/payments/${id}`, { method:"POST", body: JSON.stringify({ paymentType }) })
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">💳 Choose Payment Method</h2>

      {/* Payment Options */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="KPay"
            checked={paymentType === "KPay"}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          <span className="text-lg">📱 KPay</span>
        </label>

        <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="WavePay"
            checked={paymentType === "WavePay"}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          <span className="text-lg">🌊 WavePay</span>
        </label>

        <label className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            value="AYA Pay"
            checked={paymentType === "AYA Pay"}
            onChange={(e) => setPaymentType(e.target.value)}
          />
          <span className="text-lg">🏦 AYA Pay</span>
        </label>
      </div>

      {/* Confirm Button */}
      <button
        onClick={handlePayment}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        ✅ Confirm Payment
      </button>
    </div>
  );
}
