import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators, } from '@angular/forms';
import { FeedbackServicesService } from '../feedback-services.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  constructor(public fb:FormBuilder, public ds:FeedbackServicesService) { }

  feedbackFormData:any;
  feedbackData:any;

  ngOnInit(): void {
    this.feedbackFormData = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  date=new Date();
  postFeedbackData()
  {
    
    this.feedbackData={
      "id": Math.floor(Math.random() * 100),
      "usertype": "",
      "userid": "",
      "feedaback_type": this.feedbackFormData.value.title,
      "description": this.feedbackFormData.value.description,
      "feedback_time": this.date,
      "read_status": false
    }

    console.log(this.feedbackData);
    this.ds.postFeedbackData(this.feedbackData).subscribe((data) => console.log(data));


  }

}
