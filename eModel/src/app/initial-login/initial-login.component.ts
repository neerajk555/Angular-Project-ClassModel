import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-login',
  templateUrl: './initial-login.component.html',
  styleUrls: ['./initial-login.component.css']
})
export class InitialLoginComponent implements OnInit {

  constructor(private ds: UserDataService, public fb: FormBuilder, public router: Router) { }
  userInfo: any;
  terminalInfo: any;
  userFormData: any;
  submitted = false;
  alertmsg = false;
  flag = false;
  showLoadingIndicator = true;
  logintype:any;

  ngOnInit(): void {
    if(this.ds.logintype!="")
    {
      setTimeout(()=>
      {
        this.showLoadingIndicator=false;
      },1000);
      this.logintype=this.ds.logintype; 
      if(this.ds.logintype=="user"){
        this.ds.getUserData().subscribe((data) => this.fatchUserData(data));
      }
      else if(this.ds.logintype=="terminal"){
        this.ds.getterminalData().subscribe((data) => this.fatchTerminalData(data)); 
      }
      this.userFormData = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
    else{
      this.router.navigate(['/','mainlogin']);
    }
  }

  fatchUserData(data: any) {
    this.userInfo = data;
  //  console.log(this.userInfo);
  }

  fatchTerminalData(data: any) {
    this.terminalInfo = data;
  // console.log(this.terminalInfo);
  }

  get f() { return this.userFormData.controls; }

  AuthCheck() {

    this.submitted = true;
    if (this.userFormData.invalid) {
      return;
    }

    /*console.log(this.userFormData.value.username);
    console.log(this.ds.logintype);
    console.log(this.userFormData.value.password);*/

    if (this.ds.logintype == 'user') {

      for (let i = 0; i < this.userInfo.length; i++) {
        if (this.userFormData.value.username == this.userInfo[i].user_username && this.userFormData.value.password == this.userInfo[i].user_password) {
          console.log(this.userFormData.value.username);
          this.flag = true;
          this.ds.loginid=this.userInfo[i].id;
          this.router.navigateByUrl('/InitialLanding');
          break;
        }
      }
      if (this.flag == false) {
        this.alertmsg = true;
      }
    }
    else if (this.ds.logintype = 'terminal') {
      for (let i = 0; i < this.terminalInfo.length; i++) {
        if (this.userFormData.value.username == this.terminalInfo[i].terminal_username && this.userFormData.value.password == this.terminalInfo[i].terminal_password) {
          console.log(this.userFormData.value.username);
          this.flag = true;
          this.ds.loginid=this.terminalInfo[i].id;
          this.router.navigateByUrl('/InitialLanding');
          break;
        }
      }
      if (this.flag == false) {
        this.alertmsg = true;
      }
    }

  }

  closealert() {
    this.userFormData.reset({});
    this.alertmsg = false;
    this.submitted = false;
  }

  logopath = "../assets/images/logos/logo.png";


}
