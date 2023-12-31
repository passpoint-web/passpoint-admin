import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <main className="main-width bg-slate-50 min-h-screen">
            <Navbar />
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
