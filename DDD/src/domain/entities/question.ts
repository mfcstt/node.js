import type { Slug } from "./value-objects/slug.js";
import { Entity } from "../../core/entities/entity.js";
import type { UniqueEntityID } from "./value-objects/unique-entity-id.js";
import type { Optional } from "../../core/types/optional.js";

interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID;
  title: string;
  slug: Slug;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityID) {
    const question = new Question({
      ...props, 
      createdAt: new Date()
    }, id)
    return question;
  }
}
