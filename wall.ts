export class Wall {
  x:number = 0;
  y:number = 0;
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
