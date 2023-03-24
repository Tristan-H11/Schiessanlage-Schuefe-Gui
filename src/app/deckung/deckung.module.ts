import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckungRoutingModule } from './deckung-routing.module';
import { DeckungComponent } from './deckung.component';


@NgModule({
    declarations: [
        DeckungComponent
    ],
    exports: [
        DeckungComponent
    ],
  imports: [
    CommonModule,
    DeckungRoutingModule,
  ]
})
export class DeckungModule { }
