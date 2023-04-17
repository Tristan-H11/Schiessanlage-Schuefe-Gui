import {Component, OnDestroy} from '@angular/core';
import {NotifierService} from '../notifier-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {BahnDTO} from "../bahn-d-t-o";
import {env} from "../../env/env";
import {RxStomp} from "@stomp/rx-stomp";


@Component({
  selector: 'app-schreiber',
  templateUrl: './schreiber-c.component.html',
  styleUrls: ['./schreiber-c.component.css']
})
export class SchreiberCComponent implements OnDestroy{

  public form: FormGroup = new FormGroup({
    'message': new FormControl()
  })

  data: BahnDTO = new BahnDTO();

  public disconnect$: Subject<boolean> = new Subject();

  constructor(public notifierService: NotifierService, public stomp: RxStomp) {
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnC
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        if (dto.shot == "kleiner" && dto.notify) {
          env.beep();
        }
        this.data = new BahnDTO(dto);
      })

    // Request für die initialen Daten
    this.notifierService.sendShotToC("treffer");
  }

  public getColor(kind: string): string {
    if (this.data.shot === kind) {
      return "text-red";
    }
    return "text-subtle";
  }

  public getBackgroundColorClass(): string {
    if (this.isOpen()) {
      return "bg-pastel-green"
    }
    return "bg-pastel-red";
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

  public isOpen(): boolean {
    return this.data.closed === 0;
  }

  public isClosedBySchreiber(): boolean {
    return this.data.closed === 1;
  }

  public isClosedByDeckung(): boolean {
    return this.data.closed === 2
  }


  public disconnect(): void{
    this.disconnect$.next(true);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
