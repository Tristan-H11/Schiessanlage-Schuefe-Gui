import {Injectable} from '@angular/core';
import {map, Observable, share, Subject} from 'rxjs';
import {IMessage, RxStomp} from '@stomp/rx-stomp';
import {BahnDTO} from "./bahn-d-t-o";


@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  public notify: Observable<string> = new Subject();
  public updateOnA: Observable<number> = new Subject();
  public updateOnB: Observable<number> = new Subject();
  public updateOnC: Observable<number> = new Subject();

  constructor(private stomp: RxStomp) {
    this.notify = stomp.watch('/anClient/message')
      .pipe(
        map((message: IMessage) => JSON.parse(message.body)),
        share({resetOnRefCountZero: true})
      )

    this.updateOnA = stomp.watch("/anClient/updateOnA")
      .pipe(
        map((message: IMessage) => JSON.parse(message.body)),
        share({resetOnRefCountZero: true})
      )

    this.updateOnB = stomp.watch("/anClient/updateOnB")
      .pipe(
        map((message: IMessage) => JSON.parse(message.body)),
        share({resetOnRefCountZero: true})
      )

    this.updateOnC = stomp.watch("/anClient/updateOnC")
      .pipe(
        map((message: IMessage) => JSON.parse(message.body)),
        share({resetOnRefCountZero: true})
      )

  }

  public sendToDefault(message:string): void {
    this.send(message, "/anServer/message");
  }

  public sendShotToA(message: string): void {
    this.send(message, "/anServer/shotOnA");
  }

  public sendShotToB(message: string): void {
    this.send(message, "/anServer/shotOnB");
  }

  public sendShotToC(message: string): void {
    this.send(message, "/anServer/shotOnC");
  }

  private send(message: string, destination: string): void {
    this.stomp.publish({
      destination: destination,
      body: JSON.stringify(message),
      headers: {'content-type': 'application/json'}
    });
  }
}
