import { Component } from '@angular/core';
import { Market } from './Models/market.model';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import './googleMap.js';

declare var webGlObject: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  markets: Market[];
  
  constructor(private http: Http){
    var json = this.http.get('assets/market.json');
    console.log(json);
  }
  //var json = Utilities.JSONLoader.loadFromFile("../docs/location_map.json");

  onClick(){
    webGlObject.init();
  }
}
