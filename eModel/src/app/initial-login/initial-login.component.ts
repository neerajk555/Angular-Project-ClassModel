import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-login',
  templateUrl: './initial-login.component.html',
  styleUrls: ['./initial-login.component.css']
})
export class InitialLoginComponent implements OnInit {

  constructor(private ds:UserDataService, public fb:FormBuilder, public router:Router) { }

  userInfo:any;
  userFormData:any;
  //flag=false;
  showLoadingIndicator = true;
  ngOnInit(): void {
    setTimeout(()=>
    {
      this.showLoadingIndicator=false;
    },3000);
    this.ds.getUserData().subscribe((data) => this.fatchUserData(data));


    this.userFormData = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

   fatchUserData(data:any)
   {
      this.userInfo=data;
      console.log(this.userInfo);
   }

   AuthCheck()
   {
      console.log(this.userFormData.value.username);
      console.log(this.userFormData.value.password);
      console.log(this.userInfo[0].user_username);
      if(this.userFormData.value.username==this.userInfo[0].user_username && this.userFormData.value.password==this.userInfo[0].user_password)
      {
          //this.flag=true;
          console.log(this.userFormData.value.username);
          this.router.navigateByUrl('/InitialLanding');
      }
   }

  logopath="../assets/images/logos/logo.png";


}
