export class Endpoint {
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
    return "endpoint_" + options.join("_");
  }

  static load(game:any) {
    game.load.image('endpoint_beige', 'assets/sprites/endpoints/beige.png');
    game.load.image('endpoint_black', 'assets/sprites/endpoints/black.png');
    game.load.image('endpoint_brown', 'assets/sprites/endpoints/brown.png');
    game.load.image('endpoint_blue', 'assets/sprites/endpoints/blue.png');
    game.load.image('endpoint_gray', 'assets/sprites/endpoints/gray.png');
    game.load.image('endpoint_red', 'assets/sprites/endpoints/red.png');
    game.load.image('endpoint_purple', 'assets/sprites/endpoints/purple.png');
    game.load.image('endpoint_yellow', 'assets/sprites/endpoints/yellow.png');
  }
}
