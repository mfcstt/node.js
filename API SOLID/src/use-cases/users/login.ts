import type { UsersRepository } from "@/repositories/users-repository";
import type { User } from "prisma/generated";
import { InvalidCredentialsError } from "../erros/invalid-credentials-error";
import { compare } from "bcryptjs";

interface LoginUseCaseRequest {
  email: string;
  password: string;
}

interface LoginUseCaseResponse {
  user: User;
}

export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async authenticate({email, password}: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user){
      throw new InvalidCredentialsError();
    }

    const doesPassowordMatches = await compare(password, user.password_hash);

    if (!doesPassowordMatches){
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}