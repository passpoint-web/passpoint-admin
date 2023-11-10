"use client"
import UserDetailPage from "@/app/components/UserDetailPage"
import { useSearchParams } from "next/navigation"

const UserDetail = () => {
  const searchParams = useSearchParams
  const { user_id } = searchParams

  // Fetch user data or use dummy data
  const user = {
    id: user_id,
    companyName: "TravelCo Inc.",
    registrationNumber: "TRV123456",
    contactPerson: "John Doe",
    businessLicenseImage: "/path/to/business_license.jpg",
    otherDocumentImage: "/path/to/other_document.jpg",
    // Add more KYC details and document images as needed
  }

  return <UserDetailPage user={user} />
}

export default UserDetail
