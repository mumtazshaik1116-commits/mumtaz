"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { signIn } from "next-auth/react"
import { Mail, Lock, User, Code, Globe } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (res?.ok) {
        // In a real app we'd check session, for now redirect based on email
        if (email.includes("admin")) {
          window.location.href = "/admin"
        } else {
          window.location.href = "/student"
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#050505]">
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0050FF]/5 blur-[100px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass p-10"
      >
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-[#0050FF] rounded-xl flex items-center justify-center font-bold text-white mx-auto mb-4">N</div>
          <h2 className="text-3xl font-bold">{isLogin ? "Welcome Back" : "Join Nexus"}</h2>
          <p className="text-gray-400 mt-2">{isLogin ? "Login to access your dashboard" : "Create an account to start your journey"}</p>
        </div>

        <div className="flex p-1 bg-white/5 rounded-full mb-8">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${isLogin ? "bg-[#0050FF] text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${!isLogin ? "bg-[#0050FF] text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm text-gray-400 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="John Doe" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#0050FF]/50 focus:ring-1 focus:ring-[#0050FF]/50 transition-all"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm text-gray-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#0050FF]/50 focus:ring-1 focus:ring-[#0050FF]/50 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm text-gray-400">Password</label>
              {isLogin && <a href="#" className="text-xs text-[#0050FF] hover:underline">Forgot?</a>}
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#0050FF]/50 focus:ring-1 focus:ring-[#0050FF]/50 transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>{isLogin ? "Login Now" : "Create Account"}</>
            )}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#050505] px-2 text-gray-500 tracking-widest">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => signIn("google")}
            className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-2.5 rounded-xl transition-all"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 py-2.5 rounded-xl transition-all">
            <Code className="w-4 h-4" />
            <span className="text-sm font-medium">Github</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
