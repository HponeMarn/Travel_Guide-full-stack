import React, { useEffect, useRef, useState } from "react";
import type { CategoryDto } from "../dto/CategoryDto";
import { getallCategories, createDestination } from "../service/TravelAppService";
import { getLoggedInUser } from "../service/AuthService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateDestination() {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [preview, setPreview] = useState<string | null>(null); // 🔹 Image preview
  const formRef = useRef<HTMLFormElement>(null);
  const username = getLoggedInUser();

  useEffect(() => {
    getallCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData();

    formData.append("title", form.title.value);
    formData.append("description", form.description.value);
    formData.append("fees", form.fees.value);
    formData.append("categoryName", form.categoryName.value);
    formData.append("startDate", form.startDate.value);
    formData.append("endDate", form.endDate.value);
    formData.append("guideName", username);

    const imageFile = form.image.files?.[0];
    if (imageFile) formData.append("image", imageFile);

    try {
      await createDestination(formData);
      toast.success("✅ Destination created successfully!", { position: "top-center" });

      if (formRef.current) formRef.current.reset();
      setPreview(null); // reset preview
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to create destination!", { position: "top-center" });
    }
  };

  const inputClass =
    "w-full border rounded-lg px-4 py-2 text-[#8D6B4F] placeholder:text-[#B2945B] bg-white focus:outline-none focus:ring-2 focus:ring-[#B2945B]";

  return (
    <div className="p-8 bg-[#FAF7F0] rounded-2xl shadow-lg max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-[#B2945B] mb-6">🗺️ Create Destination</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-[#8D6B4F] mb-2">Destination Name</label>
          <input
            type="text"
            name="title"
            placeholder="Enter destination name"
            className={inputClass}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[#8D6B4F] mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Write something about this place..."
            className={`${inputClass} h-28 resize-none`}
            required
          ></textarea>
        </div>

        {/* Fees */}
        <div>
          <label className="block text-[#8D6B4F] mb-2">Fees</label>
          <input
            type="number"
            name="fees"
            placeholder="Enter fees (USD)"
            className={inputClass}
            required
          />
        </div>

        {/* Custom File Upload with Preview */}
        <div>
          <label className="block text-[#8D6B4F] mb-2">Upload Image</label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#D8C4A4] bg-[#FFF6E5] rounded-lg cursor-pointer hover:border-[#B2945B] hover:bg-[#FAF7F0] transition relative">
            {preview ? (
              <img src={preview} alt="preview" className="object-cover w-full h-full rounded-lg" />
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-[#5B4631]">
                <span className="font-medium">Click or drag file to upload</span>
                <span className="text-xs text-[#B2945B] mt-1">PNG, JPG, GIF up to 10MB</span>
              </div>
            )}
            <input
              type="file"
              name="image"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Category */}
        <div>
          <label className="block text-[#8D6B4F] mb-2">Category</label>
          <select name="categoryName" className={inputClass} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.categoryName}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Start & End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
  {/* Start Date အတွက် */}
  <div>
    <label className="block text-[#8D6B4F] mb-2">Start Date</label>
    {/* relative ကို ထည့်ပြီး Icon ကို နေရာချဖို့ပြင်ဆင်ခြင်း */}
    <div className="relative"> 
      <input 
        type="date" 
        name="startDate" 
        // inputClass ထဲမှာ pr-10 ပါဝင်သင့်ပါတယ်။
        className={inputClass} 
        required 
      />
      {/* Calendar Icon ကို absolute နေရာချခြင်း */}
      <svg 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8D6B4F] pointer-events-none" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Heroicons/Feather Icon style calendar icon (Tailwind မှာ အများဆုံးသုံး) */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    </div>
  </div>

  {/* End Date အတွက် */}
  <div>
    <label className="block text-[#8D6B4F] mb-2">End Date</label>
    <div className="relative">
      <input 
        type="date" 
        name="endDate" 
        // inputClass ထဲမှာ pr-10 ပါဝင်သင့်ပါတယ်။
        className={inputClass} 
        required 
      />
      <svg 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8D6B4F] pointer-events-none" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
    </div>
  </div>
</div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#B2945B] text-white px-6 py-3 rounded-lg w-full hover:bg-[#8D6B4F] transition"
        >
          ➕ Add Destination
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
