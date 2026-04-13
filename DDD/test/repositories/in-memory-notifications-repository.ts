import type { NotificationsRepository } from "@/domain/notification/application/repositories/notifactions-repository.js"
import type { Notification } from "@/domain/notification/enterprise/entities/notification.js"

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }
}