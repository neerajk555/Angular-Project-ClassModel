import { Component, NgModule } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { ContainerBookingComponent } from './container-booking/container-booking.component';
import { InitialLandingComponent } from './initial-landing/initial-landing.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { MainLandingPageComponent } from './main-landing-page/main-landing-page.component';
import { ContainerWatchlistComponent } from './container-watchlist/container-watchlist.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TerminalComponent } from './terminal/terminal.component';

const routes: Routes = [
  {path:'',component:MainLandingPageComponent},
  {path:'InitialLogin',component:InitialLoginComponent},
  {path:'mainlogin',component:MainLoginComponent},
  {path:'InitialLanding',component:InitialLandingComponent,children:[
    {path:'watchlist',component:ContainerWatchlistComponent},
    {path:'bookings',component:ContainerBookingComponent},
    {path:'profile',component:UserInfoComponent},
    {path:'',component:ContainerWatchlistComponent}
  ]},
  {path:'UserRegistration',component:UserRegistrationComponent},
  {path:'userInfo',component:UserInfoComponent},
  {path:'ForgotPassword',component:ForgotPasswordComponent},
  {path:'Terminal',component:TerminalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
