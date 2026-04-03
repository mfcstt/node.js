import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository.js'
import { GetQuestionBySlugUseCase } from './get-question-by-slug.js'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'
import { Question } from '../../enterprise/entities/question.js'
import { makeQuestion } from 'test/factories/make-question.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

it('should be able to get a question by its slug', async () => {
  const newQuestion = makeQuestion({
    slug: Slug.create('how-to-create-a-question?'),
  })
  inMemoryQuestionRepository.create(newQuestion)
  const result = await sut.execute({
    slug: 'how-to-create-a-question?',
  })
  expect(result.isRight()).toBe(true)
  expect(result.value.question.id).toBeTruthy()
})
})
