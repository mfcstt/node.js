import { makeQuestion } from 'test/factories/make-question.js'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id.js'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository.js'
import  { EditQuestionUseCase } from './edit-question.js'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository.js'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment.js'


let inMemoryQuestionsRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase


describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.items.push(makeQuestionAttachment({
      questionId: newQuestion.id,
      attachmentId: new UniqueEntityID('1'),
    }), makeQuestionAttachment({
      questionId: newQuestion.id,
      attachmentId: new UniqueEntityID('2'),
    }))

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
      title: 'Updated Title',
      content: 'Updated Content',
      attachmentsIds: ['1', '3']
    })

    expect(
      inMemoryQuestionsRepository.items[0]!.attachments.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryQuestionsRepository.items[0]!.attachments.currentItems,
    ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') }),
    ])

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Updated Title',
      content: 'Updated Content'
    })
  })


  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)
    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
      title: 'Updated Title',
      content: 'Updated Content',
      attachmentsIds: []
    })
    expect(result.isLeft()).toBe(true)
  })
})