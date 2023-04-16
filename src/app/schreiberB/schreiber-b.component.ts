import {Component, OnDestroy} from '@angular/core';
import {NotifierService} from '../notifier-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {BahnDTO} from "../bahn-d-t-o";
import {env} from "../../env/env";


@Component({
  selector: 'app-schreiber',
  templateUrl: './schreiber-b.component.html',
  styleUrls: ['./schreiber-b.component.css']
})
export class SchreiberBComponent implements OnDestroy{

  public form: FormGroup = new FormGroup({
    'message': new FormControl()
  })

  data: BahnDTO = new BahnDTO();

  public disconnect$: Subject<boolean> = new Subject();
  public showTreffer: boolean = true;

  constructor(public notifierService: NotifierService) {
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnB
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data = new BahnDTO(dto);
        if (dto.shot == "kleiner" && dto.notify) {
          env.beep();
        }
      })

    // Request für die initialen Daten
    this.notifierService.sendShotToB("treffer");
  }

  public getColor(kind: string): string {
    if (this.data.shot === kind) {
      return "text-red";
    }
    return "text-subtle";
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

  public getBackgroundColorClass(): string {
    if (this.isOpen()) {
      return "bg-pastel-green"
    }
    return "bg-pastel-red";
  }
}
