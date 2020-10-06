import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverListComponent } from './pages/driver-list/driver-list.component';
import { SharedModule } from '../shared/shared/shared.module';
import { DriversRoutingModule } from './routes/drivers-routing.module';
import { DriversComponent } from './pages/drivers/drivers.component';
import { DocumentsComponent } from './dialogs/documents/documents.component';
import { RejectComponent } from './dialogs/reject/reject.component';
import { PendingDriverComponent } from './pages/pending-driver/pending-driver.component';
import { ApprovedDriverComponent } from './pages/approved-driver/approved-driver.component';
import { RejectedDriverComponent } from './pages/rejected-driver/rejected-driver.component';
import { DriversOrderComponent } from './pages/drivers-order/drivers-order.component';
import { DriverInvoiceComponent } from './pages/driver-invoice/driver-invoice.component';
import { DriverStatusComponent } from './pages/driver-status/driver-status.component';
import { DriverFareComponent } from './pages/driver-fare/driver-fare.component';
import { DriverDetailComponent } from './dialogs/driver-detail/driver-detail.component';
import { CreateFareComponent } from './pages/create-fare/create-fare.component'; 

@NgModule({
  imports: [
    CommonModule,
    DriversRoutingModule,
    SharedModule
  ],
  exports: [
    DriverListComponent,
    DriversComponent,
    DocumentsComponent
  ],
  declarations: [
    DriverListComponent,
    DriversComponent,
    DocumentsComponent,
    RejectComponent,
    PendingDriverComponent,
    ApprovedDriverComponent,
    RejectedDriverComponent,
    DriversOrderComponent,
    DriverInvoiceComponent,
    DriverStatusComponent,
    DriverFareComponent,
    DriverDetailComponent,
    CreateFareComponent
  ]
})
export class DriversModule { }
