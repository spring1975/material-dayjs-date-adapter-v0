import { MAT_DAYJS_DATE_ADAPTER_OPTIONS } from './utils/material-dayjs-adapter/dayjs-date-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDayjsDateModule } from './utils/material-dayjs-adapter';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

const materialModules = [
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatExpansionModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDayjsDateModule
];

// https://material.angular.io/components/categories
@NgModule({
    imports: [...materialModules],
    exports: [...materialModules],
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
    ]
})
export class MaterialModule {}
