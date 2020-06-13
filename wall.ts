export class Wall {
  x:integer = 0;
  y:integer = 0;
  color:string = "brown";
  type:string = "";

  constructor(fields?:any) {
    if (fields!=undefined) {
      for (const f in fields) {
        this[f] = fields[f];
      }
    }
  }

  public sprite() {
    const options = [this.type, this.color].filter(Boolean);
    return "wall_" + options.join("_");
  }
}
