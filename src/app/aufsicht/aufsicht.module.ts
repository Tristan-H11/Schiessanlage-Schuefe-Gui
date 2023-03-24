import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AufsichtRoutingModule } from './aufsicht-routing.module';
import { AufsichtComponent } from './aufsicht.component';


@NgModule({
    declarations: [
        AufsichtComponent
    ],
    exports: [
        AufsichtComponent
    ],
    imports: [
        CommonModule,
        AufsichtRoutingModule
    ]
})
export class AufsichtModule { }
