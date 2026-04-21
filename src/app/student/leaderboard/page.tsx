"use client"

import { motion } from "framer-motion"
import { 
  Trophy, 
  Medal, 
  Search, 
  Filter, 
  ArrowUp, 
  ArrowDown,
  Timer
} from "lucide-react"

const leaderboardData = [
  { rank: 1, name: "Sarah Chen", score: 98, time: "38:42", submissions: 12, points: 2450, trend: "up" },
  { rank: 2, name: "Alex Rivera", score: 96, time: "41:15", submissions: 15, points: 2380, trend: "down" },
  { rank: 3, name: "James Wilson", score: 95, time: "35:20", submissions: 10, points: 2310, trend: "stable" },
  { rank: 4, name: "Elena Gilbert", score: 92, time: "45:00", submissions: 18, points: 2150, trend: "up" },
  { rank: 5, name: "Michael Scott", score: 90, time: "52:10", submissions: 20, points: 2040, trend: "up" },
]

export default function LeaderboardPage() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-[#0050FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-8 h-8 text-[#0050FF]" />
        </div>
        <h1 className="text-4xl font-bold">Global Leaderboard</h1>
        <p className="text-gray-500 max-w-xl mx-auto">See how you stack up against the best minds in the platform. Ranks are updated in real-time.</p>
      </div>

      {/* Top 3 Podiums */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-10 pb-20">
        <PodiumCard rank={2} name="Alex Rivera" points="2,380" color="text-gray-400" />
        <PodiumCard rank={1} name="Sarah Chen" points="2,450" color="text-amber-500" highlight />
        <PodiumCard rank={3} name="James Wilson" points="2,310" color="text-amber-700" />
      </div>

      <div className="glass p-8">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Find a student..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0050FF]/50"
            />
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium flex items-center gap-2">
              <Filter className="w-4 h-4" /> All Time
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/5">
                <th className="pb-6 px-4">Rank</th>
                <th className="pb-6 px-4">Student</th>
                <th className="pb-6 px-4">Points</th>
                <th className="pb-6 px-4">Avg. Score</th>
                <th className="pb-6 px-4 text-right">Avg. Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leaderboardData.map((row) => (
                <tr key={row.rank} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-400">#{row.rank}</span>
                      {row.trend === "up" && <ArrowUp className="w-3 h-3 text-emerald-500" />}
                      {row.trend === "down" && <ArrowDown className="w-3 h-3 text-red-500" />}
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs">
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold group-hover:text-white transition-colors">{row.name}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-white font-bold">{row.points.toLocaleString()}</td>
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-2">
                       <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#0050FF]" style={{ width: `${row.score}%` }} />
                      </div>
                      <span className="text-xs text-gray-400">{row.score}%</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-right tabular-nums text-gray-400">
                    <div className="flex items-center justify-end gap-2">
                      <Timer className="w-3.5 h-3.5" /> {row.time}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function PodiumCard({ rank, name, points, color, highlight }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={cn(
        "glass p-8 flex flex-col items-center text-center relative",
        highlight ? "border-[#0050FF]/50 bg-[#0050FF]/5 scale-110 z-10 shadow-[0_0_40px_rgba(0,80,255,0.1)]" : "bg-white/[0.02]"
      )}
    >
      <div className={cn("text-5xl font-black mb-6", color)}>
        {rank === 1 ? <Medal className="w-12 h-12" /> : `#${rank}`}
      </div>
      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-bold mb-4">
        {name.split(' ').map((n: string) => n[0]).join('')}
      </div>
      <div className="font-bold text-xl mb-1">{name}</div>
      <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">{points} Points</div>
      {highlight && <div className="px-4 py-1 rounded-full bg-[#0050FF] text-white text-[10px] font-bold uppercase tracking-widest">Champion</div>}
    </motion.div>
  )
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ')
}
