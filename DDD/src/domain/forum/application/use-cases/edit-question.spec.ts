import { makeQuestion } from 'test/factories/make-question.js'
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository.js'
import  { EditQuestionUseCase } from './edit-question.js'


let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)
    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      title: 'Updated Title',
      content: 'Updated Content'
    })
    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Updated Title',
      content: 'Updated Content'
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)
    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
      title: 'Updated Title',
      content: 'Updated Content'
    })
    expect(result.isLeft()).toBe(true)
  })
})