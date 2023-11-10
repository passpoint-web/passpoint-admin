import Image from "next/image"
import DashboardCard from "../components/DashboardCard"
import DashboardTable from "../components/DashboardTable"

export default function KYCPage() {
  const userData = [
    {
      id: 1,
      name: "John Doe",
      businessName: "Doe Enterprises",
      email: "johndoe@example.com",
    },
    {
      id: 2,
      name: "John Doe",
      businessName: "Doe Enterprises",
      email: "johndoe@example.com",
    },
    {
      id: 3,
      name: "John Doe",
      businessName: "Doe Enterprises",
      email: "johndoe@example.com",
    },
    {
      id: 4,
      name: "John Doe",
      businessName: "Doe Enterprises",
      email: "johndoe@example.com",
    },
    {
      id: 5,
      name: "John Doe",
      businessName: "Doe Enterprises",
      email: "johndoe@example.com",
    },
    // Add more user data entries
  ]
  return (
    <main className="px-12 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="New Signups" value="25" />
        <DashboardCard title="Approved Signups" value="15" />
        <DashboardCard title="Rejected Signups" value="5" />
        <DashboardCard title="Most Recent Signup" value="2023-11-08" />
      </div>
      <DashboardTable data={userData} />
    </main>
  )
}
