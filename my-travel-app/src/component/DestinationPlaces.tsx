import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { PlacesDto } from "../dto/PlacesDto";
import { getPlacesByDestinationId } from "../service/TravelAppService";

export default function DestinationPlaces() {
  const { id } = useParams();
  const [places, setPlaces] = useState<PlacesDto[]>([]);

  // Custom Colors
  const primaryColor = "text-[#B2945B]"; // Dark Gold/Bronze for text
  const primaryBg = "bg-[#B2945B]"; // Dark Gold/Bronze for backgrounds
  const primaryBgHover = "hover:bg-[#8D6B4F]"; // Warm Brown for hover
  const softBg = "bg-[#FAF7F0]"; // Warm Off-White (Sand)

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllPlaces();
  }, []);

  const fetchAllPlaces = () => {
    getPlacesByDestinationId(Number(id))
      .then((res) => {
        console.log(res);
        setPlaces(res.data);
      })
      .catch((err) => console.error(err));
  };

  // Helper function to get the first destination's data
  const firstPlaceData = places.length > 0 ? places[0] : null;

  return (
    <div className={`pt-16 font-sans ${softBg}`}>
      {/* ✅ HERO SECTION */}
      {firstPlaceData && (
        <div
          className="relative w-full h-[450px] md:h-[550px] bg-center bg-cover shadow-xl"
          style={{
            backgroundImage: `url(data:image/jpeg;base64,${firstPlaceData.destinationImageBase64})`,
          }}
        >
          {/* Darker, Warmer Gradient Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 space-y-6">
            <p className="text-xl text-[#F2E8C6] font-semibold tracking-widest uppercase drop-shadow">
              Your Adventure Awaits
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white font-['Playfair_Display'] drop-shadow-2xl">
              {firstPlaceData.destinationTitle}
            </h1>

            {/* Extra Info Card */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 inline-block shadow-lg border border-white/30">
              <div className="text-white space-y-1 text-base md:text-lg">
                <p>
                  <span className="font-bold">🗓️ Trip Dates:</span>{" "}
                  {new Date(firstPlaceData.startDate).toLocaleDateString()} →{" "}
                  {new Date(firstPlaceData.endDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-bold">💵 Fees:</span> {firstPlaceData.fees} USD
                  <span className="ml-4 font-bold">👨‍💼 Guide:</span>{" "}
                  {firstPlaceData.guideUsername}
                </p>
              </div>
            </div>

            <Link
              to={`/book/${id}`}
              className={`mt-6 ${primaryBg} ${primaryBgHover} text-white px-8 py-3 rounded-full shadow-2xl transition duration-300 font-semibold text-lg transform hover:scale-[1.03]`}
            >
              🎟️ Book Your Trip Now
            </Link>
          </div>
        </div>
      )}

      {/* ✅ Places Section - Timeline Style */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h2
          className={`text-4xl font-bold text-gray-900 text-center mb-16 ${primaryColor}`}
        >
          Itinerary: Places & Activities
        </h2>

        {places.length === 0 ? (
          <p className="text-gray-500 text-center">
            🚫 No places found for this destination.
          </p>
        ) : (
          <div className="space-y-16 relative">
            {/* Timeline Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#E5D5B8] hidden md:block"></div>

            {places.map((place, index) => (
              <div
                key={place.destinationId}
                className={`flex flex-col md:flex-row items-start gap-8 relative ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#B2945B] border-4 border-[#FAF7F0] z-10 hidden md:block"></div>

                {/* Card Container */}
                <div
                  className={`w-full md:w-[48%] flex flex-col sm:flex-row shadow-xl bg-white rounded-xl transition duration-300 transform hover:shadow-2xl hover:scale-[1.01] ${
                    index % 2 !== 0
                      ? "sm:flex-row-reverse md:flex-row-reverse"
                      : "sm:flex-row md:flex-row"
                  }`}
                >
                  {/* 1. Content */}
                  <div className="w-full sm:w-2/3 p-6 space-y-3">
                    <h3 className={`text-xl font-bold ${primaryColor}`}>
                      {index + 1}. {place.placeName}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {place.placeDescription}
                    </p>
                  </div>

                  {/* 2. Image */}
                  {place.placeImageBase64 && (
                    <div className="w-full sm:w-1/3">
                      <img
                        src={`data:image/jpeg;base64,${place.placeImageBase64}`}
                        alt={place.placeName}
                        className="w-full h-full object-cover rounded-t-xl sm:rounded-l-none sm:rounded-r-xl md:rounded-l-none md:rounded-r-xl"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
