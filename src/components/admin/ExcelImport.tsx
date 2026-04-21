"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import * as XLSX from "xlsx"
import { FileUp, FileCheck, AlertCircle, Loader2, Download, Trash2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

export function ExcelImport() {
  const [data, setData] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsProcessing(true)
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const bstr = e.target?.result
        const wb = XLSX.read(bstr, { type: "binary" })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const jsonData = XLSX.utils.sheet_to_json(ws)
        
        // Basic validation
        if (jsonData.length === 0) {
          throw new Error("The Excel file is empty.")
        }

        setData(jsonData)
        toast.success(`Successfully loaded ${jsonData.length} questions.`)
      } catch (err: any) {
        setError(err.message || "Failed to parse Excel file.")
        toast.error("Invalid file format.")
      } finally {
        setIsProcessing(false)
      }
    }
    reader.readAsBinaryString(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: false,
  })

  const downloadTemplate = () => {
    const templateData = [
      { Question: "What is React?", OptionA: "A UI Library", OptionB: "A Database", OptionC: "A OS", OptionD: "None", Answer: "A", Marks: 2, Explanation: "React is a JavaScript library for building user interfaces." },
      { Question: "Sum of 2+2?", OptionA: "3", OptionB: "4", OptionC: "5", OptionD: "6", Answer: "B", Marks: 1, Explanation: "Basic arithmetic." },
    ]
    const worksheet = XLSX.utils.json_to_sheet(templateData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Questions Template")
    XLSX.writeFile(workbook, "exam_questions_template.xlsx")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Import via Excel</h3>
        <button 
          onClick={downloadTemplate}
          className="text-xs font-bold text-[#00D6FF] hover:underline flex items-center gap-1.5"
        >
          <Download className="w-3 h-3" /> Download Template
        </button>
      </div>

      {!data.length ? (
        <div 
          {...getRootProps()} 
          className={cn(
            "border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer group",
            isDragActive ? "border-[#0050FF] bg-[#0050FF]/5" : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
          )}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            {isProcessing ? <Loader2 className="w-8 h-8 text-[#0050FF] animate-spin" /> : <FileUp className="w-8 h-8 text-gray-500 group-hover:text-[#0050FF]" />}
          </div>
          <div className="space-y-1">
            <p className="text-lg font-bold">Click or drag file to upload</p>
            <p className="text-gray-500 text-sm">XLSX or XLS files only (max 5MB)</p>
          </div>
          {error && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-500 text-sm bg-red-500/10 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass p-6 border-emerald-500/20 bg-emerald-500/5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">{data.length} Questions Ready</p>
                <p className="text-xs text-gray-500">Review the data before importing.</p>
              </div>
            </div>
            <button 
              onClick={() => setData([])}
              className="p-2 hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-all rounded-lg"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto custom-scrollbar border border-white/5 rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 sticky top-0">
                <tr className="text-[10px] text-gray-500 uppercase tracking-widest">
                  <th className="p-4">#</th>
                  <th className="p-4">Question</th>
                  <th className="p-4">Answer</th>
                  <th className="p-4 text-right">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.map((item, i) => (
                  <tr key={i} className="hover:bg-white/[0.01]">
                    <td className="p-4 text-gray-500">{i + 1}</td>
                    <td className="p-4 truncate max-w-xs">{item.Question}</td>
                    <td className="p-4"><span className="px-2 py-0.5 rounded bg-[#0050FF]/10 text-[#0050FF] font-bold text-[10px]">{item.Answer}</span></td>
                    <td className="p-4 text-right">{item.Marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="w-full btn-primary py-4">Confirm & Import Questions</button>
        </div>
      )}
    </div>
  )
}
