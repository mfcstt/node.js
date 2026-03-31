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
  const result = await sut.execute({
    questionId: 'question-1',
    authorId: 'instructor-1',
    content: 'This is the answer to the question.',
  })
  expect(result.isRight()).toBe(true)
  expect(inMemoryAnswersRepository.items[0]).toEqual(result.value.answer)
})
})

