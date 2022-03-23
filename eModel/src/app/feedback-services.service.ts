import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServicesService {

  constructor(public ht:HttpClient) { }

  urls={
    "feedbackdata":"http://localhost:3000/feedback_details/"
  }

  
  postFeedbackData(data:any)
  {
    return this.ht.post(this.urls.feedbackdata, data);
  }
  
}
