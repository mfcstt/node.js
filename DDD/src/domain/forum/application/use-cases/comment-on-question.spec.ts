import  { InMemoryQuestionCommentsRepository } from "test/repositories/in-memory-question-comment-repository.js"
import  { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository.js"
import  { CommentOnQuestionUseCase } from "./comment-on-question.js"
import { makeQuestion } from "test/factories/make-question.js"
import  { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments-repository.js"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(inMemoryQuestionAttachmentsRepository)
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentário teste',
    })

    expect(inMemoryQuestionCommentsRepository.items[0]).toMatchObject({
      questionId: question.id,
      authorId: question.authorId,
      content: 'Comentário teste',
    })
  })
})