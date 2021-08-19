import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { startWith, filter, map } from 'rxjs';
import { FormConfig } from './shared/forms/types';
import { SelfDestruct } from './shared/utils/self-destruct';

interface TestDateForm {
  datePicked: dayjs.Dayjs;
}
const testDateFormConfig: FormConfig<TestDateForm> = {
  datePicked: ['']
};


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent extends SelfDestruct implements OnInit {

  readonly testDateForm = this.fb.group(testDateFormConfig);

  today = dayjs.utc().startOf('day');
  datePicked = this.testDateForm.get('datePicked');

  datePicked$ = this.datePicked?.valueChanges.pipe(
      startWith(this.today),
      filter<dayjs.Dayjs>(Boolean),
      map((d) => d.toDate())
  );

  get getDatePicked() {
      return this.datePicked?.value;
  }

  get longAgo() {
      return dayjs(this.datePicked?.value).isBefore(dayjs.utc().subtract(6, 'day'), 'day');
  }
  get onHorizon() {
      return dayjs(this.datePicked?.value).isAfter(dayjs.utc().add(6, 'day'), 'day');
  }

  constructor(
      private readonly dateAdapter: DateAdapter<dayjs.Dayjs>,
      private readonly fb: FormBuilder
  ) {
      super();
      dayjs.extend(utc);
  }

  ngOnInit(): void {
      this.testDateForm.patchValue({
          datePicked: this.today
      }
      );
  }

  setLocale(locale: string) {
      dayjs.locale(locale);
      this.dateAdapter.setLocale(locale);
  }

  previous() {
      this.datePicked?.patchValue(this.getDatePicked.subtract(1, 'day'));
  }

  next() {
      this.datePicked?.patchValue(this.getDatePicked.add(1, 'day'));
  }

}
