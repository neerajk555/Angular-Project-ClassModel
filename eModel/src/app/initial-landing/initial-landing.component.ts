import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlurrBgService } from '../blurr-bg.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-initial-landing',
  templateUrl: './initial-landing.component.html',
  styleUrls: ['./initial-landing.component.css']
})
export class InitialLandingComponent implements OnInit {

  logo = "../../assets/images/logos/logo.png";
  constructor(config: NgbModalConfig, private modalService: NgbModal, public bs: BlurrBgService, private usrds: UserDataService, private router: Router) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  //For User Prompt
  logintype = "";
  loginid = "";
  userimg = "";
  username = "";
  userFullName = "";

  ngOnInit(): void {
    if (this.usrds.logintype != "" && this.usrds.loginid != "") {
      this.logintype = this.usrds.logintype;
      this.loginid = this.usrds.loginid;
      if (this.logintype == "user") {
        this.usrds.getUserDataById(this.loginid).subscribe(data => this.showdata(data));
      }
      else if (this.logintype == "terminal") {
        this.usrds.getterminalDataById(this.loginid).subscribe(data => this.showdata(data));
      }
      else if (this.logintype == "admin") {
        this.usrds.getadminDataById(this.loginid).subscribe(data => this.showdata(data));
      }
    }
    else {
      this.router.navigate(['/', 'mainlogin']);
    }
    this.usrds.getNotifications().subscribe(data => this.notify(data));
  }

  showdata(data: any) {
    // console.log(data);
    if (this.logintype == "terminal") {
      this.username = data.terminal_username;
      this.userimg = data.terminal_logo;
      this.userFullName = data.terminal_name;
    }
    if (this.logintype == "user") {
      this.username = data.user_username;
      this.userimg = data.user_profilephoto;
      this.userFullName = data.user_firstname + " " + data.user_lastname;
    }
    if (this.logintype == "admin") {
      this.username = data.admin_username;
      this.userFullName = data.admin_first_name + " " + data.admin_last_name;
    }
  }

  show = false;
  ShowMenu() {
    if (this.show == false) {
      this.show = true;
      this.bs.show = true;
    }
    else {
      this.show = false;
      this.bs.show = false;
    }
  }

  open(content: any) {
    this.modalService.open(content);
  }

  logout() {
    this.usrds.loginid = "";
    this.usrds.logintype = "";
    this.modalService.dismissAll();
    this.router.navigate(['/', 'home']);
  }

  //Notification
  notifications: any = [];

  notify(data: any) {
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].sendto_id == this.loginid) {
        let element: any = {};
        element.id = data[i].id;
        element.sendto_id = data[i].sendto_id
        element.date = data[i].date;
        element.description = data[i].description;
        element.status = data[i].status;
        this.notifications.push(element);
      }
    }
  }
  
  /////////// Function for posting a new notifiction by Terminal 
  ////// I have writter it here because the terminal component is still pending, but you 
  //// can simply cut and paste it there when it's ready.

  newNoti = "New notification";
  postNewNotification() {
    let newNotification: any = {
      "id": ++(this.notifications.length),
      "sendto_id": this.usrds.loginid,
      "date": new Date(),
      "description": this.newNoti,
      "status": false
    }
    this.usrds.postNotification(newNotification).subscribe((data) => console.log(data));
  }
}