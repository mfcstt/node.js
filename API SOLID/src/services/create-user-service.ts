import type { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./erros/user-alredy-exists-error"

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

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })
    return {
      user,
    }
  }
}