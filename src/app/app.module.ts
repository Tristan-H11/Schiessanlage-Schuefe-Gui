import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {DeckungComponent} from "./deckung/deckung.component";
import {SchreiberComponent} from "./schreiber/schreiber.component";
import {AufsichtComponent} from "./aufsicht/aufsicht.component";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    RouterModule.forRoot([
      {path: '', redirectTo: 'schreiber', pathMatch: "full"},
      {path: 'deckung', component: DeckungComponent, pathMatch: "full"},
      {path: 'schreiber', component: SchreiberComponent, pathMatch: "full"},
      {path: 'aufsicht', component: AufsichtComponent, pathMatch: "full"}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
