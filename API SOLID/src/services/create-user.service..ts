import type { UsersRepository } from "@/http/repositories/users-repository"
import { hash } from "bcryptjs"

interface registerUserParams {
  name: string,
  email: string,
  password: string,
}
  
// SOLID - Dependency Inversion Principle

export class UserService {
  constructor(private usersRepository: UsersRepository) {}
  
  async register ({ name, email, password }: registerUserParams) {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    await this.usersRepository.create({
      name,
      email,
      password_hash
    })
  }
}