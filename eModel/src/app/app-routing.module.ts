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


const routes: Routes = [
  {path:'',component:MainLandingPageComponent},
  {path:'logintype',component:InitialLoginComponent},
  {path:'InitialLanding',component:InitialLandingComponent,children:[
    {path:'watchlist',component:ContainerWatchlistComponent},
    {path:'bookings',component:ContainerBookingComponent},
    {path:'profile',component:UserInfoComponent},
    {path:'',component:ContainerWatchlistComponent}
  ]},
  {path:'UserRegistration',component:UserRegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
