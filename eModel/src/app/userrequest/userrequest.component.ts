import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { regExpEscape, toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-userrequest',
  templateUrl: './userrequest.component.html',
  styleUrls: ['./userrequest.component.css']
})
export class UserrequestComponent implements OnInit {

  constructor(private getDataRequest: UserDataService, private fB: FormBuilder) { }
  recRequestData: any;
  approvedDetails: any;
  rejectDetails: any;
  tempCost = 0;
  tempData: any
  tempDataReject: any
  tempId: any
  tempDate: any
  tempApproveIdStorage: any = []

  approveRequest(requestData: any, id: any) {
    this.tempData = requestData
    this.tempId = id
  }

  approveFromModal(approvedDetails: any) {
    this.tempCost = parseFloat(approvedDetails.value.requestCost)
    this.tempData.cost = this.tempCost
    this.tempData.appointment_status = "approved"
    this.tempData.terminal_remarks = ""
    this.tempData.deliveryDate = approvedDetails.value.deliveryDate
    this.getDataRequest.putappointmentdata(this.tempData, this.tempId).subscribe((data: any) => {
    });
    this.approvedDetails.reset();
  }

  rejectRequest(requestData: any, id: any) {
    this.tempDataReject = requestData
    this.tempId = id
  }

  onChangeCheckbox($event: any) {
    // for (let i = 0; i < this.recRequestData.length; i++) {
    //   this.recRequestData[i].selected = !this.recRequestData[i].selected
    //   this.recRequestData[i].selectedAll = !this.recRequestData[i].selectedAll
    // }

    // for (let i = 0; i < this.recRequestData.length; i++) {
    //   if (this.recRequestData[i].id == parseInt($event.target.value)) {
    //     this.recRequestData[i].selected = !$event.target.checked
    //   }
    // }

    const id = $event.target.value;
    const isChecked = $event.target.checked;
    if (isChecked) {
      this.tempApproveIdStorage.push(parseInt(id))
    } else {
      this.tempApproveIdStorage.pop(parseInt(id))
    }
    // console.log(this.tempApproveIdStorage);
  }

  approveFromModalSelected(approvedDetails: any) {
    this.tempCost = parseFloat(approvedDetails.value.requestCost)
    this.tempDate = approvedDetails.value.deliveryDate
    for (let i = 0; i < this.recRequestData.length; i++) {
      if (this.tempApproveIdStorage.includes(this.recRequestData[i].id)) {
        this.tempData = this.recRequestData[i]
        this.tempData.cost = this.tempCost
        this.tempData.appointment_status = "approved"
        this.tempData.deliveryDate = this.tempDate
        this.tempData.terminal_remarks = ""
        // console.log(this.tempData)
        this.getDataRequest.putappointmentdata(this.tempData, this.recRequestData[i].id).subscribe((data: any) => {
        });
      }
    }
    this.approvedDetails.reset();
    this.tempApproveIdStorage = []
  }
  
  rejectRemarksFromModal(rejectDetails: any) {
    this.tempDataReject.appointment_status = "rejected"
    this.tempDataReject.cost = []
    this.tempDataReject.terminal_remarks = rejectDetails.value.terminalRemarks
    this.getDataRequest.putappointmentdata(this.tempDataReject, this.tempId).subscribe((data: any) => {
    });
    this.rejectDetails.reset();

  }
  
  selectAll() {
    if (this.recRequestData[0].selectedAll == false) {
      for (let i = 0; i < this.recRequestData.length; i++) {
        this.tempApproveIdStorage.push(this.recRequestData[i].id)
        this.recRequestData[i].selected = true
        this.recRequestData[i].selectedAll = true
      }
    } else if (this.recRequestData[0].selectedAll == true) {
      this.tempApproveIdStorage = []
      for (let i = 0; i < this.recRequestData.length; i++) {
        this.recRequestData[i].selected = false
        this.recRequestData[i].selectedAll = false
      }
    }
    console.log(this.tempApproveIdStorage);

  }

  ngOnInit(): void {
    this.getDataRequest.getappointmentdata().subscribe((data) => {
      this.recRequestData = data;
      let num = 0;
      for (let i = 0; i < this.recRequestData.length; i++) {
        this.recRequestData[i] = { ...this.recRequestData[i], "selected": false, "selectedAll": false }
      }
      // console.log(this.recRequestData);
      this.recRequestData.forEach((element: any) => {
        let id = element.delivery_terminal_id
        let stringData = `?terminal_id=${id}`
        this.getDataRequest.getterminalDataById(stringData).subscribe((data: any) => {
          this.recRequestData[num] = { ...this.recRequestData[num], "destination": data[0].city };
          num++
        });
      });
    });

    this.approvedDetails = this.fB.group({
      "requestCost": ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      "deliveryDate": ["", [Validators.required]]
    });

    this.rejectDetails = this.fB.group({
      "terminalRemarks": ["", [Validators.required]]
    });
  }
}
