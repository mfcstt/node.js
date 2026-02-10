import { prisma } from "@/lib/prisma";
import type { CheckIn, Prisma } from "prisma/generated";
import type { CheckInRepository } from "../check-in-repository";

export class PrismaCheckInRepository implements CheckInRepository {
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });
    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page-1) * 20,
    })
    return checkIns
  }
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })
    return count
  }
  async save(data: CheckIn){
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });
    return checkIn
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    })

    return checkIn
  }

   async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })
    return checkIn
  }
}
