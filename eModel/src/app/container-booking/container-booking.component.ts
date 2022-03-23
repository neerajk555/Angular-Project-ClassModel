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

  constructor(public getAppointmentData: BookingService, private modalService: NgbModal, private http: HttpClient, public getgetAppointmentData: UserDataService, private fb: FormBuilder, private router: Router) { }
  recDataTerminal: any;
  recContainerData:any;
  requestForm:any;
  fieldsForTable = [
    "Appointment Id",
    "Container Id",
    "Expand/Collapse",
    "Status",
    "Source",
    "Destination",
    "Pickup Date",
    "Delivery Date",
    "Cost",
    "Remark"
  ]
  temp1: any
  temp(){
    console.log(this.temp1);
    
  }

  recAppointmentData: any;
  payment: any;
  receiver: any;
  value: any;
  myForm: any;
  formIsNew: any;
  source: any;
  destination: any;
  getcontainer:any;
  expand(index: any) {
    this.recAppointmentData[index].loadRow = true;
  }

  collapse(index: any) {
    this.recAppointmentData[index].loadRow = false;
  }

  closeResult = '';
  open(content: any, data: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl', backdrop: 'static' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }
  dest:any=[];

  onChange(val:any){
    this.dest=[];
    for(let i=0; i<this.recDataTerminal.length; i++){
      let str =JSON.stringify(this.recDataTerminal[i].terminal_name) +"," + JSON.stringify(this.recDataTerminal[i].city);
      let s = "";
      for(let k=0; k<str.length; k++){
        if(str[k]!='"'){
          s = s + str[k];
        }
      }

      if(val != s){
        let element:any = {};
        element.terminal_name = this.recDataTerminal[i].terminal_name;
        element.city = this.recDataTerminal[i].city;
        this.dest.push(element);
      }
    }

  }
  
  onSubmit(data: any) {
    console.warn(data);
    this.getAppointmentData.ReceiverData(data).subscribe((result) => {
      console.warn(result)
    }
    )
    //this.modalService.dismissAll();
  }


  ngOnInit(): void {
    this.getgetAppointmentData.getterminal().subscribe((data: any) => {
      this.recDataTerminal = data
      console.log(this.recDataTerminal); 
    });
    
    this.getAppointmentData.getContainerDetails().subscribe((data: any) => {
      this.recContainerData = data;
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
          // console.log(data);
          
          this.recAppointmentData[numC] = { ...this.recAppointmentData[numC], "containerType": data[0].contype_type }
          numC++;
        });
        
      });
      // console.log(numS);
      
      // console.log(this.recAppointmentData);
    });

    // this.getAppointmentData.payment().subscribe((data) => {
    //   this.payment = data
    // });
    
  }

 

  // selected_terminal(val:any){
  //   let T_Id;
  //   for(let i=0; i<this.dest.length; i++){
  //     let str =JSON.stringify(this.recDataTerminal[i].terminal_id) +"," + JSON.stringify(this.getcontainer[i].terminal_id_origin);
  //     let s = "";
  //     for(let k=0; k<str.length; k++){
  //       if(str[k]!='"'){
  //         s = s + str[k];
  //       }
  //     }

  //     if(val == s){
  //       T_Id = this.dest[i].terminal_id;
  //     }
  //   }
  //   alert(T_Id);
  // }
}
