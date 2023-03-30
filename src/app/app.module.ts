import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {DeckungComponent} from "./deckung/deckung.component";
import {SchreiberAComponent} from "./schreiberA/schreiber-a.component";
import {AufsichtComponent} from "./aufsicht/aufsicht.component";
import {RxStomp} from "@stomp/rx-stomp";
import {environment} from '../env/env';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SchreiberAModule} from "./schreiberA/schreiber-a.module";
import {DeckungModule} from "./deckung/deckung.module";
import {AufsichtModule} from "./aufsicht/aufsicht.module";
import {SchreiberBComponent} from "./schreiberB/schreiber-b.component";
import {SchreiberCComponent} from "./schreiberC/schreiber-c.component";
import {SchreiberBModule} from "./schreiberB/schreiber-b.module";
import {SchreiberCModule} from "./schreiberC/schreiber-c.module";

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
    DeckungModule,
    AufsichtModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    RouterModule.forRoot([
      {path: '', redirectTo: 'aufsicht', pathMatch: "full"},
      {path: 'deckung', component: DeckungComponent, pathMatch: "full"},
      {path: 'schreiberA', component: SchreiberAComponent, pathMatch: "full"},
      {path: 'schreiberB', component: SchreiberBComponent, pathMatch: "full"},
      {path: 'schreiberC', component: SchreiberCComponent, pathMatch: "full"},
      {path: 'aufsicht', component: AufsichtComponent, pathMatch: "full"}
    ]),
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
