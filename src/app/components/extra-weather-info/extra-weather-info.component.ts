import { Component, OnInit } from '@angular/core';
import { ExtraWeatherInfo } from 'src/app/models/extra-weather-info';
import { ActivatedRoute } from '@angular/router';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';


@Component({
  selector: 'app-extra-weather-info',
  templateUrl: './extra-weather-info.component.html',
  styleUrls: ['./extra-weather-info.component.css']
})
export class ExtraWeatherInfoComponent implements OnInit {

  extraWeatherInfo = new ExtraWeatherInfo(0,0,0,0,0);

  locationName : string = '';
  constructor(private weatherService: WeatherserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let location = this.route.snapshot.paramMap.get('location');
    if(location === null){
      this.weatherService.getallLocations().subscribe((data) =>{
        console.log(data);
        if(data.length == 0){
          this.locationName = "Bhubaneswar"
        }
        else{
          this.locationName = data[0].location
          console.log(this.locationName);
        }
      this.weatherService.getWeatherInfo(this.locationName).subscribe((res) => {
          this.extraWeatherInfo.airQuality = res.current.air_quality.pm2_5,
          this.extraWeatherInfo.uv = res.forecast.forecastday[0].day.uv,
          this.extraWeatherInfo.temp = res.current.temp_f
          this.extraWeatherInfo.precipitation = res.current.precip_in,
          this.extraWeatherInfo.willItSnow = res.forecast.forecastday[0].day.daily_will_it_snow
      })
  
      })
    }
    else{
      this.weatherService.getWeatherInfo(location).subscribe((res) => {
        this.extraWeatherInfo.airQuality = res.current.air_quality.pm2_5,
        this.extraWeatherInfo.uv = res.forecast.forecastday[0].day.uv,
        this.extraWeatherInfo.temp = res.current.temp_f
        this.extraWeatherInfo.precipitation = res.current.precip_in,
        this.extraWeatherInfo.willItSnow = res.forecast.forecastday[0].day.daily_will_it_snow
    })
    }
    
  }



}
