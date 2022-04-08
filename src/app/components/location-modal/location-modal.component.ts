import { Component, OnInit, Input} from '@angular/core';
import { WeatherTemperature } from 'src/app/models/weather-temperature';
import { WeatherserviceService } from 'src/app/services/weatherservice.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import { Location } from 'src/app/models/location';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent implements OnInit {
  @Input() status: boolean = false;
  error: string = '';
  weatherTemperature: WeatherTemperature[] = [];
  locations: Location[] = [];
  closeResult: string = '';
  count: number = 0;
  location: number = 0;
  weather = new WeatherTemperature(0, '', 0, 0, '', '');
  c: number = 0;
  names: string[] = [];

  constructor(private weatherService: WeatherserviceService, private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private alertyfy: AlertifyService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
  }
  open(content: any) {
    this.locations = [];
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.weatherTemperature = [];
    this.weatherService.getallLocations().pipe(
      switchMap((res: any) => {
        for (var i = 0; i < res.length; i += 1) {
          this.locations.push(new Location(res[i].locationId, res[i].location, res[i].locationOrder))
        }
        return from(this.locations);
      }),
      concatMap((data) => this.weatherService.getLocationDetails(data.locationName))
    ).subscribe((info) => this.weatherTemperature.push(new WeatherTemperature(info.location.locationId, info.location.location, info.minTemp, info.maxTemp, info.text, info.icon)));
  }
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

      const temp = new WeatherTemperature(res.location.locationId, res.location.location, res.minTemp, res.maxTemp, res.text, res.icon);
      this.weatherTemperature.push(temp);
      this.alertyfy.success("Location Saved Successfully");
    }
    );
  }
  viewInfo(temp: any) {
    this.router.navigate(['/weather/' + temp.locationName]);
  }

  deleteLocation(temp: any) {

    this.location = this.weatherTemperature.findIndex(x => x.locationId == temp.locationId)
    this.weatherTemperature.splice(this.location, 1);
    this.weatherService.deleteLocation(temp.locationName).subscribe((res) => {
    }, (error: any) => {
      this.error = error.error;
      console.log(this.error);
    });
  }

  refresh() {

    let location = this.route.snapshot.paramMap.get('location');
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
        if (this.location == 0) {

          this.router.navigate(['/weather/' + this.weatherTemperature[this.location].locationName])
        } else {
          this.router.navigate(['/weather/' + this.weatherTemperature[this.location - 1].locationName])
        }
      }
    } else if (this.weatherTemperature.length > 0 && location == null) {
      
      this.router.navigate(['/weather/' + this.weatherTemperature[0].locationName])
    }
    else {
      this.router.navigate(['']);
    }
  }
  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.weatherTemperature, event.previousIndex, event.currentIndex);
    this.weatherService.updateLocationOrder(event.previousIndex, event.currentIndex).subscribe((res) =>
      console.log(res));
  }
}
