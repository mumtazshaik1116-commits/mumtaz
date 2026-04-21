"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Clock, 
  CheckCircle2,
  XCircle,
  Eye,
  Edit2,
  Trash2,
  Download
} from "lucide-react"

const exams = [
  { 
    id: "1", 
    title: "System Design Fundamentals", 
    duration: 60, 
    questions: 20, 
    status: "published", 
    date: "2024-04-25",
    enrolled: 124
  },
  { 
    id: "2", 
    title: "React Patterns & Advanced Hooks", 
    duration: 45, 
    questions: 15, 
    status: "draft", 
    date: "2024-04-28",
    enrolled: 0
  },
  { 
    id: "3", 
    title: "Python Data Structures", 
    duration: 90, 
    questions: 30, 
    status: "expired", 
    date: "2024-04-10",
    enrolled: 542
  },
]

export default function ExamManagement() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Exam Management</h1>
          <p className="text-gray-500 mt-1">Create, manage, and publish examinations.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none btn-secondary flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Download Template
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-1 sm:flex-none btn-primary flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Exam
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search exams..." 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0050FF]/50"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
            <Filter className="w-4 h-4" /> Status
          </button>
          <button className="flex-1 md:flex-none px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" /> Date Range
          </button>
        </div>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>

      {/* Create Modal Placeholder */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl glass p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Create New Exam</h2>
                <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full">
                  <XCircle className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Exam Title</label>
                  <input className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#0050FF]/50" placeholder="e.g. Advanced TypeScript Assessment" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Duration (Minutes)</label>
                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#0050FF]/50" placeholder="60" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Passing Percentage</label>
                    <input type="number" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#0050FF]/50" placeholder="40" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Start Time</label>
                    <input type="datetime-local" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#0050FF]/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">End Time</label>
                    <input type="datetime-local" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:border-[#0050FF]/50" />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setIsCreateModalOpen(false)} className="flex-1 btn-secondary py-3">Cancel</button>
                  <button type="submit" className="flex-1 btn-primary py-3">Create & Add Questions</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ExamCard({ exam }: any) {
  const statusColors: any = {
    published: "bg-emerald-500/10 text-emerald-500",
    draft: "bg-amber-500/10 text-amber-500",
    expired: "bg-red-500/10 text-red-500"
  }

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass p-6 group relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-6">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize z-10 ${statusColors[exam.status]}`}>
          {exam.status}
        </span>
        <button className="p-1 hover:bg-white/5 rounded-lg z-10">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="text-xl font-bold group-hover:text-[#0050FF] transition-colors">{exam.title}</h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1.5 border-r border-white/10 pr-4">
            <Clock className="w-4 h-4" /> {exam.duration}m
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> {exam.questions} Questions
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Calendar className="w-4 h-4" /> {new Date(exam.date).toLocaleDateString()}
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="text-sm font-medium">
          <span className="text-white">{exam.enrolled}</span>
          <span className="text-gray-500 ml-1">Enrolled</span>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-[#0050FF]/10 text-gray-500 hover:text-[#0050FF] transition-all rounded-lg" title="Preview">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-amber-500/10 text-gray-500 hover:text-amber-500 transition-all rounded-lg" title="Edit">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all rounded-lg" title="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Subtle bottom gradient on hover */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#0050FF] to-[#00D6FF] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  )
}
