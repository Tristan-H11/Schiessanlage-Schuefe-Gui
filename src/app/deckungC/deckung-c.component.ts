import {Component, OnDestroy} from '@angular/core';
import {BahnDTO} from "../bahn-d-t-o";
import {takeUntil} from "rxjs";
import {NotifierService} from "../notifier-service.service";
import {RxStomp} from "@stomp/rx-stomp";
import {env} from "../../env/env";
import {AbstractDeckung} from "../AbstractDeckung";

@Component({
  selector: 'app-deckung',
  templateUrl: './deckung-c.component.html',
  styleUrls: ['./deckung-c.component.scss']
})
export class DeckungCComponent extends AbstractDeckung implements OnDestroy {


  constructor(public notifierService: NotifierService, public stomp: RxStomp) {
    super();
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

  public sendMessage(value: string): void {
    this.showShotButtons = false;

    this.notifierService.sendShotToC(value);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
