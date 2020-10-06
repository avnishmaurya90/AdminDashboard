import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserRoutingModule } from './routes/user-routing.module';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  imports: [CommonModule, UserRoutingModule, SharedModule],
  exports: [UserListComponent],
  declarations: [UserListComponent]
})
export class UsersModule { }
