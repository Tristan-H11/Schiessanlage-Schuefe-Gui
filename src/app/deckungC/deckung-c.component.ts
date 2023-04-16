import {Component, OnDestroy} from '@angular/core';
import {BahnDTO} from "../bahn-d-t-o";
import {Subject, takeUntil} from "rxjs";
import {NotifierService} from "../notifier-service.service";
import {RxStomp} from "@stomp/rx-stomp";
import {env} from "../../env/env";

@Component({
  selector: 'app-deckung',
  templateUrl: './deckung-c.component.html',
  styleUrls: ['./deckung-c.component.css']
})
export class DeckungCComponent implements OnDestroy {
  data: BahnDTO = new BahnDTO();

  public disconnect$: Subject<boolean> = new Subject();

  public showShotButtons: boolean = false;

  constructor(public notifierService: NotifierService, public stomp: RxStomp) {
    this.subscribe();

  }

  public subscribe(): void {
    this.notifierService.updateOnC
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data = new BahnDTO(dto);
        if (dto.alert) {
          env.beep();
        }
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

    this.notifierService.sendShotToC(value);
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
