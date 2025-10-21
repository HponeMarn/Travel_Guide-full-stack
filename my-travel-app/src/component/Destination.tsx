import React, { useEffect, useState } from "react";
import type { DestinationDto } from "../dto/DestinationDto";
import { getallCategories, getAllDestinations } from "../service/TravelAppService";
import { Link } from "react-router";
import type { CategoryDto } from "../dto/CategoryDto";

export default function Destination() {
  const [destinations, setDestinations] = useState<DestinationDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Custom Colors for a warmer, consistent palette
  const primaryColor = "text-[#B2945B]"; // Dark Gold/Bronze for text
  const primaryBg = "bg-[#B2945B]"; // Dark Gold/Bronze for backgrounds
  const primaryBgHover = "hover:bg-[#8D6B4F]"; // Warm Brown for hover
  const softBg = "bg-[#FAF7F0]"; // Warm Off-White (Sand)

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllDestinations();
    fetchAllCategories();
  }, []);

  const fetchAllDestinations = () => {
    getAllDestinations()
      .then((res) => setDestinations(res.data))
      .catch((err) => console.error(err));
  };

  const fetchAllCategories = () => {
    getallCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  };

  // ✅ Filter destinations by category
  const filteredDestinations =
    selectedCategory === "All"
      ? destinations
      : destinations.filter((d) => d.category === selectedCategory);

  return (
    <div className={`p-10 ${softBg} min-h-screen pt-23`}>
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800">
          ✈️ Travel Packages
        </h2>
        <p className="text-gray-600 mt-2">
          Find the best destinations and book your next adventure!
        </p>
      </div>

      {/* ✅ Category Filter Bar */}
      <div className="max-w-6xl mx-auto mb-12 flex gap-4 overflow-x-auto scrollbar-hide justify-center">
        {/* All Button */}
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-5 py-2 rounded-full text-sm font-semibold shadow-md transition ${
            selectedCategory === "All"
              ? `${primaryBg} text-white`
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          All
        </button>

        {/* Category Buttons */}
        {categories.map((cat) => (
          <button
            key={cat.categoryId}
            onClick={() => setSelectedCategory(cat.categoryName)}
            className={`px-5 py-2 rounded-full text-sm font-semibold shadow-md transition ${
              selectedCategory === cat.categoryName
                ? `${primaryBg} text-white`
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat.categoryName}
          </button>
        ))}
      </div>

      {/* Grid Layout (2 columns) */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.destinationId}
            className="flex bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5"
          >
            {/* Image Left */}
            <div className="w-1/3">
              <img
                src={`data:image/jpeg;base64,${dest.imageBase64}`}
                alt={dest.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Right */}
            <div className="w-2/3 p-6 flex flex-col justify-between">
              <div>
                <h3 className={`text-xl font-bold ${primaryColor}`}>{dest.title}</h3>
                <p className="text-sm text-gray-500 italic">{dest.category}</p>
                <p className="mt-2 text-gray-600 line-clamp-3">{dest.description}</p>

                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p>
                    🗓️ {new Date(dest.startDate).toLocaleDateString()} →{" "}
                    {new Date(dest.endDate).toLocaleDateString()}
                  </p>
                  <p>
                    👨‍💼 Guide: <span className="font-semibold">{dest.guideName}</span>
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-4 flex items-center justify-between">
                <span className={`text-lg font-bold ${primaryColor}`}>
                  💵 {dest.fees} USD
                </span>
                <Link
                  to={`/destination-places/${dest.destinationId}`}
                  className={`px-5 py-2 ${primaryBg} text-white rounded-full shadow-md ${primaryBgHover} transition`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredDestinations.length === 0 && (
          <div className="col-span-2 text-center text-gray-500 mt-20">
            🚫 No destinations found in{" "}
            <span className="font-semibold">{selectedCategory}</span>.
          </div>
        )}
      </div>
    </div>
  );
}
