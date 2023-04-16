import {Component, OnDestroy} from '@angular/core';
import {BahnDTO} from "../bahn-d-t-o";
import {Subject, takeUntil} from "rxjs";
import {NotifierService} from "../notifier-service.service";
import {env} from "../../env/env";
import {RxStomp} from "@stomp/rx-stomp";

@Component({
  selector: 'app-deckung',
  templateUrl: './deckung-b.component.html',
  styleUrls: ['./deckung-b.component.css']
})
export class DeckungBComponent implements OnDestroy {
  data: BahnDTO = new BahnDTO();

  public disconnect$: Subject<boolean> = new Subject();

  public showShotButtons: boolean = false;


  constructor(public notifierService: NotifierService, public stomp: RxStomp) {
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnB
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data = new BahnDTO(dto);
        if (dto.alert) {
          env.beep();
        }
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

  public isOpen(): boolean {
    return this.data.closed === 0;
  }

  public isClosedBySchreiber(): boolean {
    return this.data.closed === 1;
  }

  public isClosedByDeckung(): boolean {
    return this.data.closed === 2
  }

  public disconnect(): void {
    this.disconnect$.next(true);
  }

  public sendMessage(value: string): void {
    this.showShotButtons = false;

    this.notifierService.sendShotToB(value);
  }

  public getBackgroundColorClass(): string {
    if (this.isOpen()) {
      return "bg-pastel-green"
    }
    return "bg-pastel-red";
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
