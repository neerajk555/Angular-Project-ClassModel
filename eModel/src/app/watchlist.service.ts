import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(public http: HttpClient) { }
  url = {
    "pay-data":"http://localhost:3000/pay-data"
  }
  
  getData() {
    return this.http.get(this.url['pay-data']);
  }
}

