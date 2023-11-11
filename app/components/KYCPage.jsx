"use client"
import { kyc } from "@/services/restService"
import { useEffect, useState } from "react"
import DashboardCard from "../components/DashboardCard"
import DashboardTable from "../components/DashboardTable"
import FWLoader from "./FWLoader"
import TableSkeletonLoader from "./TableSkeletonLoader"

export default function KYC() {
  const [kycStats, setKycStats] = useState({})
  const [unapprovedUsers, setUnapprovedUsers] = useState([])
  const [approvedUsers, setApprovedUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [statsLoading, setStatsLoading] = useState(false)
  async function getUnapprovedUsers() {
    setIsLoading(true)
    const promise = await kyc.getUnapprovedUsers()
    setUnapprovedUsers(promise.data.data)
    setIsLoading(false)
  }
  async function getKYCStats() {
    setStatsLoading(true)
    const promise = await kyc.getKycDashboardStats()
    setKycStats(promise.data.metrics)
    setStatsLoading(false)
  }
  function refreshData() {
    getUnapprovedUsers()
    getKYCStats()
  }
  useEffect(() => {
    getUnapprovedUsers()
    getKYCStats()
  }, [])
  return (
    <main className="px-12 py-6">
      {statsLoading && <FWLoader />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="Total Users" value={kycStats?.totalUsers} />
        <DashboardCard
          title="Approved Signups"
          value={kycStats?.approvedUsers}
        />
        <DashboardCard
          title="Unapproved Signups"
          value={kycStats?.pendingUsers}
        />
        <DashboardCard
          title="Rejected Signups"
          value={kycStats?.rejectedUsers}
        />
      </div>

      {isLoading ? (
        <TableSkeletonLoader />
      ) : (
        <DashboardTable
          data={unapprovedUsers}
          approvedUsers={approvedUsers}
          setApprovedUsers={setApprovedUsers}
          refreshData={refreshData}
        />
      )}
    </main>
  )
}
