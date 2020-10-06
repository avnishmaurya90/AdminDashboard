import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../pages/user-list/user-list.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: 'users',
    redirectTo: '/users/list',
    pathMatch: 'full'
  },
  { path: 'users/list', component: UserListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
