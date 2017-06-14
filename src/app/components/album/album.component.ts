import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Album } from '../../Album';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  moduleId: module.id,
  templateUrl: 'album.component.html'
})
export class AlbumComponent implements OnInit{
  id: string;
  album: Album;

  constructor(private service: SpotifyService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.map(params => params['id'])
      .subscribe((id) => {
        this.service.getAlbum(id)
          .subscribe(album => {
            this.album = album;
          })
      })
  }
}
