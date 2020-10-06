import { Driver } from '../drivers/models/driver';
import { User } from './user';
import { Vendor } from '../vendors/models/vendor';

export class Order {
  id: string;
  name: string;
  code: string;
  type: string;
  invoiceUrl: string;
  signatureUrl: string;
  status: string;
  isCOD: boolean;
  isCard: boolean;
  startedAt: Date;
  deliveredAt: Date;
  completedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  driver: Driver;
  receiver: User;
  vendor: Vendor;
  sender: User;

  constructor(entity) {
    this.id = entity.id;
    this.type = entity.type;
    this.code = entity.code;
    this.name = entity.name;
    this.invoiceUrl = entity.invoiceUrl;
    this.signatureUrl = entity.signatureUrl;
    this.status = entity.status;
    this.isCOD = entity.isCOD;
    this.isCard = entity.isCard;
    this.sender = entity.sender;
    this.receiver = entity.receiver;
    this.driver = entity.driver;
    this.vendor = entity.vendor;
    this.startedAt = entity.startedAt;
    this.deliveredAt = entity.deliveredAt;
    this.completedAt = entity.completedAt;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.isDeleted = entity.isDeleted;
  }
}
