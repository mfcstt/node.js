import { PrismaUsersRepository } from "@/http/repositories/prisma-users-repository"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface registerUserParams {
  name: string,
  email: string,
  password: string,
}
  
  export async function userServiceRegister({ name, email, password }: registerUserParams) {

    const password_hash = await hash(password, 6)
    
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })
    
    if (userWithSameEmail) {
      throw new Error("E-mail already registered")
    }
    
  const user = new PrismaUsersRepository().create({
    name,
    email,
    password_hash
  })

  }