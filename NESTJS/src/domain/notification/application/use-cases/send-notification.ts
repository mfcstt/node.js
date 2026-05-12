import { right, type Either } from "src/core/either.js";
import { Notification } from "../../enterprise/entities/notification.js";
import type { NotificationsRepository } from "../repositories/notifactions-repository.js";
import { UniqueEntityID } from "src/core/entities/unique-entity-id.js";

export interface SendNotificationRequest {
  recipientId: string;
  title: string;
  content: string;

}

export type SendNotificationResponse = Either<
null,
{
  notification: Notification
}
>;

export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: SendNotificationRequest): Promise<SendNotificationResponse> {

    const notification = Notification.create({
      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification);

    return right({
      notification,
    });
  }
}