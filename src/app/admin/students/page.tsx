"use client"

import { useState } from "react"
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  TrendingUp, 
  Clock,
  CheckCircle2,
  XCircle,
  FileDown,
  UserPlus,
  RefreshCw
} from "lucide-react"
import { motion } from "framer-motion"

const students = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com", exams: 12, avgScore: 92, lastActive: "2m ago", status: "active" },
  { id: "2", name: "Alex Rivera", email: "alex@example.com", exams: 15, avgScore: 88, lastActive: "15m ago", status: "active" },
  { id: "3", name: "James Wilson", email: "james@example.com", exams: 10, avgScore: 85, lastActive: "1h ago", status: "active" },
  { id: "4", name: "Elena Gilbert", email: "elena@example.com", exams: 18, avgScore: 78, lastActive: "3h ago", status: "inactive" },
  { id: "5", name: "Michael Scott", email: "michael@dundermifflin.com", exams: 5, avgScore: 42, lastActive: "1d ago", status: "blocked" },
]

export default function StudentManagement() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Student Management</h1>
          <p className="text-gray-500 mt-1">Manage enrollments, monitor activity, and grant permissions.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none btn-secondary flex items-center justify-center gap-2">
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
          <button className="flex-1 sm:flex-none btn-primary flex items-center justify-center gap-2">
            <UserPlus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StudentStat icon={<Users className="text-[#0050FF]" />} label="Total Students" value="1,284" />
        <StudentStat icon={<Clock className="text-amber-500" />} label="Active (Last 24h)" value="842" />
        <StudentStat icon={<TrendingUp className="text-emerald-500" />} label="Avg. Platform Grade" value="76%" />
      </div>

      <div className="glass p-0 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between items-center bg-white/[0.01]">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0050FF]/50"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
                <th className="py-4 px-6 font-bold">Student</th>
                <th className="py-4 px-6 font-bold">Exams Taken</th>
                <th className="py-4 px-6 font-bold">Avg. Score</th>
                <th className="py-4 px-6 font-bold">Last Active</th>
                <th className="py-4 px-6 font-bold">Status</th>
                <th className="py-4 px-6 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {students.map((student) => (
                <tr key={student.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0050FF]/10 text-[#0050FF] flex items-center justify-center font-bold text-xs uppercase">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white transition-colors">{student.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1"><Mail className="w-3 h-3" /> {student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm tabular-nums">{student.exams}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className={cn("h-full", student.avgScore > 80 ? "bg-emerald-500" : "bg-amber-500")} style={{ width: `${student.avgScore}%` }} />
                      </div>
                      <span className="text-xs font-bold">{student.avgScore}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-gray-500">{student.lastActive}</td>
                  <td className="py-4 px-6">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      student.status === "active" ? "bg-emerald-500/10 text-emerald-500" : 
                      student.status === "blocked" ? "bg-red-500/10 text-red-500" : "bg-gray-500/10 text-gray-400"
                    )}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                       <button className="p-2 hover:bg-[#00D6FF]/10 text-gray-500 hover:text-[#00D6FF] transition-all rounded-lg" title="Grant Retake">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white/5 text-gray-500 hover:text-white transition-all rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-white/5 flex items-center justify-between text-sm text-gray-500 bg-white/[0.01]">
          <div>Showing 5 of 1,284 students</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/5 rounded-lg hover:bg-white/10 transition-all disabled:opacity-30" disabled>Previous</button>
            <button className="px-3 py-1 bg-white/5 rounded-lg hover:bg-white/10 transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StudentStat({ icon, label, value }: any) {
  return (
    <div className="glass p-6 flex items-center gap-6">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl">
        {icon}
      </div>
      <div>
        <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-0.5">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
    </div>
  )
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ')
}
