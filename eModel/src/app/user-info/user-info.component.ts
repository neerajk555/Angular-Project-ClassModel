import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
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