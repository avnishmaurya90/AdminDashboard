import { Order } from './order';
export class Invoice {
  id: string;
  type: string;
  order: Order;
  code: string;
  subAmount: number;
  shippingAmount: number;
  totalAmount: number;
  createdAt: Date;

  constructor(entity) {
    this.id = entity.id;
    this.code = entity.code;
    this.shippingAmount = entity.shippingAmount;
    this.subAmount = entity.subAmount;
    this.totalAmount = entity.totalAmount;
    this.type = entity.type;
    this.order = entity.order;
    this.createdAt = entity.createdAt;
  }
}
