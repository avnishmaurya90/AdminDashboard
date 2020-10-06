import { DriverInvoiceComponent } from './../pages/driver-invoice/driver-invoice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverListComponent } from '../pages/driver-list/driver-list.component';
import { DriversComponent } from '../pages/drivers/drivers.component';
import { AuthGuard } from '../../guards/auth.guard';
import { DriversOrderComponent } from '../pages/drivers-order/drivers-order.component';
import { DriverFareComponent } from '../pages/driver-fare/driver-fare.component';
import { DriverStatusComponent } from '../pages/driver-status/driver-status.component';
import { CreateFareComponent } from '../pages/create-fare/create-fare.component';

const routes: Routes = [
  {
    path: '',
    component: DriverListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'drivers/list',
    component: DriverListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'drivers/order',
    component: DriversOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'drivers/invoice',
    component: DriverInvoiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'drivers/status',
    component: DriverStatusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'drivers/fares',
    component: DriverFareComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'drivers/createfare',
    component: CreateFareComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriversRoutingModule { }
