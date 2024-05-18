import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  UrlMatcher,
  UrlMatchResult,
  UrlSegment
} from "@angular/router";
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
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatSliderModule} from "@angular/material/slider";

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

      {matcher: caseInsensitiveMatcher('aufsicht'), component: AufsichtComponent},

      {matcher: caseInsensitiveMatcher('deckungA'), component: DeckungAComponent},
      {matcher: caseInsensitiveMatcher('deckungB'), component: DeckungBComponent},
      {matcher: caseInsensitiveMatcher('deckungC'), component: DeckungCComponent},

      {matcher: caseInsensitiveMatcher('schreiberA'), component: SchreiberAComponent},
      {matcher: caseInsensitiveMatcher('schreiberB'), component: SchreiberBComponent},
      {matcher: caseInsensitiveMatcher('schreiberC'), component: SchreiberCComponent}
    ]),
    NoopAnimationsModule,
    MatButtonToggleModule,
    MatSliderModule
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

function caseInsensitiveMatcher(url: string): UrlMatcher {
  return (segments: UrlSegment[]): UrlMatchResult | null => {
    // eslint-disable-next-line @typescript-eslint/typedef
    const foundSegment = segments.find(segment => segment.path.toLowerCase() === url.toLowerCase());
    if (foundSegment) {
      return {consumed: [foundSegment]};
    }
    return null;
  };
}
