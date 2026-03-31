import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { DeleteAnswerUseCase } from './delete-answer.js'
import { makeAnswer } from 'test/factories/make-answer.js'


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete an answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)
    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)
    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    })
    expect(result.isLeft()).toBe(true)
  })
})