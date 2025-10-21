import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F0] pt-16 pb-8 relative font-sans">
      
  <div className="container mx-auto px-6 md:px-12 lg:px-24">
    {/* Newsletter Section */}
    <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
      {/* Left Text & Input */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Stay in <span className="text-[#B2945B]">Touch</span>
        </h2>
        <p className="text-gray-600 mb-6">
          Get inspired with Myanmar travel tips, hidden gems, and exclusive offers.
        </p>
        <form className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            // Input Focus Ring ကို Dark Gold/Bronze ဖြင့် ပြောင်းလဲ။
            className="w-full sm:flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B2945B]"
          />
          <button
            type="submit"
            // Button Background ကို Warm Terracotta/Brown ဖြင့် ပြောင်းလဲ။
            className="px-6 py-3 bg-[#8D6B4F] hover:bg-[#7D5F4A] text-white rounded-full transition font-semibold"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Right Image */}
      <div className="flex justify-center md:justify-end">
        <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            alt="Travel couple"
            className="object-cover w-full h-full"
          />
          {/* Image Overlay ကို Warm Terracotta/Brown opacity 70% ဖြင့် ပြောင်းလဲ။ */}
          <div className="absolute inset-0 bg-[#8D6B4F]/70 flex items-center justify-center text-white text-center text-sm px-4">
            <span>
              📷 Follow our journey on Instagram with <b>375K+</b> travelers →
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Footer Links */}
    <div className="grid md:grid-cols-4 gap-10 text-gray-700 mb-12">
      <div>
        {/* ခေါင်းစဉ်ကို Dark Gold/Bronze ဖြင့် ပြောင်းလဲ။ */}
        <h3 className="font-bold mb-3 text-[#B2945B]">Destinations</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>Bagan Travel Guide</li>
          <li>Mandalay City Tips</li>
          <li>Inle Lake Guide</li>
          <li>Yangon Highlights</li>
        </ul>
      </div>

      <div>
        {/* ခေါင်းစဉ်ကို Dark Gold/Bronze ဖြင့် ပြောင်းလဲ။ */}
        <h3 className="font-bold mb-3 text-[#B2945B]">Experiences</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>Culture & Heritage</li>
          <li>Nature & Adventure</li>
          <li>Local Foods</li>
          <li>Festivals</li>
        </ul>
      </div>

      <div>
        {/* ခေါင်းစဉ်ကို Dark Gold/Bronze ဖြင့် ပြောင်းလဲ။ */}
        <h3 className="font-bold mb-3 text-[#B2945B]">About Us</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>Our Story</li>
          <li>Work with Us</li>
          <li>Travel Photography</li>
        </ul>
      </div>

      <div>
        {/* ခေါင်းစဉ်ကို Dark Gold/Bronze ဖြင့် ပြောင်းလဲ။ */}
        <h3 className="font-bold mb-3 text-[#B2945B]">Contact</h3>
        <p className="mb-3 text-sm text-gray-600">ask@travelguide.com</p>
        <div className="flex space-x-4 text-gray-600 text-xl">
          <a href="#" className="hover:text-[#8D6B4F] transition">🌐</a>
          <a href="#" className="hover:text-[#8D6B4F] transition">📸</a>
          <a href="#" className="hover:text-[#8D6B4F] transition">🐦</a>
          <a href="#" className="hover:text-[#8D6B4F] transition">📘</a>
        </div>
      </div>
    </div>

    {/* Bottom */}
    <div className="text-center text-gray-500 text-sm border-t border-gray-300 pt-6">
      © {new Date().getFullYear()} TravelGuide Myanmar. All rights reserved.
    </div>
  </div>
</footer>
  );
}
