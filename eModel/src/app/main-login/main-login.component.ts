import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css']
})
export class MainLoginComponent implements OnInit {

  constructor(private router:Router,private ds:UserDataService) { }

  ngOnInit(): void {
  }


  selectuser(path:string)
  {
    if(path=="terminal")
      this.ds.logintype="terminal";
    if(path=="user")
      this.ds.logintype="user";
    this.router.navigate(['/','InitialLogin']);
  }
  terminalimage="../assets/images/logos/porticon.png";
  userimage="../assets/images/logos/userlogo.png";

}
