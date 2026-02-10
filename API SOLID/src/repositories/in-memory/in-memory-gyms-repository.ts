import { getDistanceBetweenCoordinates } from "@/use-cases/utils/get-distance-between-coordinates";
import { Gym, Prisma } from "../../../prisma/generated";
import type { FindManyNearbyGymsParams, GymsRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find(gym => gym.id === id);

    if(!gym) {
      return null;
    }
    return gym;
  }

  async create(data: Prisma.GymCreateInput){
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description || null,
      phone: data.phone || null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }
    this.items.push(gym);
    return gym;
  }

  async searchMany(query: string, page: number) {
    return this.items.filter(gym => gym.name.toLowerCase().includes(query.toLowerCase())).slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(params: FindManyNearbyGymsParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.userLatitude, longitude: params.userLongitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }
}