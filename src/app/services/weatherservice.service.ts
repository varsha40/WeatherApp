import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeaderWeatherInfo } from '../models/header-weather-info';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
// import {Response} from`@angular/http`;
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getWeatherInfo(location: any): Observable<any> {

    const url = API_ENDPOINTS.GET_WEATHER_INFO_FOR_LOCATION(location);
    return this.http.get(url);

  }
  saveLocation(locationName: any): Observable<any> {

    const url = API_ENDPOINTS.SAVE_LOCATION(locationName);
    return this.http.post(url, null).pipe(
      catchError(this.handleError)
    );
  }

  getallLocations(): Observable<any> {
    const url = API_ENDPOINTS.GET_ALL_LOCATIONS;
    return this.http.get(url);
  }

  getLocationDetails(locationName: string): Observable<any> {
    const url = API_ENDPOINTS.GET_LOCATION_INFO(locationName);
    return this.http.get(url);
  }


  deleteLocation(locationName: string): Observable<any> {
    const url = API_ENDPOINTS.DELETE_LOCATION(locationName);
    return this.http.delete(url);
  }

  updateLocationOrder(source: number, destination: number): Observable<any> {
    let params = new HttpParams();
    params = params.append("source", source);
    params = params.append("destination", destination);
    const url = API_ENDPOINTS.UPDATE_LOCATION_ORDER;
    return this.http.put<any>(url, {}, { params: params });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
