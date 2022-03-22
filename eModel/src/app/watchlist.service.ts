import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  constructor(public http: HttpClient) { }
  url = {
    "pay-data":"http://localhost:3000/pay-data",
    "containerWatchlist": "http://localhost:3000/container_details/"
  }
  
  getData() {
    return this.http.get(this.url['pay-data']);
  }

  getContainerWatchlist() {
    return this.http.get(this.url['containerWatchlist']);
  }

  delete(id: any) {

    return this.http.delete(this.url['containerWatchlist'] + id);
  }
}

