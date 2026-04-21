import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nexus.com' },
    update: {},
    create: {
      email: 'admin@nexus.com',
      name: 'Super Admin',
      role: 'ADMIN',
    },
  })

  // Create Student
  const student = await prisma.user.upsert({
    where: { email: 'student@nexus.com' },
    update: {},
    create: {
      email: 'student@nexus.com',
      name: 'John Student',
      role: 'STUDENT',
    },
  })

  console.log({ admin, student })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
