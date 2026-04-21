"use client"

import { motion } from "framer-motion"
import { 
  FileText, 
  Users, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  ArrowUpRight,
  Plus
} from "lucide-react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"

const data = [
  { name: "Mon", submissions: 400 },
  { name: "Tue", submissions: 300 },
  { name: "Wed", submissions: 600 },
  { name: "Thu", submissions: 800 },
  { name: "Fri", submissions: 500 },
  { name: "Sat", submissions: 900 },
  { name: "Sun", submissions: 1100 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Exam
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Exams" 
          value="24" 
          change="+12%" 
          icon={<FileText className="w-5 h-5" />} 
          color="text-[#0050FF]"
        />
        <StatsCard 
          title="Active Students" 
          value="1,284" 
          change="+18%" 
          icon={<Users className="w-5 h-5" />} 
          color="text-[#00D6FF]"
        />
        <StatsCard 
          title="Submissions" 
          value="8,492" 
          change="+24%" 
          icon={<CheckCircle className="w-5 h-5" />} 
          color="text-emerald-500"
        />
        <StatsCard 
          title="Avg. Time" 
          value="42m" 
          change="-5%" 
          icon={<Clock className="w-5 h-5" />} 
          color="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass p-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-bold">Submission Trends</h3>
              <p className="text-sm text-gray-500">Weekly activity overview</p>
            </div>
            <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium bg-emerald-500/10 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4" /> +14.2%
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0050FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0050FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="submissions" 
                  stroke="#0050FF" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSub)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass p-8">
          <h3 className="text-lg font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6">
            <ActivityItem 
              user="Sarah Chen" 
              action="completed" 
              target="System Design 101" 
              time="2m ago" 
            />
            <ActivityItem 
              user="Alex Rivera" 
              action="started" 
              target="Python Advanced" 
              time="15m ago" 
            />
            <ActivityItem 
              user="James Wilson" 
              action="submitted" 
              target="React Patterns" 
              time="45m ago" 
            />
            <ActivityItem 
              user="Elena Gilbert" 
              action="graded" 
              target="Java Core" 
              time="1h ago" 
            />
          </div>
          <button className="w-full mt-8 py-3 text-sm font-medium text-gray-500 hover:text-white border border-white/5 rounded-xl hover:bg-white/5 transition-all">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ title, value, change, icon, color }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2.5 rounded-xl bg-white/5", color)}>
          {icon}
        </div>
        <div className={cn(
          "text-xs font-semibold px-2 py-0.5 rounded-full",
          change.startsWith("+") ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
        )}>
          {change}
        </div>
      </div>
      <div>
        <div className="text-gray-500 text-sm font-medium mb-1">{title}</div>
        <div className="text-2xl font-bold flex items-center justify-between">
          {value}
          <ArrowUpRight className="w-4 h-4 text-gray-700" />
        </div>
      </div>
    </motion.div>
  )
}

function ActivityItem({ user, action, target, time }: any) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold">
        {user.split(' ').map((n: string) => n[0]).join('')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm">
          <span className="font-bold text-white">{user}</span>
          <span className="text-gray-500 mx-1">{action}</span>
          <span className="text-gray-300 truncate inline-block max-w-[120px] align-bottom">{target}</span>
        </div>
        <div className="text-xs text-gray-600 mt-0.5">{time}</div>
      </div>
    </div>
  )
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ')
}
