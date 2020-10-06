import { Vehicle } from './vehicle';

class Pic {
  url: string;
  thumbnail: string;
}

export class Driver {
  id: string;
  code: string;
  pic: Pic;
  firstName: string;
  lastName: string;
  name: string;
  type: string;
  email: string;
  mobile: string;
  token: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  dutyStatus: string;
  deliveredOrders: number;
  comments: string;
  earnings: number;
  isRejected: boolean;
  isSuspended: boolean;
  vehicle: Vehicle;

  constructor(entity) {
    this.id = entity.id;
    this.code = entity.code;
    this.pic = entity.pic;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.name = entity.name;
    this.type = entity.type;
    this.email = entity.email;
    this.mobile = entity.mobile;
    this.token = entity.token;
    this.status = entity.status;
    this.dutyStatus = entity.dutyStatus;
    this.earnings = entity.earnings;
    this.deliveredOrders = entity.deliveredOrders;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.isDeleted = entity.isDeleted;
    this.vehicle = entity.vehicle;
    this.comments = entity.comments;
    this.isRejected = entity.isRejected;
  }
}
