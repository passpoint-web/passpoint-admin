"use client"
import { kyc } from "@/services/restService"
import { useEffect, useState } from "react"
import DashboardCard from "../components/DashboardCard"
import DashboardTable from "../components/DashboardTable"
import TableSkeletonLoader from "./TableSkeletonLoader"

export default function KYC() {
  const [unapprovedUsers, setUnapprovedUsers] = useState([])
  const [approvedUsers, setApprovedUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  async function getUnapprovedUsers() {
    setIsLoading(true)
    const promise = await kyc.getUnapprovedUsers()
    setUnapprovedUsers(promise.data.data)
    setIsLoading(false)
  }
  useEffect(() => {
    getUnapprovedUsers()
  }, [])
  return (
    <main className="px-12 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="New Signups" value="- - -" />
        <DashboardCard title="Approved Signups" value="- - -" />
        <DashboardCard
          title="Unapproved Signups"
          value={
            unapprovedUsers?.filter(
              (user) => !approvedUsers?.includes(user.userId)
            ).length
          }
        />
        <DashboardCard title="Rejected Signups" value="- - -" />
      </div>

      {isLoading ? (
        <TableSkeletonLoader />
      ) : (
        <DashboardTable
          data={unapprovedUsers}
          approvedUsers={approvedUsers}
          setApprovedUsers={setApprovedUsers}
        />
      )}
    </main>
  )
}
