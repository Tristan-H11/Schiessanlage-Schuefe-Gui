import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SchreiberBRoutingModule} from './schreiber-b-routing.module';
import {SchreiberBComponent} from './schreiber-b.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    SchreiberBComponent
  ],
  exports: [
    SchreiberBComponent
  ],
  imports: [
    CommonModule,
    SchreiberBRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSlideToggleModule,
  ]
})
export class SchreiberBModule {
}
