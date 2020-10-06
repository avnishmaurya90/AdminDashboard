import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { VendorsComponent } from '../pages/vendors/vendors.component';

const routes: Routes = [
  {
    path: '',
    component: VendorsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
