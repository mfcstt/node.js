import { makeAnswer } from "test/factories/make-answer.js"
import { makeQuestion } from "test/factories/make-question.js"
import { waitFor } from "test/utils/wait-for.js"
import { OnQuestionBestAnswerChosen } from "./on-question-best-answer-choosen.js"
import  { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository.js"
import  { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments-repository.js"
import  { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js"
import  { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications-repository.js"
import  { SendNotificationUseCase, type SendNotificationRequest, type SendNotificationResponse } from "../use-cases/send-notification.js"
import  { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository.js"
import type { MockInstance } from "vitest"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  (request: SendNotificationRequest) => Promise<SendNotificationResponse>
>

describe('On Question Best Answer Chosen', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnQuestionBestAnswerChosen(
      inMemoryAnswersRepository,
      sendNotificationUseCase,
    )
  })

  it('should send a notification when topic has new best answer chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id

    inMemoryQuestionsRepository.update(question)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})