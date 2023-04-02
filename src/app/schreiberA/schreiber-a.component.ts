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
        if (dto.shot == "kleiner" && dto.notify) {
          env.beep();
        }
        this.data = new BahnDTO(dto);
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

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
