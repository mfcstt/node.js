import type { UsersRepository } from "@/repositories/users-repository";
import type { User } from "prisma/generated";
import { ResourceNotFoundError } from "../erros/resource-not-found-error";

interface GetUserProfileRequest {
  userId: string;
}

interface GetUserProfileResponse {
  user: User;
}

export class ProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async getUserProfile({userId}: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(userId);

    if(!user){
      throw new ResourceNotFoundError();
    }

    return { 
      user,
    };
  }
}