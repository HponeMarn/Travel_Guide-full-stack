import React, { useEffect, useState } from 'react'
import { createCategory, getallCategories } from '../service/TravelAppService'
import type { CategoryDto } from '../dto/CategoryDto'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function CreateCategory() {
  const [category, setCategory] = useState<string>('')
  const [categories, setCategories] = useState<CategoryDto[]>([])

  useEffect(() => {
    fetchAllCategories()
  }, [])

  const addCategory = (e: React.FormEvent) => {
    e.preventDefault()

    if (!category.trim()) {
      toast.error("⚠️ Category name is required!", { position: "top-center" })
      return
    }

    const categoryDto: CategoryDto = { categoryName: category }

    createCategory(categoryDto)
      .then((res) => {
        toast.success("✅ Category created successfully!", { position: "top-center" })
        setCategory('')
        fetchAllCategories()
      })
      .catch((err) => {
        console.log(err)
        toast.error("❌ Failed to create category!", { position: "top-center" })
      })
  }

  const fetchAllCategories = () => {
    getallCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <div className="p-6 rounded-xl shadow mt-8" style={{ backgroundColor: "#FAF7F0" }}>
      <h2 className="text-2xl font-bold mb-4 text-[#8D6B4F]">Create Category</h2>

      <form onSubmit={addCategory} className="flex flex-col md:flex-row gap-4">
       <input
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  type="text"
  placeholder="Category name"
  className="flex-1 border border-[#B2945B] rounded-lg px-4 py-2 
             text-[#8D6B4F] placeholder:text-[#B2945B] 
             focus:outline-none focus:ring-2 focus:ring-[#B2945B] bg-white"
/>

        <button
          type="submit"
          className="bg-[#B2945B] text-white px-6 py-2 rounded-lg hover:bg-[#8D6B4F] transition-all duration-300"
        >
          Add Category
        </button>
      </form>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#B2945B] text-[#FAF7F0]">
            <tr>
              <th className="px-4 py-2 border border-[#E8DAB7]">ID</th>
              <th className="px-4 py-2 border border-[#E8DAB7]">Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="hover:bg-[#E8DAB7]">
                <td className="px-4 py-2 border border-[#E8DAB7] text-[#8D6B4F]">{c.id}</td>
                <td className="px-4 py-2 border border-[#E8DAB7] text-[#8D6B4F]">{c.categoryName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast container for popup */}
      <ToastContainer />
    </div>
  )
}
