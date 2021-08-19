import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';

const modules = [
    CommonModule,
    FlexLayoutModule,
    MaterialModule
];

@NgModule({
    declarations: [],
    imports: [
        ...modules,
    ],
    exports: [
        ...modules
    ]
})
export class SharedModule { }
