import {Component, OnDestroy} from '@angular/core';
import {BahnDTO} from "../bahn-d-t-o";
import {Subject, takeUntil} from "rxjs";
import {NotifierService} from "../notifier-service.service";

@Component({
  selector: 'app-deckung',
  templateUrl: './deckung-c.component.html',
  styleUrls: ['./deckung-c.component.css']
})
export class DeckungCComponent implements OnDestroy {
  data: BahnDTO = new BahnDTO();

  public disconnect$: Subject<boolean> = new Subject();

  constructor(public notifierService: NotifierService) {
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnC
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data = new BahnDTO(dto);
      })

    // Request für die initialen Daten
    this.notifierService.sendShotToC("treffer");
  }


  public alertOff(): void {
    this.notifierService.alertOffC();
  }

  public open(): void {
    this.notifierService.deckungOpenC();
  }

  public close(): void {
    this.notifierService.deckungCloseC();
  }

  public disconnect(): void {
    this.disconnect$.next(true);
  }

  public sendMessage(value: string): void {
    this.notifierService.sendShotToC(value);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
