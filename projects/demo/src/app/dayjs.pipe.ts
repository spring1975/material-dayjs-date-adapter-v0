import { Inject, LOCALE_ID, Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import dayjs from 'dayjs';


@Pipe({
  name: 'dayjs'
})
export class DayjsPipe {
  constructor(@Inject(LOCALE_ID) private readonly locale: string) {
  }

  transform(value: dayjs.Dayjs, format?: string, timezone?: string, locale?: string): string|null;
  transform(value: null|undefined, format?: string, timezone?: string, locale?: string): null;
  transform(value: dayjs.Dayjs|null|undefined, format = 'mediumDate', timezone?: string,locale?: string): string|null {
    const datePipe = new DatePipe(this.locale);
    return datePipe.transform(dayjs.isDayjs(value) ? value.toDate() : value, format, timezone,locale);
  }
}
