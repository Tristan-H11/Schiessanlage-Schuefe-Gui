import {Subject} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {BahnDTO} from "./bahn-d-t-o";

export abstract class AbstractSchreiber {

  public form: FormGroup = new FormGroup({
    'message': new FormControl()
  })

  data: BahnDTO = new BahnDTO();

  public disconnect$: Subject<boolean> = new Subject();

  public isOpen(): boolean {
    return this.data.closed === 0;
  }

  public isClosedBySchreiber(): boolean {
    return this.data.closed === 1;
  }

  public isClosedByDeckung(): boolean {
    return this.data.closed === 2
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

  public disconnect(): void{
    this.disconnect$.next(true);
  }
}
