import { describe, expect, it, test } from 'vitest'
import { UserService } from './create-user-service'
import { compare } from 'bcryptjs'
import {InMemoryUsersRepository}  from '@/repositories/in-memory/in-memory-users-repository'

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
})