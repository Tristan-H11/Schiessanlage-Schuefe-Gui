import {Component, OnDestroy} from '@angular/core';
import {NotifierService} from '../notifier-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';
import {BahnDTO} from "../bahn-d-t-o";


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

  constructor(public notifierService: NotifierService) {
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnB
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data = new BahnDTO(dto);
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
    this.notifierService.openB();
  }

  public close(): void {
    this.notifierService.closeB();
  }

  public disconnect(): void{
    this.disconnect$.next(true);
  }

  public sendMessage(): void {
    this.notifierService.sendShotToB(this.form.value);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
