import type { Optional } from "src/core/types/optional.js"
import type { CommentProps} from "./comment.js"
import { Comment } from "./comment.js"
import type { UniqueEntityID } from "../../../../core/entities/unique-entity-id.js"


export interface AnswerCommentProps extends CommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}