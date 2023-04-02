import {Component, OnDestroy} from '@angular/core';
import {BahnDTO} from "../bahn-d-t-o";
import {Subject, takeUntil} from "rxjs";
import {NotifierService} from "../notifier-service.service";

@Component({
  selector: 'app-deckung',
  templateUrl: './deckung-b.component.html',
  styleUrls: ['./deckung-b.component.css']
})
export class DeckungBComponent implements OnDestroy {
  data: BahnDTO = new BahnDTO();

  public disconnect$: Subject<boolean> = new Subject();

  constructor(public notifierService: NotifierService) {
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnB
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data = new BahnDTO(dto);
      })

    // Request für die initialen Daten
    this.notifierService.sendShotToB("treffer");
  }


  public alertOff(): void {
    this.notifierService.alertOffB();
  }

  public open(): void {
    this.notifierService.deckungOpenB();
  }

  public close(): void {
    this.notifierService.deckungCloseB();
  }

  public disconnect(): void {
    this.disconnect$.next(true);
  }

  public sendMessage(value: string): void {
    this.notifierService.sendShotToB(value);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
