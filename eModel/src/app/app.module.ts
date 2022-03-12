import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { ContainerWatchlistComponent } from './container-watchlist/container-watchlist.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ContainerBookingComponent } from './container-booking/container-booking.component';
import { TerminalComponent } from './terminal/terminal.component';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { InitialLandingComponent } from './initial-landing/initial-landing.component';
import { UpdatedateDirective } from './updatedate.directive';

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
    UpdatedateDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
