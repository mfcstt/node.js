import { AnswerQuestionUseCase } from './answer-question.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository.js'
import { CreateQuestionUseCase } from './create-question.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

it('should be able to create a question', async () => {

  const {question} = await sut.execute({
    authorId: 'instructor-1',
    title: 'How to create a question?',
    content: 'How can I create a question in the forum?',
  })
  

  expect(question.id).toBeTruthy()
  expect(inMemoryQuestionRepository.items).toHaveLength(1)
})
})
