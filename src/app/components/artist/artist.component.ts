import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Artist } from '../../../Artist';
import { Album } from '../../../Album';

import { SpotifyService } from '../../services/spotify.service';

@Component({
  moduleId: module.id,
  templateUrl: 'artist.component.html'
})
export class ArtistComponent implements OnInit {
  id: string;
  artist: Artist;
  albums: Album[];

  constructor(private service: SpotifyService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.map(params => params['id'])
      .subscribe((id) => {
        this.service.getArtist(id)
          .subscribe(artist => {
            this.artist = artist;
          })

        this.service.getAlbums(id)
          .subscribe(albums => {
            this.albums = albums.items;
          })
      })
  }
}
