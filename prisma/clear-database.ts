import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function bootstrap() {
    const delteAllMeals = await prisma.meals.deleteMany()
    const deleteAllUsers = await prisma.user.deleteMany()
}

bootstrap()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })