import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { ContainerWatchlistComponent } from './container-watchlist/container-watchlist.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ContainerBookingComponent } from './container-booking/container-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialLoginComponent,
    ContainerWatchlistComponent,
    UserRegistrationComponent,
    ContainerBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
