import { Injectable } from '@angular/core';
import { WeatherTemperature } from '../models/weather-temperature';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  weather =  new WeatherTemperature(0,'',0,0,'');
  constructor() { }

  setData(data : WeatherTemperature){
    this.weather =  data;
  }
  getData(){
    return this.weather;
  }
}
