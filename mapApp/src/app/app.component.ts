import { Component } from '@angular/core';
import { Market } from './Models/market.model';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  markets: Market[];
  results;

  constructor(private http: Http) {
    // this.http.get('assets/markets.json').subscribe(data => {this.results = data;});
    // var json = require('../assets/markets.json');
    // console.log(json);
  }
  //var json = Utilities.JSONLoader.loadFromFile("../docs/location_map.json");


}
