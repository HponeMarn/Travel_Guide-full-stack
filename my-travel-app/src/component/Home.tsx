import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BaganImage from "../assets/images/bagan.jpg";
import type { CategoryDto } from "../dto/CategoryDto";
import { getallCategories } from "../service/TravelAppService";
import { ca } from "zod/v4/locales";
import { Link } from "react-router";

export default function Home() {
  const [categories, setCategories] = React.useState<CategoryDto[]>([]);
  useEffect(() => {
    fetchAllCategries();    
    window.scrollTo(0, 0);
    AOS.init({
      duration: 1300, // animation duration
      once: true, // whether animation should happen only once
    });
  }, []);
      const fetchAllCategries =  () => {
      getallCategories()
        .then((res) => setCategories(res.data))
        .catch((err) => console.error(err));     
    };


  // Custom Colors for a warmer, Burmese-inspired palette
  const primaryColor = "text-[#B2945B]"; // Dark Gold/Bronze
  const secondaryColor = "text-[#8D6B4F]"; // Warm Terracotta/Brown
  const softBg = "bg-[#FAF7F0]"; // Warm Off-White (Like Sand/Earth)
  const lightAccent = "bg-[#FCF5E3]"; // Lightest Gold Accent

  return (
    <div className={`font-sans ${softBg} text-gray-700 min-h-screen pt-20`}>
      {/* Hero Section */}
      <main className="relative">
        <div
          data-aos="fade-right"
          className="container mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 flex flex-col md:flex-row items-center justify-between z-10"
        >
          {/* Left Content */}
          <div
            data-aos="slide-down"
            data-aos-delay="500"
            className="md:w-1/2 lg:pr-12 text-center md:text-left mb-8 md:mb-0"
          >
            <h2 className={`font-['Playfair_Display'] text-xl ${secondaryColor} mb-2`}>
              Travel Guide
            </h2>
            <h1
              className={`font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold ${primaryColor} mb-6 tracking-wide`}
            >
              Myanmar
            </h1>
            <p className="text-gray-600 max-w-lg mx-auto md:mx-0">
              From the floating gardens and stilt-house villages in Inle Lake to the temples of Bagan, discover undiscovered Myanmar.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8">
              <a
                href="#"
                className="flex items-center bg-white border border-gray-100 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
              >
                🗓️ Itineraries
              </a>
              <a
                href="#weather"
                className="flex items-center bg-white border border-gray-100 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
              >
                🗺️ Map
              </a>
              <a
                href="#"
                className="flex items-center bg-white border border-gray-100 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
              >
                ☀️ Best time to visit
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div data-aos="fade-up" className="relative w-full md:w-1/2 mt-8 md:mt-0">
            <div
              data-aos="slide-right"
              className="absolute inset-0 bg-[#F7EAC4] rounded-2xl transform translate-x-4 translate-y-4"
            ></div>
            <div
              data-aos="slide-right"
              data-aos-delay="250"
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={BaganImage}
                alt="A photo of Bagan Temples"
                className="w-full h-auto object-cover"
              />
            </div>
            <div
              data-aos="slide-right"
              data-aos-delay="500"
              className="absolute inset-0 bg-[#E8DAB7] rounded-2xl transform -translate-x-4 -translate-y-4 z-[-1]"
            ></div>
          </div>
        </div>
      </main>

      {/* Bottom Section */}
<section
  className="container mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16"
>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    
    {/* 1. "All" Category Card (Destination စာမျက်နှာသို့ ချိတ်ရန်) */}
    {/* to="/destination" ဆိုတာက Destination component ကို ချိတ်ထားတဲ့ route path ဖြစ်ရပါမယ် */}
    <Link 
      key="all-category" 
      to="/destination?category=All" // 🎯 Query Parameter ကို ဒီလိုထည့်ပါ
      data-aos="fade-up"
      data-aos-delay={0}
      className="flex items-center space-x-4 bg-white rounded-full p-4 shadow-md hover:shadow-lg transition duration-300"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#E5D5B8] text-[#8D6B4F]">
        📚
      </div>
      <div>
        <h3 className="font-semibold text-lg">All</h3>
      </div>
    </Link>
    
    {/* 2. categories array ကို map လုပ်ပြီး ကျန်တဲ့ cards များ */}
    {categories && categories.map((category, index) => (
      <Link
        key={category.id}
        
        to={`/destination?category=${category.categoryName}`} 
        data-aos="fade-up"
        data-aos-delay={(index + 1) * 150} 
        className="flex items-center space-x-4 bg-white rounded-full p-4 shadow-md hover:shadow-lg transition duration-300"
      >
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#E5D5B8] text-[#8D6B4F]">
          ➡️
        </div>
        <div>
          <h3 className="font-semibold text-lg">{category.categoryName}</h3>
        </div>
      </Link>
    ))}
  </div>
</section>


      {/* Services Section */}
      <section id="services" className={`py-16 ${softBg}`}>
  <div className="container mx-auto px-6 md:px-12 lg:px-24">
    <div
      className="text-center mb-12"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <span
        className={`block text-sm font-semibold ${secondaryColor} tracking-wide uppercase`}
      >
        Travel Guide
      </span>
      <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-800">
        Explore Myanmar’s Wonders: Culture, Nature & Heritage
      </h2>
    </div>

    {/* Travel Guide Grid */}
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        {
          src: "/images/fireworks.jpg",
          alt: "Temples of Bagan",
          text: "Ancient Temples of Bagan",
        },
        {
          src: "/images/fisherman.jpg",
          alt: "Fishermen in Inle Lake",
          text: "Fishermen in Inle Lake",
        },
        {
          src: "/images/Mandalay.jpg",
          alt: "Mandalay Culture",
          text: "Culture of Mandalay",
        },
        {
          src: "/images/shwedagon.jpg",
          alt: "Shwedagon Pagoda at sunset",
          text: "Golden Glow of Shwedagon",
        },
      ].map(({ src, alt, text }, index) => (
        <li
          key={text}
          className="relative group overflow-hidden rounded-xl shadow-xl"
          data-aos="fade-up"
          data-aos-delay={index * 150 + 200} // staggered animation
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <a
            href="#"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition duration-500"
          >
            <span className="px-4 text-center">{text}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
</section>


      {/* Weather Section */}
      <section id="weather" className="bg-[#EAE4D7] py-12 px-6 md:px-16">
  <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Map */}
    <div
      className="bg-white rounded-2xl shadow-xl p-4"
      data-aos="fade-right"
      data-aos-delay="100"
    >
      <img
        src="/images/myanmar-graphic-map.webp"
        alt="Map of Myanmar"
        className="rounded-xl w-full object-cover"
      />
      <p className="mt-2 text-sm text-gray-600 font-medium text-center">
        Map of Myanmar
      </p>
    </div>

    {/* Weather Info */}
    <div data-aos="fade-left" data-aos-delay="200">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        Weather in Myanmar
      </h2>
      <p className="text-gray-700 mb-6 leading-relaxed">
        Myanmar has a sub-tropical monsoon climate with warm temperatures.
        The hot season (Feb–May) is very warm, with an average of 32°C.
        The rainy season is split per region: rainy southwest monsoon
        (May–Oct) and relatively dry northeast monsoon (Oct–Feb).
      </p>

      {/* Weather Bars */}
      <div className="grid grid-cols-12 gap-2 text-center">
        {[
          { month: "Jan", temp: "29°C", height: "60%", icon: "☀️", color: "bg-[#B2945B]" },
          { month: "Feb", temp: "31°C", height: "70%", icon: "☀️", color: "bg-[#B2945B]" },
          { month: "Mar", temp: "33°C", height: "80%", icon: "⛅", color: "bg-[#E5D5B8]" },
          { month: "Apr", temp: "34°C", height: "90%", icon: "⛅", color: "bg-[#E5D5B8]" },
          { month: "May", temp: "32°C", height: "75%", icon: "🌦️", color: "bg-[#88A69E]" },
          { month: "Jun", temp: "29°C", height: "60%", icon: "🌧️", color: "bg-[#5D877C]" },
          { month: "Jul", temp: "29°C", height: "60%", icon: "🌧️", color: "bg-[#5D877C]" },
          { month: "Aug", temp: "29°C", height: "60%", icon: "🌧️", color: "bg-[#5D877C]" },
          { month: "Sep", temp: "30°C", height: "70%", icon: "🌦️", color: "bg-[#88A69E]" },
          { month: "Oct", temp: "30°C", height: "70%", icon: "⛅", color: "bg-[#E5D5B8]" },
          { month: "Nov", temp: "31°C", height: "70%", icon: "⛅", color: "bg-[#B2945B]" },
          { month: "Dec", temp: "29°C", height: "60%", icon: "☀️", color: "bg-[#B2945B]" },
        ].map(({ month, temp, height, icon, color }, index) => (
          <div
            key={month}
            className="flex flex-col items-center"
            data-aos="fade-up"
            data-aos-delay={index * 80 + 200}
          >
            <span className="text-2xl">{icon}</span>
            <div className="w-3 h-24 bg-gray-300 rounded-full relative overflow-hidden">
              <div
                className={`absolute bottom-0 w-3 ${color} rounded-full transition-all duration-700`}
                style={{ height }}
              ></div>
            </div>
            <p className="text-xs mt-1 text-gray-700">{temp}</p>
            <p className="text-sm font-medium">{month}</p>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Greetings Section */}
  <div
    className="max-w-5xl mx-auto mt-12 text-center border-t border-gray-300 pt-6"
    data-aos="zoom-in-up"
    data-aos-delay="300"
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
      <div>
        <p className="text-sm uppercase tracking-wide">Hello / Greetings:</p>
        <p className={`text-2xl italic font-semibold ${primaryColor}`}>Maingalarpar</p>
      </div>
      <div>
        <p className="text-sm uppercase tracking-wide">Thank you:</p>
        <p className={`text-2xl italic font-semibold ${primaryColor}`}>Kyaayyjuutainparsai</p>
      </div>
      <div>
        <p className="text-sm uppercase tracking-wide">Excuse me:</p>
        <p className={`text-2xl italic font-semibold ${primaryColor}`}>Kyaayyjiipyuu</p>
      </div>
    </div>
  </div>
</section>

    </div>
  );
}
