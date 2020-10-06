import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaresComponent } from './pages/fares/fares.component';
import { SettingsRoutingModule } from './routes/settings-routing.module';
import { FaresListComponent } from './pages/fares-list/fares-list.component';
import { SharedModule } from '../shared/shared/shared.module';
import { FareEditComponent } from './pages/fare-edit/fare-edit.component';
import { FAndBListComponent } from './pages/f-and-b-list/f-and-b-list.component';
import { NonFAndBListComponent } from './pages/non-f-and-b-list/non-f-and-b-list.component';
import { ECommerceListComponent } from './pages/e-commerce-list/e-commerce-list.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { SiteConfigurationComponent } from './pages/site-configuration/site-configuration.component';
import { ContactConfigurationComponent } from './pages/contact-configuration/contact-configuration.component';
import { LocationConfigurationComponent } from './pages/location-configuration/location-configuration.component';

@NgModule({
  imports: [CommonModule, SettingsRoutingModule, SharedModule],
  exports: [FaresComponent, FaresListComponent],
  declarations: [
    FaresComponent,
    FaresListComponent,
    FareEditComponent,
    FAndBListComponent,
    NonFAndBListComponent,
    ECommerceListComponent,
    ConfigurationComponent,
    SiteConfigurationComponent,
    ContactConfigurationComponent,
    LocationConfigurationComponent
  ]
})
export class SettingsModule { }
