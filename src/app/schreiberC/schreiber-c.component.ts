import {Component, OnDestroy} from '@angular/core';
import {NotifierService} from '../notifier-service.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject, takeUntil} from 'rxjs';


@Component({
  selector: 'app-schreiber',
  templateUrl: './schreiber-c.component.html',
  styleUrls: ['./schreiber-c.component.css']
})
export class SchreiberCComponent implements OnDestroy{

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
    this.notifierService.updateOnC
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
    this.notifierService.sendShotToC(this.form.value);
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
