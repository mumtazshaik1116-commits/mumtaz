"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Exams", href: "/admin/exams", icon: FileText },
  { name: "Students", href: "/admin/students", icon: Users },
  { name: "Results", href: "/admin/results", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed left-0 top-0 h-full bg-[#080808] border-r border-white/5 transition-all duration-300 z-50",
          isSidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div className={cn("flex items-center gap-2", !isSidebarOpen && "hidden")}>
            <div className="w-8 h-8 bg-[#0050FF] rounded-lg flex items-center justify-center font-bold">N</div>
            <span className="font-bold tracking-tight">NEXUS</span>
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-white/5 rounded-md">
            {isSidebarOpen ? <X className="w-5 h-5 text-gray-500" /> : <Menu className="w-5 h-5 text-gray-500" />}
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-[#0050FF]/10 text-[#0050FF]" 
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-[#0050FF]" : "group-hover:text-white")} />
                {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                {isActive && <motion.div layoutId="active" className="absolute left-0 w-1 h-6 bg-[#0050FF] rounded-r-full" />}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-8 left-0 w-full px-4">
          <button className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-white transition-all w-full rounded-xl hover:bg-white/5">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search exams, students..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0050FF]/50"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-white/5 rounded-full relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#00D6FF] rounded-full border-2 border-[#050505]" />
            </button>
            <div className="h-8 w-px bg-white/10 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-medium">Admin Account</div>
                <div className="text-xs text-gray-500">Super Admin</div>
              </div>
              <div className="w-10 h-10 bg-[#0050FF]/20 border border-[#0050FF]/20 rounded-full flex items-center justify-center text-[#0050FF] font-bold">
                AD
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
