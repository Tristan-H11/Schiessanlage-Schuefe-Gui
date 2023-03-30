/**
 * DTO für den Schreiber, um Zähler, Treffer (kleiner, großer, treffer) und Sperrung mitzuteilen
 */
export class BahnDTO {
  public counter: number = 0;
  public shot: string = "";
  public closed: boolean = true;
  public alert: boolean = false;

  public constructor(data?: BahnDTO) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
