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
import { MatDayjsDateModule } from './shared/utils/material-dayjs-adapter';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DAYJS_DATE_ADAPTER_OPTIONS } from './shared/utils/material-dayjs-adapter/dayjs-date-adapter';

@NgModule({
  declarations: [AppComponent],
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
     * By default the MomentDateAdapter will creates dates in your time zone specific locale.
     * You can change the default behaviour to parse dates as UTC by providing the
     * MAT_MOMENT_DATE_ADAPTER_OPTIONS and setting it to useUtc: true.
     */
    {
      provide: MAT_DAYJS_DATE_ADAPTER_OPTIONS,
      useValue: { useUtc: true }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
