import {expect, test} from 'vitest'
import { AnswerQuestionUseCase } from './answer-question.js'

test('should be able to answer a question', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    questionId: 'question-1',
    instructorId: 'instructor-1',
    content: 'This is the answer to the question.'
  })
  expect(answer).toEqual(expect.objectContaining({
    content: 'This is the answer to the question.'
  }))
})