import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MAT_DAYJS_DATE_FORMATS } from 'material-dayjs-date-adapter';
import dayjs from 'dayjs';


@Pipe({
  name: 'dateOnly'
})
export class DateOnlyPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return dayjs(value).format(MAT_DAYJS_DATE_FORMATS.parse.dateInput[2]);
  }
}
