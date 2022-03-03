import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { startWith, filter, map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {


  readonly initialComponentDate = dayjs();
  readonly initialComponentDateAsUTC = dayjs().utc();
  readonly initialComponentDateAsUTCLocal = dayjs().utc().local();

  // Datepicker takes `Dayjs` objects instead of `Date` objects.
  readonly datePicked = new FormControl();
  readonly fcDate2 = new FormControl();

  readonly datePicked$ = this.datePicked?.valueChanges.pipe(
      startWith(dayjs(this.api.initializedDate)),
      filter<dayjs.Dayjs>(Boolean),
      map((d) => d.toDate())
  );

  get longAgo() {
      return dayjs(this.datePicked?.value).isBefore(dayjs(this.api.initializedDate).utc().subtract(6, 'day'), 'day');
  }
  get onHorizon() {
      return dayjs(this.datePicked?.value).isAfter(dayjs(this.api.initializedDate).utc().add(6, 'day'), 'day');
  }

  constructor(
      public readonly api: ApiService,
      private readonly dateAdapter: DateAdapter<dayjs.Dayjs>
  ) {
      dayjs.extend(utc);
  }

  ngOnInit(): void {
      console.log('datepicker value initialized as', this.datePicked.value);
      this.setupDtoDateListener();
      this.setDatepickerOnInit();

  }

  setupDtoDateListener() {
    this.datePicked.valueChanges.subscribe((dt: dayjs.Dayjs) => {
      console.log('FormControl value set to: ', dt);
      this.api.saveDate(dt);
      this.fcDate2.setValue(this.api.getDate());
    })
  }

  setDatepickerOnInit() {
    const dt = this.api.getDate();
    console.log('api value received: ', dt);
    this.datePicked.setValue(dt);
  }

  previous() {
      this.datePicked?.setValue(this.datePicked?.value.subtract(1, 'day'));
  }

  next() {
      this.datePicked?.setValue(this.datePicked?.value.add(1, 'day'));
  }

  isDayjs(){
    return dayjs.isDayjs(this.datePicked.value);
  }

}
