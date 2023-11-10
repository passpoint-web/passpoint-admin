/* eslint-disable @next/next/no-img-element */
import React from "react"

export default function UserDetailPage({ user }) {
  const handleApprove = () => {
    // Implement your approval logic here
    console.log("User Approved")
  }

  const handleReject = () => {
    // Implement your rejection logic here
    console.log("User Rejected")
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mx-6 my-6">
      <div className="flex justify-between items-center mb-6 p-6 py-4 bg-[#009ec410] rounded-xl">
        <h2 className="text-xl font-semibold">John Doe</h2>
        <div>
          <button
            onClick={handleApprove}
            className=" bg-gray-800 px-4 py-2 text-white rounded-xl mr-2"
          >
            Approve User
          </button>
          <button
            onClick={handleReject}
            className="text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white"
          >
            Reject
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 mt-12">
        <div>
          <h3 className="text-xl font-semibold mb-2">User Information</h3>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Full Name</label>
            <p>This is the Value</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Email Address</label>
            <p>This is the Value</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">House Address</label>
            <p>This is the Value</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Phone Number</label>
            <p>This is the Value</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">BVN</label>
            <p>This is the Value</p>
          </div>
        </div>
        <div className="border-l border-slate-100 pl-8 ml-8">
          <h3 className="text-xl font-semibold mb-2">Company Information</h3>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Company Name</label>
            <p>This is the Value</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Company Address</label>
            <p>This is the Value</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">CAC Info</label>
            <p>This is the Value</p>
          </div>
        </div>
        <div className="mt-7">
          <h3 className="text-xl font-semibold mb-2"></h3>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Company Name</label>
            <p>This is the Value</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">Company Address</label>
            <p>This is the Value</p>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">CAC Info</label>
            <p>This is the Value</p>
          </div>
        </div>
      </div>

      {/* VERIFICATION DOCUMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mt-8 py-8 border-t border-slate-100">
        <div>
          <h3 className="text-xl font-semibold mb-2">Verification Documents</h3>
          <div className="mb-4">
            <label className="font-medium text-gray-500">
              Business License
            </label>
            <img
              src={user.businessLicenseImage}
              alt="Business License"
              className="w-full h-auto"
            />
          </div>
          <div>
            <label className="font-medium text-gray-500">Other Document</label>
            <img
              src={user.otherDocumentImage}
              alt="Other Document"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
