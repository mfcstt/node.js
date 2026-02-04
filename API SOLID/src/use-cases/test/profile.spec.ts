import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { ProfileUseCase } from "@/use-cases/users/profile"
import { hash } from "bcryptjs"
import { beforeEach, describe, expect, it } from "vitest"
import { ResourceNotFoundError } from "../erros/resource-not-found-error"


describe('Profile User Use Case', () => {
  let usersRepositoryMock: InMemoryUsersRepository
  let profileUseCase: ProfileUseCase

  beforeEach(() => {
      usersRepositoryMock = new InMemoryUsersRepository()
      profileUseCase = new ProfileUseCase(usersRepositoryMock)
  })

  it('should be able to get user profile', async () => {
     const createdUser = await usersRepositoryMock.create({
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password_hash: await hash('123456', 6),
      })

      const { user } = await profileUseCase.getUserProfile({
        userId: createdUser.id,
      })
      await expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get profile of non existing user', async () => {
     await expect(() =>
      profileUseCase.getUserProfile({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})