import type { Slug } from "./value-objects/slug.js";
import { Entity } from "../../core/entities/entity.js";

interface QuestionProps {
  title: string;
  slug: Slug;
  content: string;
  authorId: string;
}

export class Question extends Entity<QuestionProps> {
}
