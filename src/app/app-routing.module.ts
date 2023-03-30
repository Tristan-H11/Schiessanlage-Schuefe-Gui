import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DeckungComponent} from './deckung/deckung.component';
import {SchreiberAComponent} from './schreiberA/schreiber-a.component';
import {AufsichtComponent} from './aufsicht/aufsicht.component';


const routes: Routes = [
  {path: '/', redirectTo: 'schreiber', pathMatch: "full"},
  {path: '/deckung', component: DeckungComponent, pathMatch: "full"},
  {path: '/schreiber', component: SchreiberAComponent, pathMatch: "full"},
  {path: '/aufsicht', component: AufsichtComponent, pathMatch: "full"}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
