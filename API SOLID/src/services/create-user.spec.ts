import { describe, expect, it, test } from 'vitest'
import { UserService } from './create-user-service'
import { compare } from 'bcryptjs'

// unit tests for create-user service
describe('Register User Service', () => {
  it('should hash the password before saving the user', async () => {

    // creating a mock users repository because we don't want to interact with the real database in unit tests
    const userService = new UserService({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return{
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      }
    });

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