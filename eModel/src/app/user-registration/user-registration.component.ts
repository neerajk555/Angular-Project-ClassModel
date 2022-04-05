import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private ds: UserDataService, public fb: FormBuilder, private router: Router) { }

  UserFormData: any;
  postuserdata: any;
  submitted = false;
  alertmsg = false;
  public toggleButton: boolean = false;
  logopath = "../assets/images/logos/logo-image.png";

  enable() {
    this.toggleButton = false
  }

  disable() {
    this.toggleButton = true
  }

  ngOnInit(): void {
    this.UserFormData = this.fb.group({
      id: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      companyName: ['', Validators.required],
      profile: ['', Validators.required],
      Document: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      confirmPassword: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.UserFormData.controls; }
  
  selectedfiledocument:any;
  documentimageurl="";
  selectedfileprofile:any;
  profileimageurl="";

  PostUserFormData() {
  onchangedocument(event:any){
    var filetoUpload= event.target.files.item(0);
    console.log(filetoUpload);
    let reader = new FileReader();
    reader.onload=(event:any)=>{
    };
  }
  onchangeprofile(event:any){ 
    this.selectedfileprofile = <File>event.target.files[0];
  }

  //Post Data in JSON
  PostUserFormData() {
    this.submitted = true;
    if (this.UserFormData.invalid) {
      return;
    }
    this.ds.getUserData().subscribe((data: any) => {
      let userid=(10001+data.length);
      this.postuserdata =
      {
        "id":userid,
        "user_firstname": this.UserFormData.value.first_name,
        "user_lastname": this.UserFormData.value.last_name,
        "user_contact": this.UserFormData.value.phoneNumber,
        "user_email": this.UserFormData.value.email,
        "user_username": this.UserFormData.value.username,
        "user_password": this.UserFormData.value.confirmPassword,
        "user_document": "../assets/images/user/usercard.png",
        "user_profilephoto": "../assets/images/user/profile.png",
        "user_company_name": this.UserFormData.value.companyName,
        "user_watchlist": [],
        "user_status": true,
        "user_token": "",
        "user_authentication": false,
        "user_registration_date": Date()
      }
    // this.ds.postUserData(this.postuserdata).subscribe((data) => console.log(data));
    this.ds.postUserData(this.postuserdata).subscribe();
    this.ds.postNewNotification(this.postuserdata.id,`Welcome ${this.postuserdata.user_firstname} To eModal Family!`);
  });
    //  console.log(this.postuserdata); 
    this.ds.logintype = "user";    
    this.router.navigate(['/', 'InitialLogin']);
  }

  passType = 'password';
  flag = true;
  showPassword(ptype: any) {
    if (ptype == "show") {
      this.passType = 'text';
      this.flag = false;
    }
    else if (ptype == "hide") {
      this.passType = 'password';
      this.flag = true;
    }
  }

  //Show Password
  passType = 'password';
  ConfirmpassType = 'password';
  flag = true;

  showPassword(ptype: any) {
    if (ptype == "show") {
      this.passType = 'text';
      this.ConfirmpassType = 'text';
      this.flag = false;
    }
    else if (ptype == "hide") {
      this.passType = 'password';
      this.ConfirmpassType = 'password';
      this.flag = true;
    }
  }

  // Confirmflag = true;
  // ConfirmShowPassword(ptype: any) {
  //   if (ptype == "show") {
  //     this.ConfirmpassType = 'text';
  //     this.Confirmflag = false;
  //   }
  //   else if (ptype == "hide") {
  //     this.ConfirmpassType = 'password';
  //     this.Confirmflag = true;
  //   }
  // }

}
