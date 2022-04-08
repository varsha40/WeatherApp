import { Injectable } from '@angular/core';
import * as alertyfy from 'alertifyjs'

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  error(message: string) {
    alertyfy.error(message);
  }
  success(message: string) {
    alertyfy.success(message);
  }
}
