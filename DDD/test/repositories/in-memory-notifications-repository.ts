import type { NotificationsRepository } from "@/domain/notification/application/repositories/notifactions-repository.js"
import type { Notification } from "@/domain/notification/enterprise/entities/notification.js"

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.items.find(
      (item) => item.id.toString() === notificationId,
    )
    if (!notification) {
      return null
    }
    return notification
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(
      (item) => item.id.toString() === notification.id.toString(),
    )
    if (notificationIndex >= 0) {
      this.items[notificationIndex] = notification
    }
  }
}