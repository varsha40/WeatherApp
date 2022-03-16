import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amPmFormat'
})
export class AmPmFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
                var date = new Date(value);
                var hours = date.getHours();
                var minutes = date.getMinutes();
                
                // Check whether AM or PM
                var newformat = hours >= 12 ? 'PM' : 'AM'; 
                
                // Find current hour in AM-PM Format
                hours = hours % 12; 
                
                // To display "0" as "12"
                hours = hours ? hours : 12; 

                return hours +" "+ newformat;
  }

}
