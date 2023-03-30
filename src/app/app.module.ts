import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {SchreiberAComponent} from "./schreiberA/schreiber-a.component";
import {AufsichtComponent} from "./aufsicht/aufsicht.component";
import {RxStomp} from "@stomp/rx-stomp";
import {environment} from '../env/env';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SchreiberAModule} from "./schreiberA/schreiber-a.module";
import {AufsichtModule} from "./aufsicht/aufsicht.module";
import {SchreiberBComponent} from "./schreiberB/schreiber-b.component";
import {SchreiberCComponent} from "./schreiberC/schreiber-c.component";
import {SchreiberBModule} from "./schreiberB/schreiber-b.module";
import {SchreiberCModule} from "./schreiberC/schreiber-c.module";
import {DeckungBModule} from "./deckungB/deckung-b.module";
import {DeckungAModule} from "./deckungA/deckung-a.module";
import {DeckungCModule} from "./deckungC/deckung-c.module";
import {DeckungAComponent} from "./deckungA/deckung-a.component";
import {DeckungBComponent} from "./deckungB/deckung-b.component";
import {DeckungCComponent} from "./deckungC/deckung-c.component";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    SchreiberAModule,
    SchreiberBModule,
    SchreiberCModule,
    DeckungAModule,
    DeckungBModule,
    DeckungCModule,
    AufsichtModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    RouterModule.forRoot([
      {path: '', redirectTo: 'aufsicht', pathMatch: "full"},
      {path: 'aufsicht', component: AufsichtComponent, pathMatch: "full"},

      {path: 'deckunga', redirectTo: 'deckungA', pathMatch: "full"},
      {path: 'deckungb', redirectTo: 'deckungB', pathMatch: "full"},
      {path: 'deckungc', redirectTo: 'deckungC', pathMatch: "full"},
      {path: 'deckungA', component: DeckungAComponent, pathMatch: "full"},
      {path: 'deckungB', component: DeckungBComponent, pathMatch: "full"},
      {path: 'deckungC', component: DeckungCComponent, pathMatch: "full"},

      {path: 'schreibera', redirectTo: 'schreiberA', pathMatch: "full"},
      {path: 'schreiberb', redirectTo: 'schreiberB', pathMatch: "full"},
      {path: 'schreiberc', redirectTo: 'schreiberC', pathMatch: "full"},
      {path: 'schreiberA', component: SchreiberAComponent, pathMatch: "full"},
      {path: 'schreiberB', component: SchreiberBComponent, pathMatch: "full"},
      {path: 'schreiberC', component: SchreiberCComponent, pathMatch: "full"}
    ]),
    NoopAnimationsModule,
  ],
  providers: [
    {
      provide: RxStomp,
      useFactory: () => {
        const rxStomp: RxStomp = new RxStomp();
        rxStomp.configure({
          brokerURL: environment.wsUrl,
        });

        rxStomp.activate();
        return rxStomp;
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
