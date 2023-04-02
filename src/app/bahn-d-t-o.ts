/**
 * DTO für den Schreiber, um Zähler, Treffer (kleiner, großer, treffer) und Sperrung mitzuteilen
 */
export class BahnDTO {
  public counter: number = 0;
  public shot: string = "";

  // 0 = offen, 1 = schreiber geschlossen, 2 = deckung geschlossen
  public closed: number = 1;
  public alert: boolean = false;

  public constructor(data?: BahnDTO) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
