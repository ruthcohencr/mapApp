import { Component, OnInit, Input } from '@angular/core';
import { Market } from '../../Models/market.model';

@Component({
  selector: 'app-list-branches',
  templateUrl: './list-branches.component.html',
  styleUrls: ['./list-branches.component.css']
})
export class ListBranchesComponent implements OnInit {

  @Input() markets: Market[];
  @Input() sortedMarkets;

  constructor() { }

  ngOnInit() {
  }

}
