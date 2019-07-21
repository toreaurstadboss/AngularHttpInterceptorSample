import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TownOrCity } from './town-or-city';
import { HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient) { }

  getAllTownsAndCities(): Observable<TownOrCity[]> {
    let bulkData: TownOrCity[];
    this.http.get<TownOrCity>('/api/towns',  {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    })
    .subscribe((data: any) => {
      bulkData = data;
    }, (error: any) => {
      console.warn(error);
    });
    return of(bulkData);
  }
}
