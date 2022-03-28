import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  url = "http://localhost:3000/containertype_details";
  urlpayment = "http://localhost:3000/payment_details";
  constructor(private http: HttpClient) { }

  users() { return this.http.get(this.url); }
  payment() { return this.http.get(this.urlpayment); }

  getAppointmentDetails() { return this.http.get("http://localhost:3000/appointment_details") }
  postAppointmentDetails(data: any) { return this.http.post("http://localhost:3000/appointment_details", data) }

  getTerminalDetails() { return this.http.get("http://localhost:3000/terminal_details/") }
  getTerminalDetailsById(data: any) { return this.http.get("http://localhost:3000/terminal_details/" + data) }

  getContainerDetails() { return this.http.get("http://localhost:3000/containertype_details/") }
  getContainerDetailsById(data: any) { return this.http.get("http://localhost:3000/containertype_details/" + data) }
  
}
