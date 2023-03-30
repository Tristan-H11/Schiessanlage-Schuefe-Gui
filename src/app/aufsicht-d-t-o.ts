export class AufsichtDTO {
  public a: number = 0;
  public b: number = 0;
  public c: number = 0;

  public constructor(data?: AufsichtDTO) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
