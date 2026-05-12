import { Entity } from "src/core/entities/entity.js";
import type { UniqueEntityID } from "src/core/entities/unique-entity-id.js";
import type { Optional } from "src/core/types/optional.js";

export interface NotificationProps {
  recipientId: UniqueEntityID;
  title: string;
  content: string;
  createdAt: Date;
  readAt?: Date;
}

export class Notification extends Entity<NotificationProps> {
  get recipientId() {
    return this.props.recipientId;
  }

  get title(): string {
    return this.props.title;
  }

  get content(): string {
    return this.props.content;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  read(){
    this.props.readAt = new Date();
  }

  get readAt(): Date | undefined {
    return this.props.readAt;
  }

  static create(props: Optional<NotificationProps, 'createdAt'>, id?: UniqueEntityID) {
    const notification = new Notification({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id);

    return notification;
  }
  
}