import React, { useEffect } from "react";

export default function AboutUs() {
  // Custom Colors for a warmer, consistent palette
  const primaryColor = "text-[#B2945B]"; // Dark Gold/Bronze for text
  const primaryBg = "bg-[#B2945B]"; // Dark Gold/Bronze for backgrounds
  const softBg = "bg-[#FAF7F0]"; // Warm Off-White (Sand)
  const accentBg = "bg-[#EAE4D7]"; // Lighter accent background

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`${softBg} min-h-screen pt-20 font-sans`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-8">
          <h1
            className={`text-6xl font-extrabold text-gray-800 font-['Playfair_Display'] ${primaryColor}`}
          >
            Our Story
          </h1>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
            Welcome to TravelGuide Myanmar! We are dedicated to unveiling the{" "}
            <strong>untouched beauty and rich culture</strong> of Myanmar,
            connecting adventurers with personalized itineraries and reliable
            local expertise.
          </p>
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
            alt="Travel Hero"
            className="w-full max-w-5xl mx-auto rounded-xl shadow-2xl mt-8 border-4 border-white"
          />
        </section>

        {/* Mission Section */}
        <section
          className={`grid md:grid-cols-2 gap-12 items-center p-10 rounded-xl ${accentBg} shadow-lg`}
        >
          <div className="space-y-4 order-2 md:order-1">
            <h2 className={`text-3xl font-bold text-gray-800 ${primaryColor}`}>
              Our Guiding Mission
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our mission is to make travel simple and enjoyable. We connect
              travelers with amazing destinations, curated experiences, and{" "}
              <strong>reliable guides</strong> to ensure every journey is
              unforgettable. We champion <strong>sustainable tourism</strong> and
              support local communities.
            </p>
          </div>
          <img
            src="/public/images/napali.jpg"
            alt="Our mission"
            className="rounded-xl shadow-xl border-4 border-white object-cover w-full h-80 order-1 md:order-2"
          />
        </section>

        {/* Values Section */}
        <section className="space-y-10">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Authentic Experiences",
                desc: "We focus on genuine, local interactions that respect Burmese culture.",
                img: "https://images.unsplash.com/photo-1556742045-3c52d6e88c62?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Reliability & Trust",
                desc: "Providing safe journeys and trustworthy, experienced local guides.",
                img: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Passion for Exploration",
                desc: "Our team shares a deep passion for finding and sharing Myanmar's hidden gems.",
                img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-4 border-2 border-[#E5D5B8]"
                />
                <h3
                  className={`text-xl font-bold text-gray-800 mb-2 ${primaryColor}`}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Meet Our Dedicated Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                name: "Aung Myo",
                role: "Founder & CEO",
                img: "https://randomuser.me/api/portraits/men/45.jpg",
              },
              {
                name: "Aye Chan",
                role: "Head of Marketing",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                name: "Kyaw Swar",
                role: "Lead Travel Guide",
                img: "https://randomuser.me/api/portraits/men/46.jpg",
              },
              {
                name: "Thandar",
                role: "Customer Support Lead",
                img: "https://randomuser.me/api/portraits/women/47.jpg",
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-[#B2945B]"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100 shadow-md"
                />
                <h3
                  className={`text-xl font-bold text-gray-800 ${primaryColor}`}
                >
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm italic">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
