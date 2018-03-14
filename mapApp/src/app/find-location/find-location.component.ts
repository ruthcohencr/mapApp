import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import googlePlacesService from 'google-places-autocomplete-service';
import {} from '@types/googlemaps';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

import { AgmCoreModule } from '@agm/core';

import '../../app/googleMap.js';

declare var myExtObject: any;
declare var googleMaps: any;

@Component({
  selector: 'app-find-location',
  templateUrl: './find-location.component.html',
  styleUrls: ['./find-location.component.css']
})
export class FindLocationComponent implements OnInit {

  @ViewChild('search') public searchElement : ElementRef;
  searchInput : string;
  google: any;

  autoCompleteCallback1(){
    this.activateSearch();
  }
  constructor() { 
  }

  ngOnInit() {
  }


  onClick(){
  //  googleMaps.test();
    myExtObject.func1();
    
  }
  activateSearch(){
   // var searchInput = document.getElementById('search');
    console.log(this.searchInput);
    //var autoComplete = new this.google.maps.places.Autocomplete(this.searchInput);
   // this.googlePlaces = googlePlacesService(this.searchInput);
  }
}
//