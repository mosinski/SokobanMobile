export class Crate {
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
    return "crate_" + options.join("_");
  }

  static load(game:any) {
    game.load.image('crate_beige', 'assets/sprites/crates/beige.png');
    game.load.image('crate_black', 'assets/sprites/crates/black.png');
    game.load.image('crate_brown', 'assets/sprites/crates/brown.png');
    game.load.image('crate_blue', 'assets/sprites/crates/blue.png');
    game.load.image('crate_gray', 'assets/sprites/crates/gray.png');
    game.load.image('crate_red', 'assets/sprites/crates/red.png');
    game.load.image('crate_purple', 'assets/sprites/crates/purple.png');
    game.load.image('crate_yellow', 'assets/sprites/crates/yellow.png');

    game.load.image('crate_dark_beige', 'assets/sprites/crates/dark_beige.png');
    game.load.image('crate_dark_black', 'assets/sprites/crates/dark_black.png');
    game.load.image('crate_dark_brown', 'assets/sprites/crates/dark_brown.png');
    game.load.image('crate_dark_blue', 'assets/sprites/crates/dark_blue.png');
    game.load.image('crate_dark_gray', 'assets/sprites/crates/dark_gray.png');
    game.load.image('crate_dark_red', 'assets/sprites/crates/dark_red.png');
    game.load.image('crate_dark_purple', 'assets/sprites/crates/dark_purple.png');
    game.load.image('crate_dark_yellow', 'assets/sprites/crates/dark_yellow.png');
  }
}
