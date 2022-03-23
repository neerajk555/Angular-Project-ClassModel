import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  url = "http://localhost:3000/containertype_details";
  urlpayment = "http://localhost:3000/payment_details";
  urlreceiver = "http://localhost:3000/booking_details";
  constructor(private http:HttpClient) { }
  users(){
    return this.http.get(this.url);
  }
  payment(){
    return this.http.get(this.urlpayment);
  }
  receiver(){
    return this.http.get(this.urlreceiver);
  }
  ReceiverData(data:any){
    return this.http.post(this.urlreceiver,data);
  }
  
}
