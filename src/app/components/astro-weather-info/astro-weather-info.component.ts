import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { AstroWeatherInfo } from 'src/app/models/astro-weather-info';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-astro-weather-info',
  templateUrl: './astro-weather-info.component.html',
  styleUrls: ['./astro-weather-info.component.css']
})
export class AstroWeatherInfoComponent implements OnInit {

  astroWeatherInfo: AstroWeatherInfo = new AstroWeatherInfo('', '', 0, 0, 0)
  constructor(private weatherServiceInfo: WeatherserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let location = this.route.snapshot.paramMap.get('location');
    if(location === null){
      location = "Bhubaneswar"
    }
    this.weatherServiceInfo.getWeatherInfo(location).subscribe((res) => {
      this.astroWeatherInfo.sunrise = res.forecast.forecastday[0].astro.sunrise,
        this.astroWeatherInfo.sunset = res.forecast.forecastday[0].astro.sunset,
        this.astroWeatherInfo.chanceOfRain = res.forecast.forecastday[0].day.daily_chance_of_rain,
        this.astroWeatherInfo.humidity = res.forecast.forecastday[0].day.avghumidity,
        this.astroWeatherInfo.windspeed = res.forecast.forecastday[0].day.maxwind_mph
    })
  }

}
