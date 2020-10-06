import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { ErrorService } from './services/error.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from './shared/shared/shared.module';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { NavService } from './services/nav.service';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { DocumentsComponent } from './drivers/dialogs/documents/documents.component';
import { DriverDetailComponent } from './drivers/dialogs/driver-detail/driver-detail.component';

import { RejectComponent } from './drivers/dialogs/reject/reject.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { AngularFireDatabase } from 'angularfire2/database';
import { LiveDriversComponent } from './pages/live-drivers/live-drivers.component';
import { DriversHistoryComponent } from './pages/drivers-history/drivers-history.component';
import { HistoryMapComponent } from './pages/history-map/history-map.component';
import * as firebase from 'firebase/app';
import { NotificationComponent } from './pages/notification/notification.component';
import { SettingsModule } from './settings/settings.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VendorHomeComponent } from './pages/vendor-home/vendor-home.component';
import { MapComponent } from './pages/map/map.component';

// import { ChangePasswordComponent } from './pages/change-password/change-password.component';

firebase.initializeApp(environment.firebase);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavBarComponent,
    MapComponent,
    ConfirmComponent,
    LiveDriversComponent,
    DriversHistoryComponent,
    HistoryMapComponent,
    NotificationComponent,
    VendorHomeComponent,
    // ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
     apiKey: 'AIzaSyBTy_cZpCkUyKKyUKssVdCIzrq0T4azHY4'
    }),
    AgmJsMarkerClustererModule,
    SharedModule,
    UsersModule,
    DriversModule,
    SettingsModule,
    AppRoutingModule
  ],
  providers: [UserService, ErrorService, NavService, AngularFireDatabase],
  entryComponents: [DocumentsComponent, RejectComponent, ConfirmComponent,DriverDetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
