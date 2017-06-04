import { Component,ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import {} from '@types/googlemaps';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { GetweatherService } from './services/getweather.service';
import { GetcountryService } from './services/getcountry.service';
import { GetcurrencyService } from './services/getcurrency.service';

declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GetcountryService,GetcurrencyService]
})

export class AppComponent implements OnInit{
  
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public data: any;
  public icon: any;
  public name: any;
  public add: any;
  public lat: any;
  public long:any;
  public currency:any;
  public edited :boolean= false;
  public visible :boolean= false;
  input_lat:string;
  input_long:string;

  @ViewChild("map")
  public mapElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private getweatherService: GetweatherService,
    private getcountryService: GetcountryService,
    private getcurrencyService: GetcurrencyService
  ) {}     

  ngOnInit() { 
    this.zoom = 7;
    this.latitude = 6.927078600000002;
    this.longitude = 79.86124300000006;
    
    this.searchControl = new FormControl();

    this.setCurrentPosition();

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 10;
      });
    }
  }

  private getResult(){

    console.log(parseFloat(this.input_lat));
    console.log(parseFloat(this.input_long));
    
    this.mapsAPILoader.load().then(() => {    
      this.edited = true;    

      this.ngZone.run(() => {               
        this.latitude = parseFloat(this.input_lat);
        this.longitude = parseFloat(this.input_long);
        this.zoom = 15;        

        var coords = {
          'lat' : parseFloat(this.input_lat),
          'long': parseFloat(this.input_long)
        };  

        var country;

        this.getcountryService.getCountry(coords).then(data=>{
          this.data=data;
          console.log(data);
          let count=data.results[0].address_components.length;

          for(var i=0;i<count;i++){
            if(data.results[0].address_components[i].types[0]=='country'){
              country={'country':data.results[0].address_components[i].long_name};
            }
          }

         // this.icon= place.icon;
        this.name= "Country: " + country.country;
        this.lat= "Latitude: " + this.input_lat;
        this.long="Longitude: " + this.input_long;
          

          this.getcurrencyService.getCurrency(country).then(data=>{
          this.data=data;
          console.log(data);
          this.visible=true;
          this.currency=data.currency;
          });
          });        
                     
        });
    });
  }
}
