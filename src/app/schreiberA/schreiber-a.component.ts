import {Component, OnDestroy} from '@angular/core';
import {NotifierService} from '../notifier-service.service';
import {takeUntil} from 'rxjs';
import {BahnDTO} from "../bahn-d-t-o";
import {env} from "../../env/env";
import {RxStomp} from "@stomp/rx-stomp";
import {AbstractSchreiber} from "../AbstractSchreiber";


@Component({
  selector: 'app-schreiber',
  templateUrl: './schreiber-a.component.html',
  styleUrls: ['./schreiber-a.component.scss']
})
export class SchreiberAComponent extends AbstractSchreiber implements OnDestroy {


  constructor(public notifierService: NotifierService, public stomp: RxStomp) {
    super();
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnA
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
    this.notifierService.sendShotToA("treffer");
  }

  public alertOn(): void {
    this.notifierService.alertOnA();
  }

  public alertOff(): void {
    this.notifierService.alertOffA();
  }

  public open(): void {
    this.notifierService.schreiberOpenA();
  }

  public close(): void {
    this.notifierService.schreiberCloseA();
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
