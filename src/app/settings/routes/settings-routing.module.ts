import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaresComponent } from '../pages/fares/fares.component';
import { AuthGuard } from '../../guards/auth.guard';
import { FaresListComponent } from '../pages/fares-list/fares-list.component';
import { FareEditComponent } from '../pages/fare-edit/fare-edit.component';
import { ConfigurationComponent } from '../pages/configuration/configuration.component';

const routes: Routes = [
  {
    path: 'fares',
    component: FaresComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'configurations',
    component: ConfigurationComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'fares/list',
    component: FaresListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'fares/:id',
    component: FareEditComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
