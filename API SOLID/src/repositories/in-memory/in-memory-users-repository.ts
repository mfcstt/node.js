import type { Prisma, User } from "prisma/generated";
import type { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository {
// using an array to simulate a database table
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: `user-${Math.random()}`,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.items.push(user)
    return user
  }

  async findByEmail (email: string) {
    const user = this.items.find(user => user.email === email)

    if (!user) {
      return null
    }
    return user
  }
  
}