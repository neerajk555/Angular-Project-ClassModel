import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-userrequest',
  templateUrl: './userrequest.component.html',
  styleUrls: ['./userrequest.component.css']
})
export class UserrequestComponent implements OnInit {

  constructor(private getDataRequest: UserDataService) { }
  recRequestData: any;
  // item: any;
  ngOnInit(): void {
    this.getDataRequest.getappointmentdata().subscribe((data) => {
      this.recRequestData = data;
      // console.log(this.recRequestData);
      // let item: any;
      // for (item in this.recRequestData){
      //   console.log(item);
      // }
      let num = 0;

      this.recRequestData.forEach((element: any) => {

        // console.log(element);
        let id = element.delivery_terminal_id
        let stringData = `?terminal_id=${id}`
        this.getDataRequest.getterminalDataById(stringData).subscribe((data: any) => {

          this.recRequestData[num] = { ...this.recRequestData[0], "destination": data[0].city };
          // console.log(this.recRequestData[0]);
          // console.log(data[0].city);
          // console.log(num);
          num++
        });
      });
    });

  }

}
