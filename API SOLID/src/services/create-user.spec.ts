import { describe, expect, it, test } from 'vitest'
import { UserService } from './create-user-service'
import { compare } from 'bcryptjs'
import {InMemoryUsersRepository}  from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './erros/user-alredy-exists-error'

// unit tests for create-user service
describe('Register User Service', () => {
  it('should hash the password before saving the user', async () => {

    // creating a mock users repository because we don't want to interact with the real database in unit tests
    const usersRepositoryMock = new InMemoryUsersRepository()
    const userService = new UserService(usersRepositoryMock)

    const { user } = await userService.register({
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
    const usersRepositoryMock = new InMemoryUsersRepository()
    const userService = new UserService(usersRepositoryMock)

    const email = 'john.doe@example.com'

    await userService.register({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(async () => {
      await userService.register({
        name: 'John Doe',
        email,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should register a user successfully', async () => {
    const usersRepositoryMock = new InMemoryUsersRepository()
    const userService = new UserService(usersRepositoryMock)  

    const { user } = await userService.register({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
})