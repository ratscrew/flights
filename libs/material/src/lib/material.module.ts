import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule, MatCheckboxModule, MatProgressBarModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatListModule, MatSlideToggleModule, MatMenuModule, MatIconModule} from '@angular/material';
export {MatButtonModule, MatCheckboxModule, MatProgressBarModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatListModule, MatSlideToggleModule, MatMenuModule, MatIconModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule, 
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule
  ],
  exports:[
    MatButtonModule, 
    MatCheckboxModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class MaterialModule {}
