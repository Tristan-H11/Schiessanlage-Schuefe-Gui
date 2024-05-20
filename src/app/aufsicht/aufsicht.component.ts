import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BahnDTO} from "../bahn-d-t-o";
import {Subject, takeUntil} from "rxjs";
import {NotifierService} from "../notifier-service.service";
import {AufsichtDTO} from "../aufsicht-d-t-o";

@Component({
  selector: 'app-aufsicht',
  templateUrl: './aufsicht.component.html',
  styleUrls: ['./aufsicht.component.scss']
})
export class AufsichtComponent implements OnDestroy {
  public form: FormGroup = new FormGroup({
    'a': new FormControl(null, Validators.required),
    'b': new FormControl(null, Validators.required),
    'c': new FormControl(null, Validators.required)
  });



  public data: AufsichtDTO = new AufsichtDTO();

  public disconnect$: Subject<boolean> = new Subject();

  constructor(public notifierService: NotifierService) {
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnA
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data.a = dto.counter;
      })

    this.notifierService.updateOnB
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data.b = dto.counter;
      })

    this.notifierService.updateOnC
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: BahnDTO) => {
        this.data.c = dto.counter;
      })

    this.notifierService.updateAufsicht
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: AufsichtDTO) => {
        this.data = dto;
      })

    // Request für die initialen Daten
    this.notifierService.refreshAufsicht();
  }

  public setA(): void {
    this.notifierService.aufsichtSetA(this.data.a);
  }

  public setB(): void {
    this.notifierService.aufsichtSetB(this.data.b);
  }

  public setC(): void {
    this.notifierService.aufsichtSetC(this.data.c);
  }

  public disconnect(): void {
    this.disconnect$.next(true);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
