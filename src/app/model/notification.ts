export class Notification {
  id: string;
  to: string;
  title: string;
  body: string;
  type: string;
  driver: string;
  user: string;
  order: string;
  vendor: string;
  isRead: boolean;
  readAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(entity) {
    this.id = entity.id;
    this.to = entity.to;
    this.title = entity.title;
    this.body = entity.body;
    this.type = entity.type;
    this.driver = entity.driver;
    this.user = entity.user;
    this.order = entity.order;
    this.vendor = entity.vendor;
    this.isRead = entity.isRead;
    this.readAt = entity.readAt;
    this.isDelivered = entity.isDelivered;
    this.deliveredAt = entity.deliveredAt;
    this.isDeleted = entity.isDeleted;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
