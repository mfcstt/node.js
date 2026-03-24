import { makeAnswer } from "test/factories/make-answer.js"
import { CommentOnAnswerUseCase } from "./comment-on-answer.js"
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js"
import { InMemoryAnswerCommentsRepository } from "test/repositories/in-memory-answer-comment-repository.js"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comment on answer',
    })

    expect(inMemoryAnswerCommentsRepository.items[0]!.content).toEqual('Comment on answer')
  })
})