import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { AstroWeatherInfo } from 'src/app/models/astro-weather-info';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-astro-weather-info',
  templateUrl: './astro-weather-info.component.html',
  styleUrls: ['./astro-weather-info.component.css']
})
export class AstroWeatherInfoComponent implements OnInit {

  astroWeatherInfo: AstroWeatherInfo = new AstroWeatherInfo('', '', 0, 0, 0)
  locationName : string = '' ;
  constructor(private weatherServiceInfo: WeatherserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let location = this.route.snapshot.paramMap.get('location');
    if(location === null){
      this.weatherServiceInfo.getallLocations().subscribe((data) =>{
        console.log(data);
        if(data.length == 0){
          this.locationName = "Bhubaneswar"
        }
        else{
          this.locationName = data[0].location
          console.log(this.locationName);
        }
        this.weatherServiceInfo.getWeatherInfo(this.locationName).subscribe((res) => {
          this.astroWeatherInfo.sunrise = res.forecast.forecastday[0].astro.sunrise,
            this.astroWeatherInfo.sunset = res.forecast.forecastday[0].astro.sunset,
            this.astroWeatherInfo.chanceOfRain = res.forecast.forecastday[0].day.daily_chance_of_rain,
            this.astroWeatherInfo.humidity = res.current.humidity
            this.astroWeatherInfo.windspeed = res.current.wind_mph
        })
      })
    }
    else{
      this.weatherServiceInfo.getWeatherInfo(location).subscribe((res) => {
        this.astroWeatherInfo.sunrise = res.forecast.forecastday[0].astro.sunrise,
          this.astroWeatherInfo.sunset = res.forecast.forecastday[0].astro.sunset,
          this.astroWeatherInfo.chanceOfRain = res.forecast.forecastday[0].day.daily_chance_of_rain,
          this.astroWeatherInfo.humidity = res.current.humidity
          this.astroWeatherInfo.windspeed = res.current.wind_mph
      })
    }
    

    // let location = this.locationName;
    // console.log(this.locationName);
    // let location = this.route.snapshot.paramMap.get('location');
    // if(location === null){
    //   location = "Bhubaneswar"
    // }
 
  }

}
