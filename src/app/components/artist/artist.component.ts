import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Artist } from '../../Artist';
import { Album } from '../../Album';

import { SpotifyService } from '../../services/spotify.service';

@Component({
  moduleId: module.id,
  selector: 'artist',
  templateUrl: 'artist.component.html'
})
export class ArtistComponent implements OnInit {
  id: string;
  artist: Artist;
  albums: Album[];

  constructor(private service: SpotifyService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        this.service.getToken()
          .subscribe(data => {
            this.service.getArtist(id, data.access_token)
              .subscribe(artist => {
                this.artist = artist;
              }),

              this.service.getAlbums(id, data.access_token)
                .subscribe(albums => {
                  console.log(albums.items)
                  this.albums = albums.items;
                })

          })
      })

  }
}
