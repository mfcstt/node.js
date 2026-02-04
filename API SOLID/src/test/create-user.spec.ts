import { beforeEach, describe, expect, it, test } from 'vitest'
import { SignUpUseCase } from '@/use-cases/users/sign-up'
import { compare } from 'bcryptjs'
import {InMemoryUsersRepository}  from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../use-cases/erros/user-alredy-exists-error'

// unit tests for create-user service
describe('Register User Service', () => {

  let usersRepositoryMock: InMemoryUsersRepository
  let signUpUseCase: SignUpUseCase

  beforeEach(() => {
    usersRepositoryMock = new InMemoryUsersRepository()
    signUpUseCase = new SignUpUseCase(usersRepositoryMock)
  })
  
  it('should hash the password before saving the user', async () => {
    const { user } = await signUpUseCase.signup({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    const isPassordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPassordCorrectlyHashed).toBe(true)
  })

  it('should not allow registration with an existing email', async () => {
    const email = 'john.doe@example.com'

    await signUpUseCase.signup({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(async () => {
      await signUpUseCase.signup({
        name: 'John Doe',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should register a user successfully', async () => {
    const { user } = await signUpUseCase.signup({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
})