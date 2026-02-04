import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error";
import { LoginUseCase } from "@/use-cases/users/login";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";


describe('Authenticate User Use Case', () => {

  let usersRepositoryMock: InMemoryUsersRepository
  let loginUseCase: LoginUseCase


  beforeEach(() => {
     usersRepositoryMock = new InMemoryUsersRepository()
     loginUseCase = new LoginUseCase(usersRepositoryMock)
  })


  it('should be possible to authenticate an user', async () => {
    await usersRepositoryMock.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await loginUseCase.authenticate({
      email: 'jane.doe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be possible to authenticate with wrong email', async () => {
    await expect(async ()=> {
      await loginUseCase.authenticate({
      email: 'jane.doe@example.com',
      password: '123456',
    })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

    it('should not be possible to authenticate with wrong password', async () => {
    await usersRepositoryMock.create({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(async ()=> {
      await loginUseCase.authenticate({
      email: 'jane.doe@example.com',
      password: '123123',
    })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})