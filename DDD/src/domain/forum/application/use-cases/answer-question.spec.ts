import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository.js'
import { AnswerQuestionUseCase } from './answer-question.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'
import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'

let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswersAttachmentsRepository)
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

it('should be able to answer a question', async () => {
  const result = await sut.execute({
    questionId: 'question-1',
    authorId: 'instructor-1',
    content: 'This is the answer to the question.',
    attachments: ['1', '2'],
  })

  expect(result.isRight()).toBe(true)
    expect(
      inMemoryAnswersRepository.items[0]?.attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0]?.attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
      ],
    )
  })
})
