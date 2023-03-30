import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckungBRoutingModule } from './deckung-b-routing.module';
import { DeckungBComponent } from './deckung-b.component';


@NgModule({
    declarations: [
        DeckungBComponent
    ],
    exports: [
        DeckungBComponent
    ],
  imports: [
    CommonModule,
    DeckungBRoutingModule,
  ]
})
export class DeckungBModule { }
