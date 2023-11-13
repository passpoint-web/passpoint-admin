"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const Sidebar = () => {
  const pathname = usePathname()
  const routes = [
    {
      name: "KYC",
      path: "/kyc",
      otherPath: "user",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ]

  return (
    <div className="fixed top-0 left-0 bottom-0 w-[280px] bg-slate-100">
      <div className="p-4 pt-6 h-[80px]">
        <Link href="/" className="block">
          <h1 className="text-2xl font-semibold">Passpoint Admin</h1>
        </Link>
      </div>
      <ul className="mb-4">
        <li>
          {routes.map((route) => (
            <Link
              href={route.path}
              key={route.name}
              className={`hover:text-white hover:bg-gray-400  px-4 py-4 block font-semibold ${
                pathname.includes(route.path) ||
                pathname.includes(route.otherPath)
                  ? "bg-gray-300"
                  : ""
              }`}
            >
              {route.name}
            </Link>
          ))}
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
