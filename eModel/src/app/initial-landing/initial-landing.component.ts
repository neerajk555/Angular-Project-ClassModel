import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlurrBgService } from '../blurr-bg.service';

@Component({
  selector: 'app-initial-landing',
  templateUrl: './initial-landing.component.html',
  styleUrls: ['./initial-landing.component.css']
})
export class InitialLandingComponent implements OnInit {

  logo="../../assets/images/logos/logo.png";
  constructor(config: NgbModalConfig, private modalService: NgbModal, public bs:BlurrBgService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content:any) {
    this.modalService.open(content);
  }
  
  ngOnInit(): void {
  }
  show = false;
  ShowMenu(){
    if(this.show == false){
      this.show = true;
      this.bs.show = true;
    }
    else{
      this.show = false;
      this.bs.show = false;
    }
  }
}
