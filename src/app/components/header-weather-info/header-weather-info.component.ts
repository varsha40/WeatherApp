import { Component, OnInit } from '@angular/core';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { HeaderWeatherInfo } from 'src/app/models/header-weather-info';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header-weather-info',
  templateUrl: './header-weather-info.component.html',
  styleUrls: ['./header-weather-info.component.css']
})
export class HeaderWeatherInfoComponent implements OnInit {

  headerWeatherInfo = new HeaderWeatherInfo('', '', 0, 0, ' ');
  locationName: string = '';
  constructor(private weatherService: WeatherserviceService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let location = this.route.snapshot.paramMap.get('location');
    if (location === null) {
      this.weatherService.getallLocations().subscribe((data) => {
        if (data.length == 0) {
          this.locationName = "Bhubaneswar";
          console.log(this.locationName);
        }
        else {
          this.locationName = data[0].location;
        }
        this.weatherService.getWeatherInfo(this.locationName).subscribe(res => {
          this.headerWeatherInfo.locationName = res.location.name;
          this.headerWeatherInfo.currentWeatherstatus = res.current.condition.text;
          this.headerWeatherInfo.temperature = res.current.temp_c;
          this.headerWeatherInfo.tempfeelslike = res.current.feelslike_c;
          this.headerWeatherInfo.day = res.location.localtime;

        })
      })
    } else {
      this.weatherService.getWeatherInfo(location).subscribe(res => {
        this.headerWeatherInfo.locationName = res.location.name;
        this.headerWeatherInfo.currentWeatherstatus = res.current.condition.text;
        this.headerWeatherInfo.temperature = res.current.temp_c;
        this.headerWeatherInfo.tempfeelslike = res.current.feelslike_c;
        this.headerWeatherInfo.day = res.location.localtime;
      }
      )
    }
  }
}
