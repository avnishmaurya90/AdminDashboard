import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorListComponent } from './pages/vendor-list/vendor-list.component';
import { SharedModule } from '../shared/shared/shared.module';
import { VendorRoutingModule } from './routes/vendor-routing.module';
import { VendorListGraphComponent } from './pages/vendor-list-graph/vendor-list-graph.component';
import { VendorsComponent } from './pages/vendors/vendors.component';
import { PendingVendorListComponent } from './pages/pending-vendor-list/pending-vendor-list.component';
import { ApprovedVendorListComponent } from './pages/approved-vendor-list/approved-vendor-list.component';
import { SuspendedVendorListComponent } from './pages/suspended-vendor-list/suspended-vendor-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCUJL__Zijn3d16uRTqV7xfdaRy91QfsPY' //'AIzaSyBd3tE0GFfQnsku7g1rJdGIKyzMgJXRg_s'
    }),
    VendorRoutingModule
  ],
  exports: [
    VendorListComponent,
    VendorListGraphComponent,
    VendorsComponent,
    PendingVendorListComponent,
    ApprovedVendorListComponent,
    SuspendedVendorListComponent
  ],
  declarations: [
    VendorListComponent,
    VendorListGraphComponent,
    VendorsComponent,
    PendingVendorListComponent,
    ApprovedVendorListComponent,
    SuspendedVendorListComponent
  ]
})
export class VendorsModule { }
