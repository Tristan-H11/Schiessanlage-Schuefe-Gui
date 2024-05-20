import {Component, OnDestroy} from '@angular/core';
import {BahnDTO} from "../bahn-d-t-o";
import {takeUntil} from "rxjs";
import {NotifierService} from "../notifier-service.service";
import {RxStomp} from "@stomp/rx-stomp";
import {env} from "../../env/env";
import {AbstractDeckung} from "../AbstractDeckung";

@Component({
  selector: 'app-deckung',
  templateUrl: './deckung-a.component.html',
  styleUrls: ['./deckung-a.component.scss']
})
export class DeckungAComponent extends AbstractDeckung implements OnDestroy {

  constructor(public notifierService: NotifierService, public stomp: RxStomp) {
    super();
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnA
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data = new BahnDTO(dto);
        if (dto.alert) {
          env.beep();
        }
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

  public sendMessage(value: string): void {
    this.showShotButtons = false;
    this.notifierService.sendShotToA(value);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
