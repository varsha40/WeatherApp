import { Component, OnInit } from '@angular/core';
import { ExtraWeatherInfo } from 'src/app/models/extra-weather-info';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-extra-weather-info',
  templateUrl: './extra-weather-info.component.html',
  styleUrls: ['./extra-weather-info.component.css']
})
export class ExtraWeatherInfoComponent implements OnInit {

  extraWeatherInfo: ExtraWeatherInfo = new ExtraWeatherInfo(0, 0, 0, 0, 0)
  constructor(private weathersService: WeatherserviceService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    let location = this.route.snapshot.paramMap.get('location');
    if(location === null){
      location = "Bhubaneswar"
    }
    this.weathersService.getWeatherInfo(location).subscribe((res) => {
        this.extraWeatherInfo.airQuality = res.current.air_quality.pm2_5,
        this.extraWeatherInfo.uv = res.forecast.forecastday[0].day.uv,
        this.extraWeatherInfo.temp = res.current.temp_f
        this.extraWeatherInfo.precipitation = res.current.precip_in,
        this.extraWeatherInfo.willItSnow = res.forecast.forecastday[0].day.daily_will_it_snow

    })
  }

}
