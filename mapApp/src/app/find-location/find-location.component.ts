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


@Component({
  selector: 'app-find-location',
  templateUrl: './find-location.component.html',
  styleUrls: ['./find-location.component.css']
})
export class FindLocationComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;
  public markets: Market[];

  searchInput: string;

  public inputAddress: string;
  public latitude: number;
  public longitude: number;
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
    this.latitude = 39.8282;
    this.longitude = -98.5795;

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
    this.getGeoLocation(this.inputAddress).subscribe(res => console.log("res: " + res));
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
            console.log("result: " + results[0].geometry.location);
            observer.complete();
          }
          else {
            console.log('Error: ', results, ' & Status: ', status);
            observer.error();
          }
        });
    })
  }

  onKeyupFromSearch(value: string) {
    this.inputAddress = value;
  }
}
