import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckungCRoutingModule } from './deckung-c-routing.module';
import { DeckungCComponent } from './deckung-c.component';


@NgModule({
    declarations: [
        DeckungCComponent
    ],
    exports: [
        DeckungCComponent
    ],
  imports: [
    CommonModule,
    DeckungCRoutingModule,
  ]
})
export class DeckungCModule { }
