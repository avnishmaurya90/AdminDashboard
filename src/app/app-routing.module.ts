import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { NotificationComponent } from './pages/notification/notification.component';
import { VendorHomeComponent } from './pages/vendor-home/vendor-home.component';
import { MapComponent } from './pages/map/map.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'vendor/home',
    component: VendorHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationComponent,
    canActivate: [AuthGuard]
  },
  { path: 'map', component: MapComponent, canActivate: [AuthGuard] },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'drivers',
    loadChildren: './drivers/drivers.module#DriversModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'vendors',
    loadChildren: './vendors/vendors.module#VendorsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
    canActivate: [AuthGuard]
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
