import {Injectable} from '@angular/core';
import {map, Observable, share, Subject} from 'rxjs';
import {IMessage, RxStomp} from '@stomp/rx-stomp';
import {BahnDTO} from "./bahn-d-t-o";
import {AufsichtDTO} from "./aufsicht-d-t-o";


@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  public updateOnA: Observable<BahnDTO> = new Subject();
  public updateOnB: Observable<BahnDTO> = new Subject();
  public updateOnC: Observable<BahnDTO> = new Subject();
  public updateAufsicht: Observable<AufsichtDTO> = new Subject();

  constructor(private stomp: RxStomp) {
    this.updateOnA = stomp.watch("/anClient/updateOnA")
      .pipe(
        map((message: IMessage) => JSON.parse(message.body)),
        share({resetOnRefCountZero: true})
      );

    this.updateOnB = stomp.watch("/anClient/updateOnB")
      .pipe(
        map((message: IMessage) => JSON.parse(message.body)),
        share({resetOnRefCountZero: true})
      );

    this.updateOnC = stomp.watch("/anClient/updateOnC")
      .pipe(
        map((message: IMessage) => JSON.parse(message.body)),
        share({resetOnRefCountZero: true})
      );

    this.updateAufsicht = stomp.watch("/anClient/refreshAufsicht")
      .pipe(
        map((message: IMessage) => JSON.parse(message.body)),
        share({resetOnRefCountZero: true})
      );
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

  public schreiberOpenA(): void {
    this.send("", "/anServer/schreiberOpenA");
  }

  public schreiberOpenB(): void {
    this.send("", "/anServer/schreiberOpenB");
  }

  public schreiberOpenC(): void {
    this.send("", "/anServer/schreiberOpenC");
  }

  public schreiberCloseA(): void {
    this.send("", "/anServer/schreiberCloseA");
  }

  public schreiberCloseB(): void {
    this.send("", "/anServer/schreiberCloseB");
  }

  public schreiberCloseC(): void {
    this.send("", "/anServer/schreiberCloseC");
  }

  public deckungOpenA(): void {
    this.send("", "/anServer/deckungOpenA");
  }

  public deckungOpenB(): void {
    this.send("", "/anServer/deckungOpenB");
  }

  public deckungOpenC(): void {
    this.send("", "/anServer/deckungOpenC");
  }

  public deckungCloseA(): void {
    this.send("", "/anServer/deckungCloseA");
  }

  public deckungCloseB(): void {
    this.send("", "/anServer/deckungCloseB");
  }

  public deckungCloseC(): void {
    this.send("", "/anServer/deckungCloseC");
  }

  public aufsichtSetA(value: number): void {
    this.send(String(value), "/anServer/aufsichtSetA");
  }

  public aufsichtSetB(value: number): void {
    this.send(String(value), "/anServer/aufsichtSetB");
  }

  public aufsichtSetC(value: number): void {
    this.send(String(value), "/anServer/aufsichtSetC");
  }

  public refreshAufsicht(): void {
    this.send("", "/anServer/refreshAufsicht");
  }

  private send(message: string, destination: string): void {
    this.stomp.publish({
      destination: destination,
      body: JSON.stringify(message),
      headers: {'content-type': 'application/json'}
    });
  }

}
