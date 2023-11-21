
"use client";
import { getSelectedUser } from "@/services/localService";
import { kyc } from "@/services/restService";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FWLoader from "./FWLoader";
import Image from "next/image";
import { Download } from "../icons";


export default function UserDetailPage() {
  const { user_id } = useParams()
  const selectedUser = getSelectedUser()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [user, setUser] = useState({})
  const [userApproved, setUserApproved] = useState(false)
  const router = useRouter()

  const handleApprove = async (userId) => {
    setIsUploading(true);
    await kyc.approveKYC(userId);
    setUserApproved(true);
    setIsUploading(false);
    router.push("/kyc");
  };

  const handleReject = async (userId) => {
    setIsUploading(true);
    await kyc.rejectKYC(userId);
    setUserApproved(true);
    setIsUploading(false);
    router.push("/kyc");
  };

  const getSingleKYCInfo = async () => {
    try {
      setIsLoading(true);
      const res = await kyc.getKycSingleDetails(user_id);
      setUser({ ...user, ...res.data.data });
      console.log(res.data.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    setUser(selectedUser)
  }, [])
  useEffect(() => {
    if (user_id) {
      getSingleKYCInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mx-6 my-6">
      {isLoading && <FWLoader />}
      <div className="flex justify-between items-center mb-6 p-6 py-4 bg-[#009ec410] rounded-xl h-[120px] relative">
        <div>
          <h2 className="text-xl font-semibold text-[#009ec4]">
            {user?.firstName || "N/A"} {user?.lastName || "N/A"}
          </h2>
          {user?.KycStage ? (
            <p className="capitalize text-sm text-gray-500">
              {user?.kycType} {", "}
              {user?.KycStage && (
                <span>KYC {(user.KycStage / 4) * 100}% complete</span>
              )}
            </p>
          ) : (
            <p className="capitalize text-sm text-gray-500">KYC Incomplete</p>
          )}
        </div>
        {!userApproved && (
          <div>
            <button
              onClick={() => handleApprove(user_id)}
              className=" bg-gray-800 px-4 py-2 text-white rounded-xl mr-2"
            >
              Approve User
            </button>
            <button
              onClick={() => handleReject(user_id)}
              className="text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white"
            >
              Reject
            </button>
          </div>
        )}
        {isUploading && (
          <div className="absolute right-[300px]">
            <FWLoader />
          </div>
        )}
        <progress
          max={4}
          value={user?.KycStage}
          className="absolute right-0 left-0 w-[100%]"
        ></progress>
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
            <p>N/A</p>
          </div>
        </div>
      </div>

      {/* VERIFICATION DOCUMENTS */}
      <div className="px-4 mt-8 py-8 border-t border-slate-100">
        <div>
          <h3 className="text-xl font-semibold mb-2">Uploaded Documents</h3>
          <div className="mb-4">
            <label className="font-medium text-gray-500">
              Proof of Identity
            </label>
            <ul className="mt-2 p-6 w-[80%] grid gap-8 grid-cols-fluidMedium border-[2px] transition-g">
              {!user.kycType && (
                <small className="block text-[15px] font-medium capitalize">
                  N/A
                </small>
              )}
              {user.kycType === "individual" ? (
                <div>
                  <small className="block text-[15px] font-medium capitalize mb-2">
                    {user.proofIdentity.identityDocumentType}
                  </small>
                  <p className="text-[18px] break-words font-bold text-gray-700">
                    {user.proofIdentity.identityDocumentNumber}
                  </p>
                </div>
              ) : (
                <>
                  {user.proofIdentity?.map((doc) => (
                    <li key={doc.id} className="bg w-fit">
                      <small className="block text-[16px] font-medium capitalize mb-4">
                        {doc.docName}
                      </small>
                      <div className="relative w-fit h-fit group transition-all border-[1px]">
                        <Image
                          src={`${doc.docFile}`}
                          width={350}
                          height={100}
                          alt="kyc images"
                          className="max-h-[500px]"
                        />
                        <div className="group-hover:grid hidden bg-[rgba(0,0,0,0.6)] h-full z-10 absolute top-0 left-0 w-full place-content-center transition-g">
                          <a
                            href={doc.docFile}
                            download={`${user.lastName} proof of identity`}
                          >
                            <Download />
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
          <div className="mb-4">
            <label className="font-medium text-gray-500">
              Proof of Address
            </label>
            <ul className="mt-2 p-6 w-[80%] border-[2px]">
              <li className="bg w-fit">
                <small className="block text-[16px] font-medium capitalize mb-4">
                  {user.proofAddress?.addressDocumentType || "N/A"}
                </small>
                <div className="relative w-fit h-fit group transition-all border-[1px]">
                  {user.proofAddress?.addressDocumentFile && (
                    <Image
                      src={`${user.proofAddress.addressDocumentFile}`}
                      width={350}
                      height={100}
                      alt="kyc images"
                      className="max-h-[500px]"
                    />
                  )}
                  <div className="group-hover:grid hidden bg-[rgba(0,0,0,0.6)] h-full z-10 absolute top-0 left-0 w-full place-content-center transition-g">
                    <a
                      href={user.proofAddress?.addressDocumentFile}
                      download={`${user.lastName} proof of address`}
                    >
                      <Download />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
