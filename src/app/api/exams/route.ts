import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        _count: {
          select: { submissions: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(exams)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch exams" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const exam = await prisma.exam.create({
      data: {
        title: body.title,
        description: body.description,
        duration: parseInt(body.duration),
        passingPercent: parseInt(body.passingPercent) || 40,
        startTime: new Date(body.startTime),
        endTime: new Date(body.endTime),
        isPublished: body.isPublished || false,
      },
    })
    return NextResponse.json(exam)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create exam" }, { status: 500 })
  }
}
