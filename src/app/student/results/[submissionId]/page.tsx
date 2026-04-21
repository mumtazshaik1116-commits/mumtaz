"use client"

import { motion } from "framer-motion"
import { 
  CheckCircle, 
  XCircle, 
  Download, 
  Share2, 
  Award,
  ChevronRight,
  PieChart as PieIcon,
  Timer
} from "lucide-react"
import Link from "next/link"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const resultData = {
  score: 85,
  total: 100,
  passingScore: 40,
  timeTaken: "42:15",
  correctAnswers: 17,
  wrongAnswers: 3,
  unanswered: 0,
  status: "Pass",
  rank: 42,
  history: [
    { name: "Correct", value: 17, color: "#10b981" },
    { name: "Wrong", value: 3, color: "#ef4444" },
    { name: "Unanswered", value: 0, color: "#333" },
  ]
}

export default function ResultPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Exam Results</h1>
          <p className="text-gray-500 mt-1">Detailed analysis of your performance.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary flex items-center gap-2"><Download className="w-4 h-4" /> Download PDF</button>
          <button className="btn-primary flex items-center gap-2"><Share2 className="w-4 h-4" /> Share</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Score Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-10 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
            <Award className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-5xl font-bold mb-2">{resultData.score}%</h2>
          <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Final Score</p>
          
          <div className="mt-8 px-6 py-2 rounded-full bg-emerald-500 text-white font-bold text-sm">
            {resultData.status.toUpperCase()}
          </div>
        </motion.div>

        {/* Breakdown Card */}
        <div className="glass p-10 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resultData.history}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {resultData.history.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-2xl font-bold">{resultData.correctAnswers}</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Correct</div>
            </div>
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <MetricItem label="Completion Time" value={resultData.timeTaken} icon={<Timer className="text-blue-500" />} />
            <MetricItem label="Rank Achieved" value={`#${resultData.rank}`} icon={<CheckCircle className="text-emerald-500" />} />
            <MetricItem label="Accuracy" value="85%" icon={<PieIcon className="text-[#00D6FF]" />} />
          </div>
        </div>
      </div>

      {/* Answer Review Section */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold">Review Answers</h3>
        <div className="space-y-4">
          <ReviewItem 
            status="correct" 
            question="What is a CDN?" 
            yourAnswer="A network of distributed servers..." 
            correctAnswer="A network of distributed servers..."
            explanation="A CDN helps deliver content faster by serving it from nearby servers."
          />
          <ReviewItem 
            status="wrong" 
            question="Eventual Consistency means..." 
            yourAnswer="Data is consistent at all times" 
            correctAnswer="Data will become consistent over time"
            explanation="Eventual consistency allows high availability in distributed systems."
          />
        </div>
      </section>
      
      <div className="flex justify-center pb-20">
        <Link href="/student" className="btn-secondary py-3 px-12">Back to Dashboard</Link>
      </div>
    </div>
  )
}

function MetricItem({ label, value, icon }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-lg font-bold">{value}</div>
        <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  )
}

function ReviewItem({ status, question, yourAnswer, correctAnswer, explanation }: any) {
  return (
    <div className="glass p-8 space-y-4 relative overflow-hidden">
      <div className={cn(
        "absolute left-0 top-0 w-1.5 h-full",
        status === "correct" ? "bg-emerald-500" : "bg-red-500"
      )} />
      
      <div className="flex justify-between items-start">
        <h4 className="text-lg font-bold">{question}</h4>
        {status === "correct" ? <CheckCircle className="text-emerald-500" /> : <XCircle className="text-red-500" />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="space-y-1">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Your Answer</div>
          <div className={cn("text-sm p-4 rounded-xl", status === "correct" ? "bg-emerald-500/5 text-emerald-200" : "bg-red-500/5 text-red-200")}>
            {yourAnswer}
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Correct Answer</div>
          <div className="text-sm p-4 rounded-xl bg-white/5 text-gray-200">
            {correctAnswer}
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-white/5">
        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2">Explanation</div>
        <p className="text-sm text-gray-400 italic">"{explanation}"</p>
      </div>
    </div>
  )
}

function cn(...inputs: any) {
  return inputs.filter(Boolean).join(' ')
}
