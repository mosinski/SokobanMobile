import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Levels } from 'levels';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.page.html',
  styleUrls: ['./levels.page.scss'],
})
export class LevelsPage implements OnInit {
  public levels: Array<Object> = Levels;
  public level: any;

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

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
}
