import {Injectable} from '@angular/core';
import {map, Observable, share, Subject} from 'rxjs';
import {IMessage, RxStomp} from '@stomp/rx-stomp';
import {BahnDTO} from "./bahn-d-t-o";


@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  public updateOnA: Observable<BahnDTO> = new Subject();
  public updateOnB: Observable<BahnDTO> = new Subject();
  public updateOnC: Observable<BahnDTO> = new Subject();

  constructor(private stomp: RxStomp) {
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

  public sendShotToA(message: string): void {
    this.send(message, "/anServer/shotOnA");
  }

  public sendShotToB(message: string): void {
    this.send(message, "/anServer/shotOnB");
  }

  public sendShotToC(message: string): void {
    this.send(message, "/anServer/shotOnC");
  }

  public alertOnA(): void {
    this.send("", "/anServer/alertOnA");
  }

  public alertOnB(): void {
    this.send("", "/anServer/alertOnB");
  }

  public alertOnC(): void {
    this.send("", "/anServer/alertOnC");
  }

  public alertOffA(): void {
    this.send("", "/anServer/alertOffA");
  }

  public alertOffB(): void {
    this.send("", "/anServer/alertOffB");
  }

  public alertOffC(): void {
    this.send("", "/anServer/alertOffC");
  }

  public openA(): void {
    this.send("", "/anServer/openA");
  }

  public openB(): void {
    this.send("", "/anServer/openB");
  }

  public openC(): void {
    this.send("", "/anServer/openC");
  }

  public closeA(): void {
    this.send("", "/anServer/closeA");
  }

  public closeB(): void {
    this.send("", "/anServer/closeB");
  }

  public closeC(): void {
    this.send("", "/anServer/closeC");
  }

  private send(message: string, destination: string): void {
    this.stomp.publish({
      destination: destination,
      body: JSON.stringify(message),
      headers: {'content-type': 'application/json'}
    });
  }

}
