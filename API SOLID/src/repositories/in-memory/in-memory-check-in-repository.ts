import type { Prisma, CheckIn } from "prisma/generated";
import type { CheckInRepository } from "../check-in-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInRepository implements CheckInRepository {
// using an array to simulate a database table
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
      const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const checkInOnDay = this.items.find(
      (item) =>
        item.user_id === userId &&
        item.created_at >= startOfDay &&
        item.created_at <= endOfDay
    )

    return checkInOnDay ?? null
  }

  async findManyByUserId(userId: string, page: number){
    return this.items
    .filter((item) => item.user_id === userId)
    .slice((page -1) * 20, page * 20);
  }
  }
