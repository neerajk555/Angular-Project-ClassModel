import { Component, OnInit } from '@angular/core';
import { UpdatedateDirective } from '../updatedate.directive';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-final-user-payment',
  templateUrl: './final-user-payment.component.html',
  styleUrls: ['./final-user-payment.component.css']
})
export class FinalUserPaymentComponent implements OnInit {

  constructor(public dt:WatchlistService) { }
  
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
