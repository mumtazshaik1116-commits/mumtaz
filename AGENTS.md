# Nexus Exam Platform - Senior Architect Design

## High-Level Architecture
Nexus is built with a focus on **security**, **real-time synchronization**, and **premium UX**. It uses Next.js 16/15 with App Router for the frontend and API routes, PostgreSQL with Prisma for state management, and Framer Motion for high-fidelity animations.

### Tech Stack Details:
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS v4.
- **Backend Services**: Next.js API Routes (Serverless ready).
- **Database**: PostgreSQL with Prisma ORM.
- **Authentication**: NextAuth.js (JWT strategy) with Google OAuth.
- **State Management**: React Context / Hooks for local state; Prisma for persistent state (timer, answers).
- **Editor**: Monaco Editor (VS Code core) for coding questions.
- **File Handling**: XLSX for Excel template parsing.

## Key Features & Logic
1. **Server-Side Timer**: The exam timer is initialized on the server when a student starts an exam and synchronized via API. Auto-submit logic is triggered both client-side and via a cron-job/background worker server-side.
2. **Auto-Save System**: Answers are serialized and saved to the database every 3 seconds of activity to prevent data loss on crashes.
3. **Coding Sandbox**: Code execution is designed to run in isolated Docker containers (placeholder in UI).
4. **Leaderboard Algorithm**: Sorting logic: `score DESC` -> `time_taken ASC` -> `submission_time ASC`.

## Getting Started
1. Install dependencies: `npm install`
2. Set up environment: Copy `.env.example` to `.env` and fill in secrets.
3. Start Database: `docker-compose up -d`
4. Run migrations: `npx prisma migrate dev`
5. Start development: `npm run dev`

## Folder Structure
- `src/app/admin`: Admin Portal routes and logic.
- `src/app/student`: Student Portal routes and logic.
- `src/app/api`: Server-side logic and database operations.
- `src/components`: Reusable UI components with premium glassmorphism styles.
- `src/lib`: Core utility functions, prisma client, and auth config.
