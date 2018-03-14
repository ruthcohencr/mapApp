import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { AgmCoreModule } from '@agm/core';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { FindLocationComponent } from './find-location/find-location.component';
import { ListBranchesComponent } from './find-location/list-branches/list-branches.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    FindLocationComponent,
    ListBranchesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    // Ng4GeoautocompleteModule.forRoot()
     AgmCoreModule.forRoot({
       apiKey: 'AIzaSyBGgMDRxgCIeCZQ1SrzwjlCqzj_FHQY35I',
       libraries: ["places"]
     })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
