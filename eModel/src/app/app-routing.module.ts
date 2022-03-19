import { NgModule } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminControlComponent } from './admin-control/admin-control.component';
import { ContainerBookingComponent } from './container-booking/container-booking.component';
import { InitialLandingComponent } from './initial-landing/initial-landing.component';
import { InitialLoginComponent } from './initial-login/initial-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserInfoComponent } from './user-info/user-info.component';


const routes: Routes = [
  {path:'',component:InitialLoginComponent},
  {path:'UserRegistration',component:UserRegistrationComponent},
  {path:'InitialLanding',component:InitialLandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
