import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDayjsDateModule } from '../../../material-dayjs-date-adapter/src/lib/adapter';
import { MatInputModule } from '@angular/material/input';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateOnlyPipe } from './dateonly.pipe';
import { DayjsPipe } from './dayjs.pipe';
import { DayjsDateAdapter, MAT_DAYJS_DATE_ADAPTER_OPTIONS, MAT_DAYJS_DATE_FORMATS } from 'material-dayjs-date-adapter';

@NgModule({
  declarations: [AppComponent, DateOnlyPipe, DayjsPipe],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDayjsDateModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  providers: [
    /* https://material.angular.io/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings
     * By default the DayjsDateAdapter will create dates in your time zone specific locale.
     * You can change the default behavior to parse dates as UTC by providing the
     * MAT_DAYJS_DATE_ADAPTER_OPTIONS and setting it to useUtc: true.
     */
    { provide: MAT_DAYJS_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true} },
    {
        provide: DateAdapter,
        useClass: DayjsDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_DAYJS_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DAYJS_DATE_FORMATS },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
