import { Component, OnInit } from '@angular/core';
import { WeatherForcast } from 'src/app/models/weather-forcast';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  weatherForcast = new WeatherForcast('', '', 0);
  weatherForCastInfo: WeatherForcast[] = [];
  currentTime: string = '';
  h: number = 0;
  locationName: string = '';
  constructor(private weatherService: WeatherserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let location = this.route.snapshot.paramMap.get('location');
    if (location === null) {
      this.weatherService.getallLocations().subscribe((data) => {
        if (data.length == 0) {
          this.locationName = "Bhubaneswar";
        }
        else {
          this.locationName = data[0].location;
        }
        this.weatherService.getWeatherInfo(location).subscribe((res) => {

          this.currentTime = res.location.localtime;
          const date1 = new Date(this.currentTime);
          const hour = date1.getHours();
          this.weatherForCastInfo.push(new WeatherForcast(res.location.localtime, res.current.condition.icon, res.current.temp_f));

          for (var i = 0; i < res.forecast.forecastday[0].hour.length; i = i + 1) {
            const date = new Date(res.forecast.forecastday[0].hour[i].time)
            if (date.getHours() + 1 === hour + 1) {
              this.h = i
              if (this.h + 12 > res.forecast.forecastday[0].hour.length) {
                const r = this.h + 12 - res.forecast.forecastday[0].hour.length;
                for (var k = this.h + 1; k < res.forecast.forecastday[0].hour.length; k++) {
                  const temp = new WeatherForcast(
                    res.forecast.forecastday[0].hour[k].time,
                    res.forecast.forecastday[0].hour[k].condition.icon,
                    res.forecast.forecastday[0].hour[k].temp_f,

                  )
                  this.weatherForCastInfo.push(temp);
                }
                for (var j = 0; j < r; j = j + 1) {
                  const temp = new WeatherForcast(
                    res.forecast.forecastday[0].hour[j].time,
                    res.forecast.forecastday[0].hour[j].condition.icon,
                    res.forecast.forecastday[0].hour[j].temp_f,
                  )
                  this.weatherForCastInfo.push(temp);
                }

              }
              else {
                for (var j = this.h + 1; j < this.h + 12; j = j + 1) {
                  const temp = new WeatherForcast(
                    res.forecast.forecastday[0].hour[j].time,
                    res.forecast.forecastday[0].hour[j].condition.icon,
                    res.forecast.forecastday[0].hour[j].temp_f,
                  )
                  this.weatherForCastInfo.push(temp);
                }
              }
              break;
            }
          }
        })
      })
    }
    else {
      this.weatherService.getWeatherInfo(location).subscribe((res) => {

        this.currentTime = res.location.localtime
        const date1 = new Date(this.currentTime)
        const hour = date1.getHours();
        this.weatherForCastInfo.push(new WeatherForcast(res.location.localtime, res.current.condition.icon, res.current.temp_f));

        for (var i = 0; i < res.forecast.forecastday[0].hour.length; i = i + 1) {
          const date = new Date(res.forecast.forecastday[0].hour[i].time)
          if (date.getHours() + 1 === hour + 1) {
            this.h = i
            if (this.h + 12 > res.forecast.forecastday[0].hour.length) {
              const r = this.h + 12 - res.forecast.forecastday[0].hour.length;
              for (var k = this.h + 1; k < res.forecast.forecastday[0].hour.length; k++) {
                const temp = new WeatherForcast(
                  res.forecast.forecastday[0].hour[k].time,
                  res.forecast.forecastday[0].hour[k].condition.icon,
                  res.forecast.forecastday[0].hour[k].temp_f,
                )
                this.weatherForCastInfo.push(temp)
              }
              for (var j = 0; j < r; j = j + 1) {
                const temp = new WeatherForcast(
                  res.forecast.forecastday[0].hour[j].time,
                  res.forecast.forecastday[0].hour[j].condition.icon,
                  res.forecast.forecastday[0].hour[j].temp_f,
                )
                this.weatherForCastInfo.push(temp)
              }

            }
            else {
              for (var j = this.h + 1; j < this.h + 12; j = j + 1) {
                const temp = new WeatherForcast(
                  res.forecast.forecastday[0].hour[j].time,
                  res.forecast.forecastday[0].hour[j].condition.icon,
                  res.forecast.forecastday[0].hour[j].temp_f,
                )
                this.weatherForCastInfo.push(temp)
              }
            }
            break;
          }
        }
      })
    }
  }
}
