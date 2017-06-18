import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SpotifyService } from '../../services/spotify.service';

import { Artist } from '../../Artist';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html',
  providers: [
    SpotifyService
  ]
})
export class HomeComponent {
  searchStr: string;
  searchRes: Artist[];

  constructor(private service: SpotifyService) {

  }
  searchMusic() {
    this.service.getToken()
      .subscribe(res => this.service.searchMusic(this.searchStr, "artist", res.access_token)
        .subscribe(res => {
          this.searchRes = res.artists.items;
        })
      );
    console.log(this.searchStr);
  }
}
