import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SchreiberARoutingModule} from './schreiber-a-routing.module';
import {SchreiberAComponent} from './schreiber-a.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SchreiberAComponent
  ],
  exports: [
    SchreiberAComponent
  ],
  imports: [
    CommonModule,
    SchreiberARoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SchreiberAModule {
}
