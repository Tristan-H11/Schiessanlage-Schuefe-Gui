import {Component, OnDestroy} from '@angular/core';
import {BahnDTO} from "../bahn-d-t-o";
import {takeUntil} from "rxjs";
import {NotifierService} from "../notifier-service.service";
import {env} from "../../env/env";
import {RxStomp} from "@stomp/rx-stomp";
import {AbstractDeckung} from "../AbstractDeckung";

@Component({
  selector: 'app-deckung',
  templateUrl: './deckung-b.component.html',
  styleUrls: ['./deckung-b.component.scss']
})
export class DeckungBComponent extends AbstractDeckung implements OnDestroy {

  constructor(public notifierService: NotifierService, public stomp: RxStomp) {
    super();
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

  public sendMessage(value: string): void {
    this.showShotButtons = false;

    this.notifierService.sendShotToB(value);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
