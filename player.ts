export class Player {
  x:number = 0;
  y:number = 0;

  constructor(fields?:any) {
    if (fields!=undefined) {
      for (const f in fields) {
        this[f] = fields[f];
      }
    }
  }

  public sprite() {
    return "player"
  }

  static load(game:any) {
    game.load.spritesheet('player', 'assets/sprites/player.png', 42, 59);
  }
}
