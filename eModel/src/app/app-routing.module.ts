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
import { FeedbackComponent } from './feedback/feedback.component';
import { ContainersComponent } from './containers/containers.component';
import { UserauthGuard } from './userauth.guard';
import { TerminalauthGuard } from './terminalauth.guard';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:'home',component:MainLandingPageComponent},
  {path:'InitialLogin',component:InitialLoginComponent},
  {path:'InitialLogin?admin',component:InitialLoginComponent},
  {path:'mainlogin',component:MainLoginComponent},
  {path:'UserRegistration',component:UserRegistrationComponent},
  {path:'ForgotPassword',component:ForgotPasswordComponent},
  {path:'InitialLanding',component:InitialLandingComponent,children:[
    {path:'watchlist',component:ContainerWatchlistComponent,canActivate:[UserauthGuard]},
    {path:'bookings',component:ContainerBookingComponent,canActivate:[UserauthGuard]},
    {path:'',component:ContainerWatchlistComponent,canActivate:[UserauthGuard]},
    {path:'feedback',component:FeedbackComponent},
    {path:'profile',component:UserInfoComponent},
    {path:'userrequests',component:UserrequestComponent,canActivate:[TerminalauthGuard]},
    {path:'Containers',component:ContainersComponent,canActivate:[TerminalauthGuard]},
    {path:'admin-terminal',component:AdminTerminalComponent,canActivate:[AuthGuard]},
    {path:'admin-user',component:AdminUserComponent,canActivate:[AuthGuard]},
  ]},
  {path:'',component:MainLandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
