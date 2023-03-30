import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SchreiberCRoutingModule} from './schreiber-c-routing.module';
import {SchreiberCComponent} from './schreiber-c.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SchreiberCComponent
  ],
  exports: [
    SchreiberCComponent
  ],
  imports: [
    CommonModule,
    SchreiberCRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SchreiberCModule {
}
