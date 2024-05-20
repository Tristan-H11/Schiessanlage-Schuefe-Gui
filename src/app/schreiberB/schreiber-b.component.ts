import {Component, OnDestroy} from '@angular/core';
import {NotifierService} from '../notifier-service.service';
import {takeUntil} from 'rxjs';
import {BahnDTO} from "../bahn-d-t-o";
import {env} from "../../env/env";
import {RxStomp} from "@stomp/rx-stomp";
import {AbstractSchreiber} from "../AbstractSchreiber";


@Component({
  selector: 'app-schreiber',
  templateUrl: './schreiber-b.component.html',
  styleUrls: ['./schreiber-b.component.scss']
})
export class SchreiberBComponent extends AbstractSchreiber implements OnDestroy{

  constructor(public notifierService: NotifierService, public stomp: RxStomp) {
    super();
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnB
      .pipe(takeUntil(this.disconnect$))
      .subscribe(async (dto: BahnDTO) => {
        this.data = new BahnDTO(dto);
        if (dto.shot == "kleiner" && dto.notify) {
          env.beep();
        }
        if (dto.notify) {
          await this.animateShot(dto);
        }
      })

    // Request für die initialen Daten
    this.notifierService.sendShotToB("treffer");
  }

  public alertOn(): void {
    this.notifierService.alertOnB();
  }

  public alertOff(): void {
    this.notifierService.alertOffB();
  }

  public open(): void {
    this.notifierService.schreiberOpenB();
  }

  public close(): void {
    this.notifierService.schreiberCloseB();
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
