import {expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question.js'
import type { AnswersRepository } from '../../repositories/answers-repository.js'
import type { Answer } from '../entities/answer.js'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  }
}

test('should be able to answer a question', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    questionId: 'question-1',
    authorId: 'instructor-1',
    content: 'This is the answer to the question.'
  })
  expect(answer).toEqual(expect.objectContaining({
    content: 'This is the answer to the question.'
  }))
})