import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators, AbstractControl,ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private ds:UserDataService, public fb:FormBuilder,private router:Router) { }
  UserFormData:any;
  postuserdata:any;
  submitted = false;

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
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      confirmPassword: ['', Validators.required],
      password:['',Validators.required]
    });
  }

  get f() { return this.UserFormData.controls; }

  PostUserFormData(){

    this.submitted = true;
    if (this.UserFormData.invalid) {
      return;
  }
    
  this.postuserdata =
  {
        "id":Math.floor(Math.random() * 100),
        "user_first_name":this.UserFormData.value.first_name,
        "user_last_name":this.UserFormData.value.last_name,
        "user_contact":this.UserFormData.value.phoneNumber,
        "user_emailid":this.UserFormData.value.email,
        "user_username":this.UserFormData.value.username,
        "user_password":this.UserFormData.value.confirmPassword,
        "user_document":"../assets/images/user/usercard.png",
        "user_profilephoto":"../assets/images/user/profile.png",
        "user_company_name":this.UserFormData.value.companyName,
        "user_watchlist_ids":[],
        "user_status":true,
        "user_token":"",        
        "authorize":false
  }
//  console.log(this.postuserdata); 
  this.ds.postUserData(this.postuserdata).subscribe((data) => console.log(data));
  this.router.navigate(['/','mainlogin']);
  }


}
