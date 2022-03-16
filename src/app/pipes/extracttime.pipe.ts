import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'extracttime'
})
export class ExtracttimePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {

    return value.split(" ")[1];
  }

}
