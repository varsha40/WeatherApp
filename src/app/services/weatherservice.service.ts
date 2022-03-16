import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HeaderWeatherInfo } from '../models/header-weather-info';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherserviceService {
  
  constructor(private http : HttpClient) { }

  getWeatherInfo(value : any): Observable<any>{
    
      console.log(value);
      const url = "https://api.weatherapi.com/v1/forecast.json?key=483a04daff914ce58f991903220803&q=" + value + "&days=7&aqi=yes&alerts=no";
      console.log(url);
      return this.http.get(url);
     
  }
}
