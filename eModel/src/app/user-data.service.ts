import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private ht: HttpClient) { }

  logintype = "user";
  loginid = "1";
  user: any;

  urls={
    "userdata":"http://localhost:3000/user_details/",
    "carddata":"http://localhost:3000/card_details/",
    "containertypedata":"http://localhost:3000/containertype_details/",
    "terminaldata":"http://localhost:3000/terminal_details/",
    "containerdata":"http://localhost:3000/container_details/",
    "appointmentdata":"http://localhost:3000/appointment_details/",
    "paymentdata":"http://localhost:3000/payment_details/",
    "statusdata":"http://localhost:3000/status_details/",
    "feedbackdata":"http://localhost:3000/feedback_details/",
    "admindata":"http://localhost:3000/admin_master/",
    "notification":"http://localhost:3000/notification_details/"
  }

  getUserData() { return this.ht.get(this.urls.userdata); }
  getUserDataById(data: any) { return this.ht.get(this.urls.userdata + data); }
  postUserData(data: any) { return this.ht.post(this.urls.userdata, data); }
  
  getterminalData() { return this.ht.get(this.urls.terminaldata); }
  getterminalDataById(data: any) { return this.ht.get(this.urls.terminaldata + data); }
  
  getappointmentdata() { return this.ht.get(this.urls.appointmentdata); }
  putappointmentdata(data: any, id: any) { return this.ht.put(`${this.urls.appointmentdata}/${id}`, data); }


  putUserData(data: any, index: any) {
    return this.ht.put(this.urls.userdata+index, data);
  }
  getadminData()
  {
    return this.ht.get(this.urls.admindata);
  }

  putuserdata(data:any) {
    return this.ht.put(this.urls.userdata+data.id, data);
  }

}
