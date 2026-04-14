import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository.js"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js"
import { OnAnswerCreated } from "./on-answer-created.js"
import { makeAnswer } from "test/factories/make-answer.js"
import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository.js"
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository.js"
import  { SendNotificationUseCase, type SendNotificationRequest, type SendNotificationResponse } from "../use-cases/send-notification.js"
import  { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository.js"
import { makeQuestion } from "test/factories/make-question.js"
import {vi, type MockInstance} from 'vitest'
import { waitFor } from "test/utils/wait-for.js"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sendNotificationUseCase: SendNotificationUseCase
let inMemoryNotificationsRepository: InMemoryNotificationsRepository

let sendNotificationExecuteSpy: MockInstance<
  (request: SendNotificationRequest) => Promise<SendNotificationResponse>
>

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)

    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository)

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository)

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should  send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })

  })
})