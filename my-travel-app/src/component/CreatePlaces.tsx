import React, { useRef, useState } from "react";
import { useParams } from "react-router";
import { createDestinationPlaces } from "../service/TravelAppService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreatePlaces() {
  const { id } = useParams();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as typeof event.currentTarget & {
      placeName: { value: string };
      placeDescription: { value: string };
      placeImage: { files: FileList };
    };

    const formData = new FormData();
    formData.append("placeName", form.placeName.value);
    formData.append("placeDescription", form.placeDescription.value);
    formData.append("destinationId", id || "");

    const imageFile = form.placeImage.files?.[0];
    if (imageFile) {
      formData.append("placeImage", imageFile);
    }

    createDestinationPlaces(formData)
      .then((res) => {
        toast.success("✅ Place created successfully!", { position: "top-center" });
        if (formRef.current) formRef.current.reset();
        setPreview(null);
      })
      .catch((err) => {
        console.error("❌ Error creating place:", err);
        toast.error("❌ Failed to create place!", { position: "top-center" });
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-[#FAF7F0] rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-[#B2945B] mb-6">
        🗺️ Add a Place for Destination #{id}
      </h2>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {/* Place Name */}
        <div>
          <label className="block text-sm font-medium text-[#8D6B4F] mb-1">
            Place Name
          </label>
          <input
            type="text"
            name="placeName"
            placeholder="Enter place name"
            className="w-full border border-[#D8C4A4] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#B2945B] focus:outline-none text-[#5B4631]"
            required
          />
        </div>

        {/* Place Description */}
        <div>
          <label className="block text-sm font-medium text-[#8D6B4F] mb-1">
            Description
          </label>
          <textarea
            name="placeDescription"
            placeholder="Write a short description..."
            className="w-full border border-[#D8C4A4] rounded-lg px-4 py-2 h-24 focus:ring-2 focus:ring-[#B2945B] focus:outline-none text-[#5B4631]"
            required
          ></textarea>
        </div>

        {/* Custom Image Upload */}
        <div>
          <label className="block text-sm font-medium text-[#8D6B4F] mb-1">
            Upload Image
          </label>
          <div
            className="w-full h-32 border-2 border-dashed border-[#D8C4A4] rounded-lg bg-[#FFF6E5] flex items-center justify-center cursor-pointer hover:bg-[#F3E8D0] transition"
            onClick={() => fileInputRef.current?.click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <span className="text-[#5B4631]">Click to upload an image</span>
            )}
          </div>
          <input
            type="file"
            name="placeImage"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#B2945B] text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-[#8D6B4F] transition"
        >
          ➕ Add Place
        </button>
      </form>

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
}
