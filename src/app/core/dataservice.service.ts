import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TownOrCity } from './town-or-city';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

  getAllTownsAndCities(): Observable<TownOrCity> {
    return this.http.get<TownOrCity>('/api/towns',  {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    });
  }
}
