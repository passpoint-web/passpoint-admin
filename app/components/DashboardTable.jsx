"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { setSelectedUser } from "@/services/localService"
import { kyc } from "@/services/restService"

const DashboardTable = ({ data, approvedUsers, setApprovedUsers }) => {
  const router = useRouter()
  const [approveRowLoading, setApproveRowLoading] = useState(null)

  const handleRowClick = (user) => {
    setSelectedUser(user)
    router.push(`/user/${user.userId}`)
  }

  const handleApprove = async (userId) => {
    setApproveRowLoading(userId)
    await kyc.approveKYC(userId)
    addApprovedUser(userId)
    setApproveRowLoading(null)
  }

  const addApprovedUser = async (userId) => {
    const temp = [...approvedUsers]
    temp.push(userId)
    setApprovedUsers(temp)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mt-8">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left whitespace-nowrap">User ID</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Business Name</th>
            <th className="px-6 py-3 text-left">Email Address</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.filter((user) => !approvedUsers?.includes(user.userId))
            .map((user) => (
              <tr
                key={user.id}
                onClick={() => handleRowClick(user)}
                className="cursor-pointer hover:bg-gray-100 border-t"
              >
                <td className="px-6 py-4">{user.userId}</td>
                <td className="px-6 py-4">
                  {user.firstName || "N/A"} {user.lastName}
                </td>
                <td className="px-6 py-4">{user.businessName || "N/A"}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-nowrap">
                    <button
                      className=" bg-gray-800 px-4 py-2 text-white rounded-xl mr-4 text-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleApprove(user.userId)
                      }}
                    >
                      {approveRowLoading === user?.userId
                        ? "approving..."
                        : "Approve"}
                    </button>
                    <button
                      className="text-red-500 hover:underline text-sm"
                      disabled
                    >
                      Deny
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardTable
