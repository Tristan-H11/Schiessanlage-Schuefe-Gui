import {Component, OnDestroy} from '@angular/core';
import {NotifierService} from '../notifier-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {BahnDTO} from "../bahn-d-t-o";
import {env} from "../../env/env";


@Component({
  selector: 'app-schreiber',
  templateUrl: './schreiber-a.component.html',
  styleUrls: ['./schreiber-a.component.css']
})
export class SchreiberAComponent implements OnDestroy {

  public form: FormGroup = new FormGroup({
    'message': new FormControl()
  })

  data: BahnDTO = new BahnDTO();

  public disconnect$: Subject<boolean> = new Subject();

  constructor(public notifierService: NotifierService) {
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnA
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data = new BahnDTO(dto);
        if (dto.shot == "kleiner") {
          env.beep();
        }
      })

    // Request für die initialen Daten
    this.notifierService.sendShotToA("treffer");
  }

  public handleAlertButton(): void {
    if (this.data.alert) {
      this.alertOn()
    } else {
      this.alertOff();
    }
  }

  public handleSperrButton(): void {
    if (this.data.closed) {
      this.close();
    } else {
      this.open();
    }
  }


  public alertOn(): void {
    this.notifierService.alertOnA();
  }

  public alertOff(): void {
    this.notifierService.alertOffA();
  }

  public open(): void {
    this.notifierService.openA();
  }

  public close(): void {
    this.notifierService.closeA();
  }

  public disconnect(): void {
    this.disconnect$.next(true);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
