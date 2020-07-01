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

  static load(game:any) {
    game.load.image('wall_beige', 'assets/sprites/walls/beige.png');
    game.load.image('wall_black', 'assets/sprites/walls/black.png');
    game.load.image('wall_brown', 'assets/sprites/walls/brown.png');
    game.load.image('wall_gray', 'assets/sprites/walls/gray.png');

    game.load.image('wall_round_beige', 'assets/sprites/walls/round_beige.png');
    game.load.image('wall_round_black', 'assets/sprites/walls/round_black.png');
    game.load.image('wall_round_brown', 'assets/sprites/walls/round_brown.png');
    game.load.image('wall_round_gray', 'assets/sprites/walls/round_gray.png');
  }
}
