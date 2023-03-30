import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckungARoutingModule } from './deckung-a-routing.module';
import { DeckungAComponent } from './deckung-a.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        DeckungAComponent
    ],
    exports: [
        DeckungAComponent
    ],
  imports: [
    CommonModule,
    DeckungARoutingModule,
    ReactiveFormsModule,
  ]
})
export class DeckungAModule { }
