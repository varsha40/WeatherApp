import { Component, OnInit } from '@angular/core';
import { UpcomingDaysForecast } from 'src/app/models/upcoming-days-forecast';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upcoming-days-forecast',
  templateUrl: './upcoming-days-forecast.component.html',
  styleUrls: ['./upcoming-days-forecast.component.css']
})
export class UpcomingDaysForecastComponent implements OnInit {

  upcomingDaysForecastInfo: UpcomingDaysForecast[] = [];
  locationName : string = '';
  constructor(private weatherService: WeatherserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let location = this.route.snapshot.paramMap.get('location');
    if(location === null){
      this.weatherService.getallLocations().subscribe((data) =>{
        if(data.length == 0){
          this.locationName = "Bhubaneswar"
          console.log(this.locationName);
        }
        else{
          this.locationName = data[0].location
          console.log(this.locationName);
        }
      this.weatherService.getWeatherInfo(this.locationName).subscribe((res) => {
        for (var i = 0; i < res.forecast.forecastday.length; i += 1) {
  
          const temp = new UpcomingDaysForecast(
            res.forecast.forecastday[i].date,
            res.forecast.forecastday[i].day.condition.icon,
            res.forecast.forecastday[i].day.maxtemp_f,
            res.forecast.forecastday[i].day.mintemp_f,
          )
  
          this.upcomingDaysForecastInfo.push(temp)
        }
      })
    })
    }
    else{
      this.weatherService.getWeatherInfo(location).subscribe((res) => {
        for (var i = 0; i < res.forecast.forecastday.length; i += 1) {
  
          const temp = new UpcomingDaysForecast(
            res.forecast.forecastday[i].date,
            res.forecast.forecastday[i].day.condition.icon,
            res.forecast.forecastday[i].day.maxtemp_f,
            res.forecast.forecastday[i].day.mintemp_f,
          )
  
          this.upcomingDaysForecastInfo.push(temp)
        }
      })
    }
    
}
}
