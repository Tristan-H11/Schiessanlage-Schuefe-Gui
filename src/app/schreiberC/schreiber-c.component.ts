import {Component, OnDestroy} from '@angular/core';
import {NotifierService} from '../notifier-service.service';
import {takeUntil} from 'rxjs';
import {BahnDTO} from "../bahn-d-t-o";
import {env} from "../../env/env";
import {RxStomp} from "@stomp/rx-stomp";
import {AbstractSchreiber} from "../AbstractSchreiber";


@Component({
  selector: 'app-schreiber',
  templateUrl: './schreiber-c.component.html',
  styleUrls: ['./schreiber-c.component.scss']
})
export class SchreiberCComponent extends AbstractSchreiber implements OnDestroy {

  constructor(public notifierService: NotifierService, public stomp: RxStomp) {
    super();
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnC
      .pipe(takeUntil(this.disconnect$))
      .subscribe(async (dto: BahnDTO) => {
        if (dto.shot == "kleiner" && dto.notify) {
          env.beep();
        }
        this.data = new BahnDTO(dto);
        if (dto.notify) {
          await this.animateShot(dto);
        }
      })

    // Request für die initialen Daten
    this.notifierService.sendShotToC("treffer");
  }

  public alertOn(): void {
    this.notifierService.alertOnC();
  }

  public alertOff(): void {
    this.notifierService.alertOffC();
  }

  public open(): void {
    this.notifierService.schreiberOpenC();
  }

  public close(): void {
    this.notifierService.schreiberCloseC();
  }


  public ngOnDestroy(): void {
    this.disconnect();
  }
}
