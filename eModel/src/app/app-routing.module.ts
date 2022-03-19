import { NgModule } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { ContainerBookingComponent } from './container-booking/container-booking.component';
import { InitialLandingComponent } from './initial-landing/initial-landing.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { MainLoginComponent } from './main-login/main-login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TerminalComponent } from './terminal/terminal.component';


const routes: Routes = [
  {path:'',component:MainLoginComponent},
  {path:'InitialLogin',component:InitialLoginComponent},
  {path:'UserRegistration',component:UserRegistrationComponent},
  {path:'InitialLanding',component:InitialLandingComponent},
  {path:'userInfo',component:UserInfoComponent},
  {path:'ForgotPassword',component:ForgotPasswordComponent},
  {path:'Terminal',component:TerminalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
