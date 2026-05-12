import { left, right, type Either } from "src/core/either.js";
import { Notification } from "../../enterprise/entities/notification.js";
import type { NotificationsRepository } from "../repositories/notifactions-repository.js";
import { ResourceNotFoundError } from "src/domain/forum/application/use-cases/errors/resource-not-found-error.js";
import { NotAllowedError } from "src/domain/forum/application/use-cases/errors/not-allowed-error.js";

interface ReadNotificationRequest {
  recipientId: string;
  notificationId: string;
}

type ReadNotificationResponse = Either<
ResourceNotFoundError | NotAllowedError,
{
  notification: Notification
}
>;

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    notificationId,
  }: ReadNotificationRequest): Promise<ReadNotificationResponse> {

    const notification = await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      return left(new ResourceNotFoundError());
    }

    if(recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError());
    }

    notification.read();

    await this.notificationsRepository.save(notification);

    return right({
      notification,
    });
  }
}