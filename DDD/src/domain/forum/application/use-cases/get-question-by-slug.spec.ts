import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository.js'
import { GetQuestionBySlugUseCase } from './get-question-by-slug.js'
import { UniqueEntityID } from '../../enterprise/entities/value-objects/unique-entity-id.js'
import { Slug } from '../../enterprise/entities/value-objects/slug.js'
import { Question } from '../../enterprise/entities/question.js'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

it('should be able to get a question by its slug', async () => {
  const newQuestion = Question.create({
    authorId: new UniqueEntityID(),
    title: 'How to create a question?',
    slug: Slug.create('how-to-create-a-question?'),
    content: 'I want to create a question, but I don\'t know how to do it.',
  })

  inMemoryQuestionRepository.create(newQuestion)

  const {question} = await sut.execute({
    slug: 'how-to-create-a-question?',
  })
  
  expect(question.id).toBeTruthy()
})
})
