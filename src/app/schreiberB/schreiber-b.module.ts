import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SchreiberBRoutingModule} from './schreiber-b-routing.module';
import {SchreiberBComponent} from './schreiber-b.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


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
  ]
})
export class SchreiberBModule {
}
