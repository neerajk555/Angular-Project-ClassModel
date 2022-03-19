import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private ht: HttpClient) { }

  userData = " http://localhost:3000/user_details/";

  getUserData()
  {
    return this.ht.get(this.userData);
  }

  postUserData(data:any)
  {
    return this.ht.post(this.userData, data);
  }

}
