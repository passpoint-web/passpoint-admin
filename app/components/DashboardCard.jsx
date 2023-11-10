const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 py-4 rounded-lg border border-slate-100">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="text-2xl mt-2">{value}</p>
    </div>
  )
}

export default DashboardCard
