import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
<<<<<<< HEAD
import { UserRegistrationComponent } from './user-registration/user-registration.component';
=======
import { ContainerWatchlistComponent } from './container-watchlist/container-watchlist.component';
>>>>>>> 3565802d746a7ce194a570d1d8855249b5349830

@NgModule({
  declarations: [
    AppComponent,
    InitialLoginComponent,
<<<<<<< HEAD
    UserRegistrationComponent
=======
    ContainerWatchlistComponent
>>>>>>> 3565802d746a7ce194a570d1d8855249b5349830
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
