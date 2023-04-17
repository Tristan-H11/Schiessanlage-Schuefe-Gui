import {BahnDTO} from "./bahn-d-t-o";
import {Subject} from "rxjs";

export abstract class AbstractDeckung {

  data: BahnDTO = new BahnDTO();

  public disconnect$: Subject<boolean> = new Subject();

  public showShotButtons: boolean = false;

  public getBackgroundColorClass(): string {
    if (this.isOpen()) {
      return "bg-pastel-green"
    }
    return "bg-pastel-red";
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
}
