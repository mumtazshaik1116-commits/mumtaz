"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Shield, Zap, Code, Award, Users } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center glass border-b-0 m-4 rounded-full max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0050FF] rounded-lg flex items-center justify-center font-bold">N</div>
          <span className="text-xl font-bold tracking-tight">NEXUS</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-gray-400 hover:text-white transition-colors">Login</Link>
          <Link href="/login?tab=signup" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-40 pb-20 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#0050FF]/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-[#00D6FF] mb-6 inline-block">
              Next-Gen EdTech Platform
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
              Assess with <span className="gradient-text">Precision</span>.
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience the world's most advanced online examination platform. Secure, real-time, and beautifully designed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login" className="btn-primary flex items-center gap-2 group w-full sm:w-auto">
                Start Exam Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/admin" className="btn-secondary w-full sm:w-auto">
                Admin Portal
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto mt-40 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-[#0050FF]" />}
            title="Ironclad Security"
            description="Anti-cheat mechanisms, screen monitoring, and secure Docker sandboxing for code."
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-[#00D6FF]" />}
            title="Real-time Sync"
            description="Sub-second synchronization for timers, leaderboards, and instant evaluations."
          />
          <FeatureCard 
            icon={<Code className="w-6 h-6 text-[#0050FF]" />}
            title="Coding Support"
            description="Full-featured IDE with support for Python, Java, and JavaScript test cases."
          />
        </section>

        {/* Stats Section */}
        <section className="max-w-7xl mx-auto mt-40 border-t border-white/5 pt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <StatItem value="10k+" label="Daily Exams" />
            <StatItem value="99.9%" label="Uptime" />
            <StatItem value="50+" label="Institutions" />
            <StatItem value="10ms" label="Latency" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Nexus Exam Platform. Built for the future of education.</p>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass p-8 space-y-4"
    >
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-500 uppercase tracking-widest text-xs font-semibold">{label}</div>
    </div>
  )
}
