import { WatchlistService } from '../watchlist.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


import { HttpClient } from '@angular/common/http';
import { UserDataService } from '../user-data.service';

declare var jsPDF: any;
@Component({
  selector: 'app-container-watchlist',
  templateUrl: './container-watchlist.component.html',
  styleUrls: ['./container-watchlist.component.css']
})
export class ContainerWatchlistComponent implements OnInit {
  public isCollapsed = false;
  closeResult = '';

  constructor(private wS: WatchlistService, private modalService: NgbModal, private http: HttpClient, private uS: UserDataService) { }


  watchlist: any;
  containerIds = "";

  saveToWatchlist(data: any) {
    data = data.map((v: any) => ({ ...v, loadRow: false, isChecked: false }));
    this.watchlist = data;
    console.log(this.watchlist);

  }
  changeState(i: any) {
    this.watchlist[i].isChacked = !this.watchlist[i].isChacked;
  }
  deletwSelectedRows() {
    for (var i in this.watchlist) {
      if (this.watchlist[i].isChacked) {
        this.wS.delete(this.watchlist[i].id).subscribe();
        this.watchlist.splice(i, 1);
      }
    }
  }

  updateUser(data: any) {
    this.uS.user = data;
  }

  ngOnInit(): void {
    this.wS.getContainerWatchlist().subscribe((data) => this.saveToWatchlist(data));
    this.uS.getUserDataById(this.uS.loginid).subscribe((data) => this.updateUser(data));
  }

  expand(index: any) {
    this.watchlist[index].loadRow = true;
  }

  collapse(index: any) {
    this.watchlist[index].loadRow = false;
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  value: any;

  updateWatchList(data: any, conid: any) {
    if (data != []) {
      this.watchlist.push(data[0]);
      console.log(data);
    }
  }

  isPresent(item: any, data: any) {
    for (let i = 0; i < data.length; i++) {
      if (data[i] == item) {
        return true;
      }
    }
    return false;
  }
  addContainer(conid: any) {
    //console.log(this.containerIds);
    if (conid != '') {
      // console.log(conid);
      // console.log(this.uS.user.user_watchlist_ids);
      if (!this.isPresent(conid, this.uS.user.user_watchlist_ids)) {
        this.uS.user.user_watchlist_ids.push(conid);
        this.uS.putUserData(this.uS.user, this.uS.user.id).subscribe((data) => console.log(data));
        this.wS.getContainerById(conid).subscribe((data) => this.updateWatchList(data, conid));
      }


    }
    this.modalService.dismissAll();
    // this.wS.getConid(conid).subscribe((saveToWatchlist) => {this.value=saveToWatchlist})
    // console.log(this.value);

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // download() {
  //   var element = document.getElementById('contentToConvert');
  //   html2canvas(element).then((canvas) => {
  //     console.log(canvas)
  //     var imgData =canvas.toDataURL('image/png')
  //     var doc = new jsPDF()
  //     var imgHeight =canvas.height * 208 /canvas .width;
  //     doc.addImage(imgData,0,0,208,imgHeight)
  //     doc.save("image.pdf")

  //   });

}
//   recData: any

//   "container_watch_list" = {
//     "contype_id": "",
//     "contype_type": "",
//     "contype_height": "",
//     "contype_width": "",
//     "contype_code": ""
//   }

// //   ngOnInit(): void {


// this.wl.get().subscribe((data) => {
// //       this.recData = data;

// //     });
// //   }

// }

