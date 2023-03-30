import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AufsichtRoutingModule } from './aufsicht-routing.module';
import { AufsichtComponent } from './aufsicht.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        AufsichtComponent
    ],
    exports: [
        AufsichtComponent
    ],
  imports: [
    CommonModule,
    AufsichtRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AufsichtModule { }
