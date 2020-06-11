import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-options',
  templateUrl: './options.page.html',
  styleUrls: ['./options.page.scss'],
})
export class OptionsPage implements OnInit {
  volume = {
    music: 80,
    sounds: 80
  }

  constructor(
    private nativeAudio: NativeAudio
  ) {}

  ngOnInit() {
  }

  saveForm() {
    this.nativeAudio.setVolumeForComplexAsset('menu', this.volume.music/100)
  }
}
