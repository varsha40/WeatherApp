import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HeaderWeatherInfo } from 'src/app/models/header-weather-info';
import { WeatherTemperature } from 'src/app/models/weather-temperature';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { count, from, map } from 'rxjs';
import { Location } from 'src/app/models/location';
import { templateJitUrl, ThrowStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements OnInit {

  error: string = '';
  weatherTemperature: WeatherTemperature[] = [];
  locations: Location[] = [];
  closeResult: string = '';
  count: number = 0;
  location : number = 0;
  weather = new WeatherTemperature(0,'',0,0,'');
  constructor(private weatherService: WeatherserviceService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute,private alertyfy: AlertifyService) { }

  ngOnInit(): void {
  }
  // view(location : any){

  //   this.weatherService.getLocationDetails(location.locationName).subscribe((res) =>{

  //     this.weather =  res;
  //   })
  //   return this.weather;
  // }
  open(content: any) {
    this.locations=[];
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    // this.weatherService.getallLocations().subscribe((res) => {

    //   console.log(res);
    //   const t = from(res);
    //   console.log(t);
    //   t.pipe(
    //     map((data) => this.view(data))
    //   ).subscribe((data) =>{
    //     console.log(data);
    //   })
    //   for(var i = 0; i < res.length; i += 1) {

    //     const temp = new Location(res[i].locationId, res[i].location);
    //     console.log(res[i].location);
    //     this.locations.push(temp);
    //   }
    // }
    // ); 

    // this.weatherService.getallLocations().subscribe((res) =>{
    //   for(var i = 0 ; i < res.length; i+=1){

    //     this.locations.push(new Location(res[i].locationId, res[i].locationName))
    //   }
    // })
    // console.log(this.locations);
    // for(var i = 0; i < this.locations.length; i+=1){

    //   this.weatherService.getLocationDetails(this.locations[i].locationName).subscribe((res) =>{

    //     const temp =  new WeatherTemperature(res.location.locationId, res.location.location,res.minTemp, res.maxTemp, res.icon);
    //     this.weatherTemperature.push(temp);
    //   }
    //   )
    //   console.log(this.weatherTemperature)
    // }
    // console.log(this.weatherTemperature);
    this.weatherTemperature = [];
    this.weatherService.getallLocations().subscribe((res) => {
      console.log(res);
      for (var i = 0; i < res.length; i += 1) {

        const temp = new Location(res[i].locationId, res[i].location);
        this.weatherService.getLocationDetails(res[i].location)?.subscribe((info) => {

          const temp = new WeatherTemperature(info.location.locationId, info.location.location, info.minTemp, info.maxTemp, info.icon);
          this.weatherTemperature.push(temp);
        })
      }
    })
    console.log(this.weatherTemperature);
  }
  // view(locations : Location[]){

  //   for(var i = 0; i < locations.length; i+=1){

  //     this.weatherService.getLocationDetails(locations[i].locationName).subscribe((res) =>{

  //       console.log("hello");
  //       const temp =  new WeatherTemperature(res.location.locationId, res.location.location,res.minTemp, res.maxTemp, res.icon);
  //       this.weatherTemperature.push(temp);
  //     }
  //     )
  //   }
  // }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  saveLocation(location: string) {
    this.weatherService.saveLocation(location).subscribe((res) => {

      const temp = new WeatherTemperature(res.location.locationId, res.location.location, res.minTemp, res.maxTemp, res.icon);
      this.weatherTemperature.push(temp);
      this.alertyfy.success("Location Saved Successfully");
    }
    );
  }
  viewInfo(temp: any) {
    this.router.navigate(['/weather/' + temp.locationName]).then(() => {
      window.location.reload();
    });
  }

  deleteLocation(temp: any) {

    this.location = this.weatherTemperature.findIndex(x => x.locationId == temp.locationId)
    this.weatherTemperature.splice(this.location, 1);
    console.log(this.location);
    console.log(temp.locationId);
    this.weatherService.deleteLocation(temp.locationId).subscribe((res) => {
    }, (error: any) => {
      this.error = error.error;
      console.log(this.error);
    });
  }

  refresh() {

    let location = this.route.snapshot.paramMap.get('location')
    console.log(location)
    console.log(this.location);
    if (this.weatherTemperature.length > 0 && location != null) {

      for (var i = 0; i < this.weatherTemperature.length; i += 1) {
        if (location === this.weatherTemperature[i].locationName) {
          this.count = this.count + 1
        }
      }
      if (this.count > 0) {
        window.location.reload();
      }
      else {
        console.log(this.weatherTemperature);
        if (this.location == 0) {

          this.router.navigate(['/weather/' + this.weatherTemperature[this.location].locationName]).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['/weather/' + this.weatherTemperature[this.location - 1].locationName]).then(() => {
            window.location.reload();
          });
        }
      }
    } else if(this.weatherTemperature.length > 0 && location == null) {
      this.router.navigate(['/weather/' + this.weatherTemperature[0].locationName]).then(() => {
        window.location.reload();
    })}else{
        this.router.navigate(['']);
    }
  }
}
