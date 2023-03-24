import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SchreiberRoutingModule} from './schreiber-routing.module';
import {SchreiberComponent} from './schreiber.component';


@NgModule({
  declarations: [
    SchreiberComponent
  ],
  exports: [
    SchreiberComponent
  ],
  imports: [
    CommonModule,
    SchreiberRoutingModule,
  ]
})
export class SchreiberModule {
}
