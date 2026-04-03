import { AnswerQuestionUseCase } from './answer-question.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository.js'
import { CreateQuestionUseCase } from './create-question.js'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

it('should be able to create a question', async () => {
  const result = await sut.execute({
    authorId: 'instructor-1',
    title: 'How to create a question?',
    content: 'How can I create a question in the forum?',
    attachmentsIds: ['attachment-1', 'attachment-2']
  })
  expect(result.isRight()).toBe(true)
  expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question)
  expect(inMemoryQuestionRepository.items[0]?.attachments).toHaveLength(2)
  expect(inMemoryQuestionRepository.items[0]?.attachments).toEqual([
    expect.objectContaining({ attachmentId: 'attachment-1' }),
    expect.objectContaining({ attachmentId: 'attachment-2' }),
  ])
})
})
