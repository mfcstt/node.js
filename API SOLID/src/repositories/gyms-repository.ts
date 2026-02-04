import type { Gym, Prisma } from "prisma/generated";

export interface GymsRepository {
  findById(id: string): Promise<Gym |null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}