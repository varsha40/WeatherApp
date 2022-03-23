import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderWeatherInfoComponent } from './components/header-weather-info/header-weather-info.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocaltimetodayPipe } from './pipes/localtimetoday.pipe';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { ExtracttimePipe } from './pipes/extracttime.pipe';
import { UpcomingDaysForecastComponent } from './components/upcoming-days-forecast/upcoming-days-forecast.component';
import { AstroWeatherInfoComponent } from './components/astro-weather-info/astro-weather-info.component';
import { ExtraWeatherInfoComponent } from './components/extra-weather-info/extra-weather-info.component';
import { AmPmFormatPipe } from './pipes/am-pm-format.pipe';
import { HomeComponent } from './components/home/home.component';
import { DefaultComponent } from './components/default/default.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LocationModalComponent } from './components/location-modal/location-modal.component';
import { WeatherserviceService } from './services/weatherservice.service';
import { AlertifyService } from './services/alertify.service';
import { HttpErrorInterceptorService } from './services/httperror-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderWeatherInfoComponent,
    LocaltimetodayPipe,
    WeatherForecastComponent,
    ExtracttimePipe,
    UpcomingDaysForecastComponent,
    AstroWeatherInfoComponent,
    ExtraWeatherInfoComponent,
    AmPmFormatPipe,
    HomeComponent,
    DefaultComponent,
    PageNotFoundComponent,
    LocationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ {
    provide : HTTP_INTERCEPTORS,
    useClass : HttpErrorInterceptorService,
    multi : true

  },
   WeatherserviceService, AlertifyService, HttpErrorInterceptorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
