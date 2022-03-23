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
import { UserrequestComponent } from './userrequest/userrequest.component';
import { AdminTerminalComponent } from './admin-terminal/admin-terminal.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

const routes: Routes = [
  {path:'home',component:MainLandingPageComponent},
  {path:'InitialLogin',component:InitialLoginComponent},
  {path:'mainlogin',component:MainLoginComponent},
  {path:'admin-terminal',component:AdminTerminalComponent},
  {path:'admin-user',component:AdminUserComponent},
  {path:'admin',component:AdminControlComponent},
  {path:'InitialLanding',component:InitialLandingComponent,children:[
    {path:'watchlist',component:ContainerWatchlistComponent},
    {path:'bookings',component:ContainerBookingComponent},
    {path:'profile',component:UserInfoComponent},
    {path:'userrequests',component:UserrequestComponent},
    {path:'',component:ContainerWatchlistComponent}
  ]},
  {path:'UserRegistration',component:UserRegistrationComponent},
  {path:'userInfo',component:UserInfoComponent},
  {path:'ForgotPassword',component:ForgotPasswordComponent},
  {path:'Terminal',component:TerminalComponent},
  {path:'',component:MainLandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
