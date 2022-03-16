import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localtimetoday'
})
export class LocaltimetodayPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date(value);

    return weekday[d.getDay()];
  }

}
