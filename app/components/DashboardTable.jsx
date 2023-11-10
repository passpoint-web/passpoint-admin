"use client"
import React from "react"
import { useRouter } from "next/navigation"

const DashboardTable = ({ data }) => {
  const router = useRouter()

  const handleRowClick = (userId) => {
    router.push(`/user/${userId}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mt-8">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left">User ID</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Business Name</th>
            <th className="px-6 py-3 text-left">Email Address</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr
              key={user.id}
              onClick={() => handleRowClick(user.id)}
              className="cursor-pointer hover:bg-gray-100 border-t"
            >
              <td className="px-6 py-4">{user.id}</td>
              <td className="px-6 py-4">{user.name}</td>
              <td className="px-6 py-4">{user.businessName}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                <button className=" bg-gray-800 px-4 py-2 text-white rounded-xl mr-4">
                  Approve
                </button>
                <button className="text-red-500 hover:underline">Deny</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardTable
