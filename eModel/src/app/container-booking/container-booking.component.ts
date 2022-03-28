import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { HttpClient } from '@angular/common/http';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-container-booking',
  templateUrl: './container-booking.component.html',
  styleUrls: ['./container-booking.component.css']
})
export class ContainerBookingComponent implements OnInit {
 

  constructor(
    public getAppointmentData: BookingService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }
 
  recDataTerminal: any;
  recAppointmentData: any;
  payment: any;
  receiver: any;
  value: any;
  requestForm: any;
  recContainerData: any;
  closeResult = '';
  source: any;
  destination: any;
  
  fieldsForTable = [
    "Appointment Id",
    "Container Id",
    "Expand/Collapse",
    "Status",
    "Source",
    "Destination",
    "Pickup Date",
    "Sending Date",
    "Cost",
    "Terminal Remark"
  ]

  formPostData: any = {
    "id": 0,
    "appointment_id": "",
    "user_id": "USR100001",
    "container_id": "",
    "pickup_date": "",
    "sending_date": "",
    "source_terminal_id": "",
    "delivery_terminal_id": "",
    "delivery_date": "",
    "user_remarks": "",
    "cost": "requested",
    "terminal_remarks": "NA",
    "datetime": "",
    "receiver_fullname": "",
    "receiver_phone": "",
    "receiver_mail": "",
    "appointment_status": "requested"
  }

  onSubmit(requestForm: any) {
    let idOrigin = Math.floor(Math.random() * 1000000000)
    let idAppointment = Math.floor(Math.random() * 1000000).toString()
    idAppointment = "APT" + idAppointment
    let idSource: any
    let idDestination: any
    let idContainer: any
    
    for (let i = 0; i < this.recDataTerminal.length; i++) {
      if (requestForm.value.source_terminal_id == this.recDataTerminal[i].city) {
        idSource = this.recDataTerminal[i].terminal_id
      }
      
      if (requestForm.value.delivery_terminal_id == this.recDataTerminal[i].city) {
        idDestination = this.recDataTerminal[i].terminal_id
      }
    }

    for (let i = 0; i < this.recContainerData.length; i++) {
      if (requestForm.value.container_id == this.recContainerData[i].contype_type) {
        idContainer = this.recContainerData[i].contype_id
      }
    }

    this.formPostData.id = idOrigin
    this.formPostData.appointment_id = idAppointment
    this.formPostData.source_terminal_id = idSource
    this.formPostData.delivery_terminal_id = idDestination
    this.formPostData.container_id = idContainer
    this.formPostData.pickup_date = requestForm.value.pickup_date
    this.formPostData.sending_date = requestForm.value.sending_date
    this.formPostData.user_remarks = requestForm.value.user_remarks
    this.formPostData.receiver_fullname = requestForm.value.receiver_fullname
    this.formPostData.receiver_phone = requestForm.value.receiver_phone
    this.formPostData.receiver_mail = requestForm.value.receiver_mail

    this.getAppointmentData.postAppointmentDetails(this.formPostData).subscribe((data)=>{
      console.log(data);   
    })
    this.requestForm.reset();
    window.location.reload()
  }

  //==================================================================================================================================
  expand(index: any) {
    this.recAppointmentData[index].loadRow = true;
  }

  collapse(index: any) {
    this.recAppointmentData[index].loadRow = false;
  }

  open(content: any, data: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  ngOnInit(): void {
    this.getAppointmentData.getTerminalDetails().subscribe((data: any) => {
      this.recDataTerminal = data
    });

    this.getAppointmentData.getContainerDetails().subscribe((data: any) => {
      this.recContainerData = data
    });

    this.getAppointmentData.getAppointmentDetails().subscribe((data) => {
      this.recAppointmentData = data;
      let numS = 0
      let numD = 0
      let numC = 0
      this.recAppointmentData.forEach((element: any) => {
        let sourceId = element.source_terminal_id;
        let destinationId = element.delivery_terminal_id;
        let containerTypeId = element.container_id;

        let sourceString = `?terminal_id=${sourceId}`
        let destinationString = `?terminal_id=${destinationId}`
        let containerString = `?contype_id=${containerTypeId}`

        this.getAppointmentData.getTerminalDetailsById(sourceString).subscribe((data: any) => {
          this.recAppointmentData[numS] = { ...this.recAppointmentData[numS], "source": data[0].city }
          numS++
        });
        this.getAppointmentData.getTerminalDetailsById(destinationString).subscribe((data: any) => {
          this.recAppointmentData[numD] = { ...this.recAppointmentData[numD], "destination": data[0].city }
          numD++
        });
        this.getAppointmentData.getContainerDetailsById(containerString).subscribe((data: any) => {
          this.recAppointmentData[numC] = { ...this.recAppointmentData[numC], "containerType": data[0].contype_type }
          numC++
        });

      });
    });

    this.requestForm = this.fb.group({
      "source_terminal_id": ["", [Validators.required]],
      "delivery_terminal_id": ["", [Validators.required]],
      "container_id": [, [Validators.required]],
      "pickup_date": ["", [Validators.required]],
      "sending_date": ["", [Validators.required]],
      "user_remarks": ["", [Validators.required]],
      "receiver_fullname": ["", [Validators.required]],
      "receiver_phone": ["", [Validators.required]],
      "receiver_mail": ["", [Validators.required]]
    });

  }
}
