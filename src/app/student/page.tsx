"use client"

import { motion } from "framer-motion"
import { 
  Calendar, 
  Clock, 
  Award, 
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  History
} from "lucide-react"
import Link from "next/link"

const upcomingExams = [
  { id: "1", title: "System Design 101", startTime: "2024-04-25T10:00:00", duration: 60, questions: 20 },
  { id: "2", title: "Advanced React Patterns", startTime: "2024-04-28T14:30:00", duration: 45, questions: 15 },
]

const pastResults = [
  { id: "101", title: "JavaScript Core", score: 85, total: 100, date: "2024-04-10", status: "pass" },
  { id: "102", title: "Database Systems", score: 92, total: 100, date: "2024-04-05", status: "pass" },
  { id: "103", title: "Network Security", score: 35, total: 100, date: "2024-03-28", status: "fail" },
]

export default function StudentDashboard() {
  return (
    <div className="space-y-12">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-[32px] p-12 bg-gradient-to-br from-[#0050FF]/20 to-[#00D6FF]/5 border border-white/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0050FF]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Good morning, John!</h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            You have <span className="text-white font-bold">2 upcoming exams</span> this week. Your current overall rank is <span className="text-[#00D6FF] font-bold">#42</span> out of 1,200 students.
          </p>
          <div className="flex gap-4">
            <button className="btn-primary">View Upcoming</button>
            <button className="btn-secondary">Check Leaderboard</button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Upcoming Exams */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#0050FF]" /> Upcoming Exams
            </h2>
            <Link href="/student/exams" className="text-sm text-gray-500 hover:text-white flex items-center gap-1 group">
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingExams.map((exam) => (
              <motion.div 
                key={exam.id}
                whileHover={{ x: 10 }}
                className="glass p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex gap-6 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                    <span className="text-xs text-gray-500 uppercase font-bold">Apr</span>
                    <span className="text-xl font-bold">{new Date(exam.startTime).getDate()}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-[#0050FF] transition-colors">{exam.title}</h3>
                    <div className="flex gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exam.duration}m</span>
                      <span className="flex items-center gap-1 font-medium text-[#00D6FF]">Starting in 2 days</span>
                    </div>
                  </div>
                </div>
                <Link href={`/student/exams/${exam.id}`} className="btn-secondary py-2.5 px-8 group-hover:bg-[#0050FF] group-hover:border-[#0050FF] group-hover:text-white transition-all">
                  Register
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Past Performance Summary */}
          <div className="pt-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-emerald-500" /> performance summary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <SummaryCard label="Avg. Score" value="78%" icon={<Award className="text-amber-500" />} />
              <SummaryCard label="Exams Taken" value="12" icon={<CheckCircle2 className="text-emerald-500" />} />
              <SummaryCard label="Time Spent" value="8.4h" icon={<Clock className="text-[#0050FF]" />} />
            </div>
          </div>
        </div>

        {/* Right Column: Recent Results & Stats */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <History className="w-6 h-6 text-gray-400" /> Recent Results
            </h2>
          </div>

          <div className="glass p-8 space-y-6">
            {pastResults.map((result) => (
              <div key={result.id} className="flex justify-between items-center group">
                <div>
                  <div className="font-bold text-sm mb-0.5">{result.title}</div>
                  <div className="text-xs text-gray-500">{new Date(result.date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "text-sm font-bold",
                    result.status === "pass" ? "text-emerald-500" : "text-red-500"
                  )}>
                    {result.score}/{result.total}
                  </div>
                  <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Score</div>
                </div>
              </div>
            ))}
            <button className="w-full pt-4 text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-2">
              All Results <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Notifications Card */}
          <div className="glass p-8 bg-[#00D6FF]/5 border-[#00D6FF]/10">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-[#00D6FF]" />
              <h3 className="font-bold">Notifications</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your "Network Security" result has been updated. You can now request a retake from your instructor.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, icon }: any) {
  return (
    <div className="glass p-6 border-white/5 space-y-2">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{label}</div>
      </div>
    </div>
  )
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ')
}
