export class AdminDashboardStats {
  assignedOrders: number;
  availableDrivers: number;
  closeVendors: number;
  deliveredOrders: number;
  initiatedOrders: number;
  openVendors: number;
  startedOrders: number;
  onDeliveryDrivers: number;
  assignedDrivers: number;
  unavailableDrivers: number;
  totalDrivers: number;
  totalOrders: number;
  totalVendors: number;

  constructor(entity) {
    this.assignedOrders = entity.assignedOrders;
    this.availableDrivers = entity.availableDrivers;
    this.closeVendors = entity.closeVendors;
    this.deliveredOrders = entity.deliveredOrders;
    this.initiatedOrders = entity.initiatedOrders;
    this.openVendors = entity.openVendors;
    this.startedOrders = entity.startedOrders;
    this.totalDrivers = entity.totalDrivers;
    this.totalOrders = entity.totalOrders;
    this.totalVendors = entity.totalVendors;
    this.assignedDrivers = entity.assignedDrivers;
    this.onDeliveryDrivers = entity.onDeliveryDrivers;
    this.unavailableDrivers = entity.unavailableDrivers;
  }
}
