"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Send,
  Code,
  FileText,
  Layout,
  Play,
  CheckCircle2,
  AlertTriangle
} from "lucide-react"
import Editor from "@monaco-editor/react"
import { cn } from "@/lib/utils"

// Mock Data
const examData = {
  id: "1",
  title: "Advanced System Design",
  duration: 60, // minutes
  questions: [
    {
      id: "q1",
      type: "MCQ",
      content: "Which of the following is NOT a typical benefit of using a Content Delivery Network (CDN)?",
      options: [
        { id: "a", text: "Reduced latency for end users" },
        { id: "b", text: "Decreased server load for the origin server" },
        { id: "c", text: "Improved SEO due to faster page loads" },
        { id: "d", text: "Strong consistency for write-heavy applications" }
      ],
      marks: 2
    },
    {
      id: "q2",
      type: "SHORT_ANSWER",
      content: "Explain the concept of 'Eventual Consistency' in distributed systems.",
      marks: 5
    },
    {
      id: "q3",
      type: "CODING",
      content: "Write a function 'findIntersection' that takes two arrays and returns their intersection. The function should be O(n) time complexity.",
      starterCode: "function findIntersection(arr1, arr2) {\n  // Your code here\n}",
      language: "javascript",
      marks: 10
    }
  ]
}

