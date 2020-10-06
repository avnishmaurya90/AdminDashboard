import { Vendor } from '../../vendors/models/vendor';
import { City } from '../../model/city';

export class Fare {
  id: string;
  type: string;
  bonusLimit: number;
  basePrice: number;
  bonusPrice: number;
  baseDistance: number;
  perKilometerFare: number;
  basePercent: number;
  basePercentPrice: number;
  bonusPercentPrice: number;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  city: City;
  vendor: Vendor;

  constructor(entity) {
    this.id = entity.id;
    this.type = entity.type;
    this.bonusLimit = entity.bonusLimit;
    this.basePrice = entity.basePrice;
    this.bonusPrice = entity.bonusPrice;
    this.baseDistance = entity.baseDistance;
    this.perKilometerFare = entity.perKilometerFare;
    this.basePercent = entity.basePercent;
    this.basePercentPrice = entity.basePercentPrice;
    this.bonusPercentPrice = entity.bonusPercentPrice;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.isDeleted = entity.isDeleted;
  }
}
