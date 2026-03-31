import  { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository.js"
import  { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository.js"
import { makeQuestion } from "test/factories/make-question.js"
import { makeAnswer } from "test/factories/make-answer.js"
import { UniqueEntityID } from "../../enterprise/entities/value-objects/unique-entity-id.js"
import 
 { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer.js"


let inMemoryQuestionsRepository: InMemoryQuestionRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    )
  })

  it('should be able to choose the question best answer', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      }, new UniqueEntityID('question-1')
    )
    const answer = makeAnswer({
      questionId: question.id,
    }, new UniqueEntityID('answer-1'))
    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)
    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.question.bestAnswerId).toEqual(answer.id)
    }
    // Garante que o repositório também foi atualizado
    expect(inMemoryQuestionsRepository.items[0]?.bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to to choose another user question best answer', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      }, new UniqueEntityID('question-1')
    )
    const answer = makeAnswer({
      questionId: question.id,
    }, new UniqueEntityID('answer-1'))
    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)
    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    })
    expect(result.isLeft()).toBe(true)
  })
})