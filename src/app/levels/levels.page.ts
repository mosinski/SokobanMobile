import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Levels } from 'levels';

declare let Phaser;

let that;
let game;
let player;
let aliens;
let walls;

@Component({
  selector: 'app-levels',
  templateUrl: './levels.page.html',
  styleUrls: ['./levels.page.scss'],
})
export class LevelsPage implements OnInit {
  public levels: Array<Object> = Levels;
  public level: any;

  public initialize: boolean;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-level',
      { preload: this.preload, create: this.create, update: this.update, render: this.render });

    that = Object.create(this.constructor.prototype);
  }

  ngOnInit() {
    this.level = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.level) this.loadLevel();
  }

  loadLevel() {
    fetch('./assets/data/' + this.level)
      .then(res => res.json())
      .then(json => {
        console.log(json);
      });
  }

  preload() {
    game.load.image('sprites', 'assets/sprites.svg');
  }

  create() {
    game.add.image(0, 0, 'sprites').setOrigin(0);
  }

  update() {
  }

  render() {
  }
}
