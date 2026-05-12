import type { Optional } from "src/core/types/optional.js"
import type { CommentProps} from "./comment.js"
import { Comment } from "./comment.js"
import type { UniqueEntityID } from "../../../../core/entities/unique-entity-id.js"


export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityID
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}