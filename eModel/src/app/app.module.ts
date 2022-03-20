import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { ContainerWatchlistComponent } from './container-watchlist/container-watchlist.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ContainerBookingComponent } from './container-booking/container-booking.component';
import { TerminalComponent } from './terminal/terminal.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { InitialLandingComponent } from './initial-landing/initial-landing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdatedateDirective } from './updatedate.directive';
import { UserInfoComponent } from './user-info/user-info.component';


@NgModule({
  declarations: [
    AppComponent,
    InitialLoginComponent,
    ContainerWatchlistComponent,
    UserRegistrationComponent,
    ContainerBookingComponent,
    TerminalComponent,
    AdminControlComponent,
    InitialLandingComponent,
    UpdatedateDirective,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
