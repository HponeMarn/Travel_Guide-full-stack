import React from "react";
import { registerApiCall } from "../service/AuthService";
import type { RegisterDto } from "../dto/RegisterDto";
import { useNavigate } from "react-router";
import bagan from "../assets/images/bagan.jpg";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Define validation schema
const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  goodAtDestinations: z.array(z.string()).optional(),
});

export default function Register() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [goodAtDestinations, setGoodAtDestinations] = React.useState<string[]>([]);
  const [isGuide, setIsGuide] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const navigator = useNavigate();

  const registerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const registerData = {
      firstName,
      lastName,
      email,
      username,
      password,
      goodAtDestinations,
    };

    // ✅ Zod validation before API call
    const result = registerSchema.safeParse(registerData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("⚠️ Please correct the highlighted fields", { position: "top-center" });
      return;
    }

    setErrors({});

    const accountType = isGuide ? "guide" : "traveller";
    registerApiCall(result.data, accountType)
      .then(() => {
        toast.success("✅ Registration successful!", { position: "top-center" });
        setTimeout(() => navigator("/login"), 1200);
      })
      .catch(() => toast.error("❌ Failed to register. Try again later.", { position: "top-center" }));
  };

  const toggleDestination = (dest: string) => {
    setGoodAtDestinations((prev) =>
      prev.includes(dest) ? prev.filter((d) => d !== dest) : [...prev, dest]
    );
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-300 text-[#8D6B4F] placeholder:text-[#B2945B] focus:outline-none focus:ring-2 focus:ring-[#B2945B] bg-white";

  const primaryColor = "text-[#B2945B]";
  const primaryBg = "bg-[#B2945B]";
  const primaryHover = "hover:bg-[#8D6B4F]";
  const softBg = "bg-[#FAF7F0]";

  return (
    <div
      className="min-h-screen flex relative bg-cover bg-center font-sans"
      style={{ backgroundImage: `url(${bagan})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Left Section (Form) */}
      <div className="relative z-10 md:w-1/2 flex justify-center items-center p-8">
        <div
          className={`w-full max-w-2xl ${softBg} backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/40`}
        >
          <h2 className={`text-3xl font-semibold text-center ${primaryColor} mb-8`}>
            Create an Account
          </h2>

          <form onSubmit={registerSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="username" className="block text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClass}
                placeholder="Create a username"
              />
              {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="Enter a strong password"
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Account Type</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    checked={!isGuide}
                    onChange={() => setIsGuide(false)}
                  />
                  Traveller
                </label>
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="radio"
                    checked={isGuide}
                    onChange={() => setIsGuide(true)}
                  />
                  Guide
                </label>
              </div>
            </div>

            {isGuide && (
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">
                  Destinations you are good at
                </label>
                <div className="flex flex-wrap gap-3">
                  {["Bagan", "Mandalay", "Yangon", "Inle Lake"].map((dest) => (
                    <button
                      type="button"
                      key={dest}
                      onClick={() => toggleDestination(dest)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        goodAtDestinations.includes(dest)
                          ? `${primaryBg} text-white border-[#B2945B]`
                          : "bg-white text-gray-700 border-gray-300 hover:bg-[#FAF7F0]"
                      }`}
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                className={`w-full py-3 rounded-lg ${primaryBg} text-white font-semibold shadow-lg ${primaryHover} transition-all duration-300 hover:scale-[1.02]`}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative z-10 md:w-1/2 flex flex-col justify-center items-center md:items-start p-12 text-center md:text-left text-white">
        <h2 className="font-['Playfair_Display'] text-xl mb-2">Travel Guide</h2>
        <h1
          className={`font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl font-bold ${primaryColor} mb-6 tracking-wide drop-shadow-lg`}
        >
          Myanmar
        </h1>
        <p className="max-w-md text-gray-200 drop-shadow-md">
          From the floating gardens and stilt-house villages in Inle Lake to the
          temples of Bagan, discover undiscovered Myanmar.
        </p>
      </div>

      {/* Toasts */}
      <ToastContainer />
    </div>
  );
}
