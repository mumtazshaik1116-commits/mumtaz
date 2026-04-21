"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Home, 
  BookOpen, 
  Trophy, 
  User, 
  LogOut,
  Bell
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Top Navbar */}
      <nav className="h-20 border-b border-white/5 sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md px-8 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/student" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0050FF] rounded-lg flex items-center justify-center font-bold text-white">N</div>
            <span className="text-xl font-bold tracking-tight text-white">NEXUS</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="/student" icon={<Home className="w-4 h-4" />} active={pathname === "/student"}>Dashboard</NavLink>
            <NavLink href="/student/exams" icon={<BookOpen className="w-4 h-4" />} active={pathname === "/student/exams"}>My Exams</NavLink>
            <NavLink href="/student/leaderboard" icon={<Trophy className="w-4 h-4" />} active={pathname === "/student/leaderboard"}>Leaderboard</NavLink>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="p-2 hover:bg-white/5 rounded-full relative text-gray-400">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#00D6FF] rounded-full" />
          </button>
          
          <div className="flex items-center gap-3 border-l border-white/10 pl-6">
            <div className="text-right">
              <div className="text-sm font-medium text-white">John Student</div>
              <div className="text-xs text-gray-500">Rank: #42</div>
            </div>
            <Link href="/student/profile" className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0050FF] to-[#00D6FF] flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,80,255,0.3)]">
              JS
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        {children}
      </main>
    </div>
  )
}

function NavLink({ href, icon, active, children }: any) {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-2 text-sm font-medium transition-all px-4 py-2 rounded-full",
        active ? "bg-[#0050FF]/10 text-[#0050FF]" : "text-gray-400 hover:text-white"
      )}
    >
      {icon}
      {children}
    </Link>
  )
}
