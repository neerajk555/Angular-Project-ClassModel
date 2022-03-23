import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private usrds:UserDataService) { }
  userdata:any;
  ngOnInit(): void {
    this.usrds.getUserDataById(this.usrds.loginid).subscribe((data)=>this.showData(data));
  }

  showData(data:any){
    this.userdata={
      "fname": data.user_first_name,
      "lname": data.user_last_name,
      "phone": data.user_contact,
      "mail": data.user_emailid,
      "password": data.user_password
    }
  }
  logintoggleButton:boolean=true;
  public toggleButton: boolean = true;
  enable() {
    this.toggleButton = false;
  }

  disable() {
    this.toggleButton = true;
  }

  loginenable(){
    this.logintoggleButton=false;
  }
  logindisable(){
    this.logintoggleButton=true;
  }
}