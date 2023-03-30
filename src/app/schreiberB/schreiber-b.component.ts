import {Component, OnDestroy} from '@angular/core';
import {NotifierService} from '../notifier-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';


@Component({
  selector: 'app-schreiber',
  templateUrl: './schreiber-b.component.html',
  styleUrls: ['./schreiber-b.component.css']
})
export class SchreiberBComponent implements OnDestroy{

  public form: FormGroup = new FormGroup({
    'message': new FormControl()
  })

  messages: string[] = [];
  public lastUserMessage: string = "";

  public disconnect$: Subject<boolean> = new Subject();

  constructor(public notifierService: NotifierService) {
    this.subscribe();
  }

  public subscribe(): void {
    this.notifierService.updateOnB
      .pipe(takeUntil(this.disconnect$))
      .subscribe((dto: number) => {
        this.messages.push(String(dto));
        console.log(this.messages)
      })
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
