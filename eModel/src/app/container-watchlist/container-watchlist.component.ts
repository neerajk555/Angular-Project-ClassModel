import { Component, OnInit } from '@angular/core';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-container-watchlist',
  templateUrl: './container-watchlist.component.html',
  styleUrls: ['./container-watchlist.component.css']
})
export class ContainerWatchlistComponent implements OnInit {

  constructor(private wS: WatchlistService) { }

  watchlist:any;

  saveToWatchlist(data:any) {
    data = data.map((v: any) => ({...v, loadRow: false}));
    this.watchlist = data;
    console.log(this.watchlist);

  }

  ngOnInit(): void {
    this.wS.getContainerWatchlist().subscribe((data) => this.saveToWatchlist(data));
  }

  expand(index:any) {
    this.watchlist[index].loadRow = true;
  }

  collapse(index: any) {
    this.watchlist[index].loadRow = false;
  }
}
