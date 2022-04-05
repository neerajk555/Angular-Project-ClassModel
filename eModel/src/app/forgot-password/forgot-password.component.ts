import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private ds: UserDataService, public fb: FormBuilder, public router: Router) { }

  userInfo: any;
  userFormData: any;
  userPasswordData: any;
  flag = false;
  submitted = false;
  submitted1 = false;
  alertmsg = false;
  user: any;

  ngOnInit(): void {

    this.ds.getUserData().subscribe((data) => this.fatchUserData(data));


    this.userFormData = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.userPasswordData = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  fatchUserData(data: any) {
    this.userInfo = data;
    console.log(this.userInfo);
  }

  get f() { return this.userFormData.controls; }
  get g() { return this.userPasswordData.controls; }


  AuthCheck() {

    this.submitted = true;
    if (this.userFormData.invalid) {
      return;
    }


    for (let i = 0; i < this.userInfo.length; i++) {

      if ((this.userFormData.value.username == this.userInfo[i].user_username) && ((this.userFormData.value.email) == this.userInfo[i].user_emailid)) {
        this.flag = true;
        this.user = this.userInfo[i];
        console.log("pass");
        break;
      }

    }

  }

  logopath = "../assets/images/logos/logo.png";

  passCheck() {

    this.submitted1 = true;
    if (this.userPasswordData.invalid) {
      return;
    }
    if (this.userPasswordData.value.password != this.userPasswordData.value.confirmPassword) {
      this.alertmsg = true;
      return;
    }

    this.user.user_password=this.userPasswordData.value.password;
    this.ds.putuserdata(this.user).subscribe((data) => console.log(data));
    this.router.navigate(['/', 'InitialLogin']);
  }

}
