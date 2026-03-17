import { Entity } from "../../core/entities/entity.js";
import type { Optional } from "../../core/types/optional.js";
import type { UniqueEntityID } from "./value-objects/unique-entity-id.js";

interface AnswerProps {
  content: string;
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  get content(){
    return this.props.content;
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID) {
      const answer = new Answer({
        ...props, 
        createdAt: new Date()
      }, id)
      return answer;
    }
}
