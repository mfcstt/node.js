import type { Gym, Prisma } from "prisma/generated";

export interface FindManyNearbyGymsParams {
  userLatitude: number;
  userLongitude: number;
}

export interface GymsRepository {
  findById(id: string): Promise<Gym |null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby(params: FindManyNearbyGymsParams): Promise<Gym[]>;
}