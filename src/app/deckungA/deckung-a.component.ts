import {Component, OnDestroy} from '@angular/core';
import {BahnDTO} from "../bahn-d-t-o";
import {Subject, takeUntil} from "rxjs";
import {NotifierService} from "../notifier-service.service";

@Component({
  selector: 'app-deckung',
  templateUrl: './deckung-a.component.html',
  styleUrls: ['./deckung-a.component.css']
})
export class DeckungAComponent implements OnDestroy {
  data: BahnDTO = new BahnDTO();

  public disconnect$: Subject<boolean> = new Subject();

  public showShotButtons: boolean = false;

  constructor(public notifierService: NotifierService) {
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnA
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data = new BahnDTO(dto);
      })

    // Request für die initialen Daten
    this.notifierService.sendShotToA("treffer");
  }


  public alertOff(): void {
    this.notifierService.alertOffA();
  }

  public open(): void {
    this.notifierService.deckungOpenA();
  }

  public close(): void {
    this.notifierService.deckungCloseA();
  }

  public disconnect(): void {
    this.disconnect$.next(true);
  }

  public sendMessage(value: string): void {
    this.showShotButtons = false;
    this.notifierService.sendShotToA(value);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
