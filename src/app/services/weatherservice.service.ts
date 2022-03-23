import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HeaderWeatherInfo } from '../models/header-weather-info';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ENDPOINTS } from '../constants/api-endpoints.constant';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {
  
  private userUrl :  String;
  constructor(private http : HttpClient) { 
    this.userUrl = "http://localhost:8082/weatherInfo"
  }

  getWeatherInfo(location : any): Observable<any>{
  
      // const url = "https://api.weatherapi.com/v1/forecast.json?key=483a04daff914ce58f991903220803&q=" + value + "&days=7&aqi=yes&alerts=no";
      const url = API_ENDPOINTS.GET_WEATHER_INFO_FOR_LOCATION(location);
      console.log(url);
      return this.http.get(url);
     
  }
  saveLocation(locationName : any):Observable<any>{

    const url = API_ENDPOINTS.SAVE_LOCATION(locationName);
    return this.http.post(url, null).pipe(
      catchError(this.handleError)
    );
  }

  getallLocations():Observable<any>{
    return this.http.get("http://localhost:8083/location/all");
  }

  getLocationDetails(locationName : string):Observable<any>{ 
    const url = API_ENDPOINTS.GET_LOCATION_INFO(locationName);
    return this.http.get(url);
  }

  deleteLocation(locationId : number) : Observable<any>{
    const url = API_ENDPOINTS.DELETE_LOCATION(locationId);
    console.log(url);
    return this.http.delete(url);
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
