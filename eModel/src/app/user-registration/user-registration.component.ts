import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  public toggleButton: boolean = false;
  constructor() { }
  enable(){
    this.toggleButton = false
 }

 disable(){
    this.toggleButton = true
 }
  ngOnInit(): void {
  }

}
