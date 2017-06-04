import { Injectable } from '@angular/core';
import {Http, Headers, Jsonp, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetcountryService {

  constructor(private http:Http) { }

  getCountry(coords){
    var lat=coords.lat;
    var long=coords.long;
    return this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=false').map(res =>res.json()).toPromise();
  }

}