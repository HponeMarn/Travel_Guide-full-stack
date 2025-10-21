import React, { useEffect } from "react";
import type { DestinationDto } from "../dto/DestinationDto";
import { deleteDestination, getDestinationByGuideName } from "../service/TravelAppService";
import { Link } from "react-router";
import { getLoggedInUser } from "../service/AuthService";

export default function ManageDestinations() {
  const [destinations, setDestinations] = React.useState<DestinationDto[]>([]);
  const username = getLoggedInUser();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllDestinations(username!);
  }, []);

  const fetchAllDestinations = (username: string) => {
    getDestinationByGuideName(username)
      .then((res) => setDestinations(res.data))
      .catch((err) => console.error(err));
  };

  const deleteHandler = (id: number) => {
    deleteDestination(id)
      .then(() => fetchAllDestinations(username!))
      .catch((err) => console.error(err));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#B2945B] mb-4">Manage Destinations</h2>

      <div className="bg-[#FAF7F0] p-6 rounded-2xl shadow">
        <table className="w-full border-collapse text-[#8D6B4F]">
          <thead>
            <tr className="border-b border-[#D8C4A4]">
              <th className="py-2 px-4 font-medium text-left">Image</th>
              <th className="py-2 px-4 font-medium text-left">Title</th>
              <th className="py-2 px-4 font-medium text-left">Category</th>
              <th className="py-2 px-4 font-medium text-left">Fees</th>
              <th className="py-2 px-4 font-medium text-left">Start Date</th>
              <th className="py-2 px-4 font-medium text-left">End Date</th>
              <th className="py-2 px-4 font-medium text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((dest) => (
              <tr key={dest.destinationId} className="border-b border-[#E1D7C6] hover:bg-[#FFF6E5] transition">
                <td className="py-2 px-4">
                  <img
                    src={`data:image/jpeg;base64,${dest.imageBase64}`}
                    alt={dest.title}
                    className="w-12 h-12 object-cover rounded-full border border-[#D8C4A4]"
                  />
                </td>
                <td className="py-2 px-4">{dest.title}</td>
                <td className="py-2 px-4">{dest.category}</td>
                <td className="py-2 px-4">{dest.fees} $</td>
                <td className="py-2 px-4">
                  {new Date(dest.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="py-2 px-4">
                  {new Date(dest.endDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="py-2 px-4 space-x-2 flex flex-wrap gap-2">
                  
                  <button
                    onClick={() => deleteHandler(dest.destinationId!)}
                    className="bg-[#D65A5A] text-white px-3 py-1 rounded hover:bg-[#B23B3B] transition"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/dashboard/create-places/${dest.destinationId}`}
                    className="bg-[#5AA76D] text-white px-3 py-1 rounded hover:bg-[#3B8F4C] transition"
                  >
                    Add Activity
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
