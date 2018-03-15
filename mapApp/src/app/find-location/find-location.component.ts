import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
//import googlePlacesService from 'google-places-autocomplete-service';
import { } from '@types/googlemaps';
//import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
//import { AgmCoreModule } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Market } from '../Models/market.model';
import { MARKETS } from '../Models/mock.markets';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-find-location',
  templateUrl: './find-location.component.html',
  styleUrls: ['./find-location.component.css']
})
export class FindLocationComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public markets: Market[];
  // public sortedMarkets: [{
  //   "networkName": string,
  //   "branchName": string,
  //   "distance": number
  // }];
  sortedMarkets = [];

  // user input address
  searchInput: string;

  public inputAddress: string;
  public latitude: number;
  public longitude: number;

  // for user selected place
  selectedLatitude: string;
  selectedLongitude: string;

  public searchControl: FormControl;
  public zoom: number;

  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    // let jsonData = require('../../assets/markets.json');
    //mock data
    this.markets = MARKETS;
    console.log(this.markets);

  }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 35.8282;
    this.longitude = 34.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  // bring coordinates for my position
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        console.log("from navigator lat " + this.latitude + " " + this.longitude);
      });
    }
  }

  submitAddress() {
    console.log("inputAddress " + this.inputAddress);
    this.getGeoLocation(this.inputAddress)
      .subscribe(res => {
        this.selectedLatitude = res.lat();
        this.selectedLongitude = res.lng();
        console.log("lat,long " + this.selectedLatitude + " " + " " + this.selectedLongitude);
        var calculateDistanceArray = this.calculateDistance();
        //  console.log("calculateDistanceArray " + calculateDistanceArray);
        this.sortedMarkets = calculateDistanceArray.sort(function (a, b) {
          return a.distance - b.distance;
          //  console.log("sorted Array " + this.sortedMarkets);
        });
      });
    // calculate km range between desired place to each superMarket
    // debugger;
  }

  // using this method to get the latitude & longitude 
  // from google api by sending the address
  getGeoLocation(address: string): Observable<any> {
    let geocoder = new google.maps.Geocoder();
    return new Observable((observer) => {
      geocoder.geocode(
        {
          'address': address
        }, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            observer.next(results[0].geometry.location);
            console.log("result:  " + results[0].geometry.location);
            observer.complete();
          }
          else {
            console.log('Error: ', results, ' & Status: ', status);
            observer.error();
          }
        });
    })
  }

  calculateDistance() {
    var calculateArray = [];
    for (let i = 0; i < this.markets.length; i++) {
      for (let j = 0; j < this.markets[i].branches.length; j++) {
        let tempSuper = this.markets[i].branches[j];
        let element = {
          "networkName": this.markets[i].networkName,
          "branchName": this.markets[i].branches[j].name,
          "distance": this.getDistance(tempSuper.latitude, tempSuper.longitude,
            this.selectedLatitude, this.selectedLongitude)
        };
        calculateArray.push(element);
      }
    }


    return calculateArray;
  }

  onKeyupFromSearch(value: string) {
    this.inputAddress = value;
  }


  getDistance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
      c(lat1 * p) * c(lat2 * p) *
      (1 - c((lon2 - lon1) * p)) / 2;

    return Math.round(12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
  }
}
