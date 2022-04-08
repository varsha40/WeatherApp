import { Component, OnInit } from '@angular/core';
import { WeatherTemperature } from 'src/app/models/weather-temperature';

import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  count: number = 0
  status: boolean = false;
  weatherTemperature: WeatherTemperature[] = [];

  constructor(private weatherService: WeatherserviceService) {
  }
  ngOnInit(): void {
  }

  checkCheckBoxvalue(event: any) {
    this.status = event.target.checked
  }
}
