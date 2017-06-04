import { Injectable } from '@angular/core';
import {Http, Headers, Jsonp, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GetcurrencyService {

  constructor(private http:Http) { }

  getCurrency(country){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let count = JSON.stringify(country);
    
    return this.http.post('http://localhost:3000/getweather/value',count,{headers:headers}).map(res =>res.json()).toPromise();
  }

}
