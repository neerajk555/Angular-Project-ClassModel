import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { HttpClient } from '@angular/common/http';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-container-booking',
  templateUrl: './container-booking.component.html',
  styleUrls: ['./container-booking.component.css']
})
export class ContainerBookingComponent implements OnInit {

  users: any;
  payment: any;
  receiver: any;
  constructor(private userData: BookingService, private modalService: NgbModal, private http: HttpClient) {
    userData.users().subscribe((data) => {

      this.users = data
    });
    userData.payment().subscribe((data) => this.payment = data);
    userData.receiver().subscribe((data) => this.receiver = data);

  }
  myForm: any;
  formIsNew: any;

  ngOnInit(): void {
  }

  expand(index: any) {
    this.receiver[index].loadRow = true;
  }

  collapse(index: any) {
    this.receiver[index].loadRow = false;
  }

  closeResult = '';
  open(content: any, data: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });


  }

  onSubmit(data: any) {
    console.warn(data);
    this.userData.ReceiverData(data).subscribe((result) => {
      console.warn(result)
    }
    )
    //this.modalService.dismissAll();
  }
}


