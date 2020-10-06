import { Location } from '../../model/location';
import { City } from 'src/app/model/city';
import { Category } from 'src/app/model/category';
export class Vendor {
  id: string;
  name: string;
  type: string;
  email: string;
  mobile: string;
  token: string;
  status: string;
  dutyStatus: string;
  location: Location;
  comments: string;
  isSuspended: boolean;
  isRejected: boolean;
  city: City;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  constructor(entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.type = entity.type;
    this.email = entity.email;
    this.mobile = entity.mobile;
    this.token = entity.token;
    this.status = entity.status;
    this.dutyStatus = entity.dutyStatus;
    this.city = entity.city;
    this.comments = entity.comments;
    this.category = entity.category;
    this.location = entity.location;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.isDeleted = entity.isDeleted;
    this.isSuspended = entity.isSuspended;
    this.isRejected = entity.isRejected;
  }
}
