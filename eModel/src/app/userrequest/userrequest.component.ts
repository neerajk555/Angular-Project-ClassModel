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
  approvedCost: any;
  tempCost = 0;
  tempData: any
  tempId: any
  tempApproveIdStorage: any = []

  approveRequest(requestData: any, id: any) {
    this.tempData = requestData
    this.tempId = id
  }

  approveFromModal(approvedCost: any) {
    this.tempCost = parseFloat(approvedCost.value.requestCost)
    this.tempData.cost = this.tempCost
    this.tempData.appointment_status = "approved"
    this.getDataRequest.putappointmentdata(this.tempData, this.tempId).subscribe((data: any) => {
    });
    this.approvedCost.reset();
  }

  rejectRequest(requestData: any, id: any) {
    let dataTemp = requestData
    dataTemp.appointment_status = "rejected"
    dataTemp.cost = []
    this.getDataRequest.putappointmentdata(dataTemp, id).subscribe((data: any) => {
    });
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

  approveFromModalSelected(approvedCost: any) {
    this.tempCost = parseFloat(approvedCost.value.requestCost)
    for (let i = 0; i < this.recRequestData.length; i++) {
      if (this.tempApproveIdStorage.includes(this.recRequestData[i].id)) {
        this.tempData = this.recRequestData[i]
        this.tempData.cost = this.tempCost
        this.tempData.appointment_status = "approved"
        // console.log(this.tempData)
        this.getDataRequest.putappointmentdata(this.tempData, this.recRequestData[i].id).subscribe((data: any) => {
        });
      }
    }
    this.approvedCost.reset();
    this.tempApproveIdStorage = []
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

    this.approvedCost = this.fB.group({
      "requestCost": ["", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }
}
