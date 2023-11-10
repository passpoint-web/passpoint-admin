/* eslint-disable @next/next/no-img-element */
"use client"
import { getSelectedUser } from "@/services/localService"
import { kyc } from "@/services/restService"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function UserDetailPage() {
  const { user_id } = useParams()
  const selectedUser = getSelectedUser()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [user, setUser] = useState(selectedUser || {})
  const [userApproved, setUserApproved] = useState(false)

  const handleApprove = async (userId) => {
    setIsUploading(true)
    await kyc.approveKYC(userId)
    setUserApproved(true)
    setIsUploading(false)
  }

  const handleReject = async () => {
    // Implement your rejection logic here
    console.log("User Rejected")
  }

  const getSingleKYCInfo = async () => {
    const promise = await kyc.getKycSingleDetails(user_id)
    console.log("user", user)
    setUser({ ...user, ...promise.data.data })
  }

  useEffect(() => {
    if (user_id) {
      getSingleKYCInfo()
    }
  }, [user_id])

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mx-6 my-6">
      <div className="flex justify-between items-center mb-6 p-6 py-4 bg-[#009ec410] rounded-xl h-[80px]">
        <h2 className="text-xl font-semibold text-[#009ec4]">
          {user.firstName || "N/A"} {user.lastName}{" "}
        </h2>
        {!userApproved && (
          <div>
            <button
              onClick={() => handleApprove(user_id)}
              className=" bg-gray-800 px-4 py-2 text-white rounded-xl mr-2"
            >
              {isUploading ? "Approving..." : "Approve User"}
            </button>
            <button
              onClick={handleReject}
              className="text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white"
              disabled
            >
              Reject
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-12">
        <div>
          <h3 className="text-xl font-semibold mb-2">User Information</h3>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Full Name</label>
            <p>
              {user.firstName || "N/A"} {user.lastName}{" "}
            </p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Email Address</label>
            <p>{user.email}</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">House Address</label>
            <p>{user.address}</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Phone Number</label>
            <p>{user.phoneNumber}</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Signup Date</label>
            <p>{user.dateOnboarded}</p>
          </div>
        </div>
        <div className="border-l border-slate-100 pl-8 ml-8">
          <h3 className="text-xl font-semibold mb-2">Business Information</h3>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Business Name</label>
            <p>{user.businessName}</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">
              Business Address
            </label>
            <p>{user.businessAddress || "N/A"}</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">
              Business Website
            </label>
            <p>{user.businessInfo?.websiteURL || "N/A"}</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">RC Number</label>
            <p>{user.rcNumber || "N/A"}</p>
          </div>
        </div>
        <div className="mt-7">
          <h3 className="text-xl font-semibold mb-2"></h3>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Business Type</label>
            <p>{user.businessType || "N/A"}</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">
              Business Industry
            </label>
            <p>{user.businessIndustry || "N/A"}</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">CAC Info</label>
          </div>
        </div>
      </div>

      {/* VERIFICATION DOCUMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mt-8 py-8 border-t border-slate-100">
        <div>
          <h3 className="text-xl font-semibold mb-2">Uploaded Documents</h3>
          <div className="mb-4">
            <label className="font-medium text-gray-500">
              Proof of Identity
            </label>
            <ul className="mt-2">
              {user.proofIdentity?.map((doc) => (
                <li key={doc.id} className="">
                  <a
                    href={doc.docFile}
                    download
                    className="capitalize text-[#009ec4] hover:underline"
                  >
                    Download {doc.docName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">
              Proof of Address
            </label>
            <ul className="mt-2">
              <li className="">
                <a
                  href={user?.proofAddress?.addressDocumentFile}
                  download
                  className="capitalize text-[#009ec4] hover:underline"
                >
                  Download {user?.proofAddress?.addressDocumentType}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
