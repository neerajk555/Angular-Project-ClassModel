import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-landing',
  templateUrl: './initial-landing.component.html',
  styleUrls: ['./initial-landing.component.css']
})
export class InitialLandingComponent implements OnInit {

  constructor() { }
  logo="../../assets/images/logos/logo.png";
  ngOnInit(): void {
  }

  show = false;
  ShowMenu(){
    if(this.show == false){
      this.show = true;
    }
    else{
      this.show = false;
    }
  }
}
