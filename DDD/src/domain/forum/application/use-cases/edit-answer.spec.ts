import { makeQuestion } from 'test/factories/make-question.js'
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository.js'
import  { EditQuestionUseCase } from './edit-question.js'
import  { EditAnswerUseCase } from './edit-answer.js'
import  { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { makeAnswer } from 'test/factories/make-answer.js'


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit an answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
        content: 'Original Content'
      },
      new UniqueEntityID('question-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)
    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      content: 'Updated Content'
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Updated Content'
    })
  })

  it('should not be able to edit an answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
        content: 'Original Content'
      },
      new UniqueEntityID('question-1'),
    )
    await inMemoryAnswersRepository.create(newAnswer)
    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
      content: 'Updated Content'
    })
    expect(result.isLeft()).toBe(true)
  })
})