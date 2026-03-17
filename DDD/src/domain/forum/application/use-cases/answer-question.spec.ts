import { AnswerQuestionUseCase } from './answer-question.js'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

it('should be able to answer a question', async () => {

  const answer = await sut.execute({
    questionId: 'question-1',
    authorId: 'instructor-1',
    content: 'This is the answer to the question.',
  })
  
  expect(answer.id).toBeTruthy()
  expect(inMemoryAnswersRepository.items).toHaveLength(1)
})
})

