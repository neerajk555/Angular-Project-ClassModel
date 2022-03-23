import { Component, OnInit } from '@angular/core';
import { UpdatedateDirective } from '../updatedate.directive';
import { WatchlistService } from '../watchlist.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-final-user-payment',
  templateUrl: './final-user-payment.component.html',
  styleUrls: ['./final-user-payment.component.css']
})
export class FinalUserPaymentComponent implements OnInit {
  payment: any;

  constructor(public dt:WatchlistService,public formBuilder: FormBuilder) { 
    this.payment = this.formBuilder.group({
      name: ['', [Validators.required]],
      cvv:['', [Validators.required,Validators.minLength(3),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      cardNumber:['', [Validators.required,Validators.minLength(15),Validators.pattern(/^4[0-9]{12}(?:[0-9]{3})?$/)]]
    });
  }
  
  containers: any;
  myForm: any;
  totalPrice = 0;

  addContainer(data: any) {
    this.containers = data;
    console.log(this.containers)
    console.log(data)
    for(var i of data){
      this.totalPrice += i['Price']
    }
    console.log(this.totalPrice)
  }
  ngOnInit(): void {
    this.dt.getData().subscribe((data: any) => this.addContainer(data));
    //this.dt.getData().subscribe((data) => console.log(data));
  }
message(){
  alert("Payment Successful");
}
}