export default function ExamTakePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [flagged, setFlagged] = useState<Record<string, boolean>>({})
  const [timeLeft, setTimeLeft] = useState(examData.duration * 60)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditorReady, setIsEditorReady] = useState(false)

  const currentQuestion = examData.questions[currentQuestionIndex]

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit()
      return
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  // Auto-save logic (mock)
  useEffect(() => {
    const saveInterval = setInterval(() => {
      console.log("Auto-saving answers...", answers)
    }, 3000)
    return () => clearInterval(saveInterval)
  }, [answers])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleOptionSelect = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId })
  }

  const handleShortAnswerChange = (text: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: text })
  }

  const handleCodeChange = (value: string | undefined) => {
    setAnswers({ ...answers, [currentQuestion.id]: value })
  }

  const toggleFlag = () => {
    setFlagged({ ...flagged, [currentQuestion.id]: !flagged[currentQuestion.id] })
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      alert("Exam submitted successfully!")
      window.location.href = "/student"
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-[#050505] text-white flex flex-col overflow-hidden">
      {/* Exam Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#080808]/80 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center font-bold text-gray-400">N</div>
          <h1 className="font-bold text-sm uppercase tracking-widest">{examData.title}</h1>
        </div>

        <div className="flex items-center gap-8">
          <div className={cn(
            "flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-lg transition-colors border",
            timeLeft < 300 ? "bg-red-500/10 text-red-500 border-red-500/20 animate-pulse" : "bg-[#0050FF]/10 text-[#0050FF] border-[#0050FF]/20"
          )}>
            <Clock className="w-5 h-5" />
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={handleSubmit} 
            className="btn-primary py-1.5 px-6 text-sm flex items-center gap-2 active:scale-95"
          >
            <Send className="w-4 h-4" /> Finish Exam
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Navigation Grid */}
        <aside className="w-80 border-r border-white/5 bg-[#080808] p-6 flex flex-col gap-8">
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-3">
              {examData.questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(i)}
                  className={cn(
                    "w-full aspect-square rounded-lg flex items-center justify-center text-sm font-bold transition-all border",
                    currentQuestionIndex === i 
                      ? "border-[#0050FF] bg-[#0050FF] text-white scale-110 z-10" 
                      : answers[q.id] 
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500" 
                        : "border-white/10 bg-white/5 text-gray-500 hover:border-white/20",
                    flagged[q.id] && "ring-2 ring-amber-500 ring-offset-2 ring-offset-[#080808]"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Legend</h3>
            <div className="grid grid-cols-2 gap-4">
              <LegendItem color="bg-[#0050FF]" label="Current" />
              <LegendItem color="bg-emerald-500/20 border border-emerald-500/50 text-emerald-500" label="Answered" />
              <LegendItem color="bg-white/5 border border-white/10" label="Unvisited" />
              <LegendItem color="border-2 border-amber-500" label="Flagged" />
            </div>
          </div>

          <div className="mt-auto p-4 rounded-2xl bg-[#00D6FF]/5 border border-[#00D6FF]/10">
            <div className="flex items-center gap-2 mb-2 text-[#00D6FF]">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Warning</span>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Exiting full-screen or switching tabs will be reported to the administrator. Auto-saving is active.
            </p>
          </div>
        </aside>

        {/* Main Area: Question Content */}
        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Question Header */}
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Question {currentQuestionIndex + 1}
                  </span>
                  <span className="text-xs font-medium text-[#00D6FF]">{currentQuestion.marks} Marks</span>
                </div>
                <h2 className="text-2xl font-bold leading-relaxed">{currentQuestion.content}</h2>
              </div>
              <button 
                onClick={toggleFlag}
                className={cn(
                  "p-3 rounded-xl border transition-all",
                  flagged[currentQuestion.id] 
                    ? "bg-amber-500 text-white border-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.3)]" 
                    : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
                )}
              >
                <Flag className="w-5 h-5" />
              </button>
            </div>

            {/* Answer Interface */}
            <div className="space-y-8">
              {currentQuestion.type === "MCQ" && (
                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options?.map((opt: any) => (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(opt.id)}
                      className={cn(
                        "group p-6 rounded-2xl border text-left transition-all flex items-center gap-6",
                        answers[currentQuestion.id] === opt.id
                          ? "bg-[#0050FF]/10 border-[#0050FF] text-white"
                          : "bg-white/5 border-white/10 hover:border-white/20 text-gray-400 hover:text-white"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 transition-colors",
                        answers[currentQuestion.id] === opt.id
                          ? "bg-[#0050FF] border-[#0050FF] text-white"
                          : "border-white/10 group-hover:border-white/30"
                      )}>
                        {opt.id.toUpperCase()}
                      </div>
                      <span className="text-lg font-medium">{opt.text}</span>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === "SHORT_ANSWER" && (
                <div className="space-y-4">
                   <textarea
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleShortAnswerChange(e.target.value)}
                    placeholder="Type your explanation here..."
                    className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-8 focus:outline-none focus:border-[#0050FF]/50 text-lg leading-relaxed placeholder:text-gray-600 transition-all focus:ring-1 focus:ring-[#0050FF]/30"
                  />
                  <div className="text-right text-xs text-gray-500">Character count: {(answers[currentQuestion.id] || "").length}</div>
                </div>
              )}

              {currentQuestion.type === "CODING" && (
                <div className="space-y-6">
                  <div className="rounded-2xl border border-white/5 overflow-hidden bg-[#1e1e1e]">
                    <div className="bg-[#111] px-4 py-3 border-b border-white/5 flex justify-between items-center">
                      <div className="flex items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <Code className="w-4 h-4" /> {currentQuestion.language || "javascript"}
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold transition-all">
                          <Play className="w-3 h-3" /> Run Code
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00D6FF] text-black text-xs font-bold transition-all shadow-[0_0_15px_rgba(0,214,255,0.3)]">
                          <CheckCircle2 className="w-3 h-3" /> Run Tests
                        </button>
                      </div>
                    </div>
                    <Editor
                      height="400px"
                      language={currentQuestion.language}
                      theme="vs-dark"
                      value={answers[currentQuestion.id] || currentQuestion.starterCode}
                      onChange={handleCodeChange}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        fontFamily: "'Fira Code', monospace",
                        padding: { top: 20, bottom: 20 }
                      }}
                    />
                  </div>
                  
                  {/* Console Placeholder */}
                  <div className="glass p-6 font-mono text-sm space-y-2">
                    <h4 className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4">Execution Console</h4>
                    <div className="text-emerald-500">{">"} Compiling...</div>
                    <div className="text-white">{">"} Output: [1, 2, 3]</div>
                    <div className="text-gray-500 mt-4 text-[10px]">Execution time: 42ms</div>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="pt-12 border-t border-white/5 flex justify-between items-center pb-20">
              <button 
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 transition-all font-bold uppercase tracking-widest text-xs"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              
              <div className="text-gray-500 font-medium text-sm">
                Question <span className="text-white">{currentQuestionIndex + 1}</span> of {examData.questions.length}
              </div>

              {currentQuestionIndex === examData.questions.length - 1 ? (
                 <button 
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-10 py-4 rounded-full bg-[#0050FF] text-white shadow-[0_0_25px_rgba(0,80,255,0.4)] hover:bg-[#0040E0] transition-all font-bold uppercase tracking-widest text-xs"
                >
                  Complete Exam <Send className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={() => setCurrentQuestionIndex(prev => Math.min(examData.questions.length - 1, prev + 1))}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 text-gray-400 hover:text-white transition-all font-bold uppercase tracking-widest text-xs"
                >
                  Next Question <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {isSubmitting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8"
          >
            <div className="w-20 h-20 border-4 border-[#0050FF]/30 border-t-[#0050FF] rounded-full animate-spin" />
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Submitting Your Answers</h2>
              <p className="text-gray-500">Securing your attempt and generating results...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LegendItem({ color, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("w-4 h-4 rounded", color)} />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  )
}
