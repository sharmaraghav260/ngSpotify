import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Artist } from '../Artist';


@Injectable()
export class SpotifyService {
  private searchUrl: string;
  private artistUrl: string;
  private albumsUrl: string;
  private albumUrl: string;

  // App ids
  private client_id: string = '4fc10a5b67254940bad34977d1ceb5ce';
  private client_secret: string = 'ca6159075f5748ab83aa4928856e59ec';
  //private token: string;

  constructor(private http: Http) {
  }

  getToken() {
    let headers = new Headers();
    let cor = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.client_id + ":" + this.client_secret));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append("Access-Control-Allow-Origin", "*");

    let params: URLSearchParams = new URLSearchParams();
    params.set('grant_type', 'client_credentials');
    let body = params.toString();

    return this.http.post('https://accounts.spotify.com/api/token', body, { headers: headers })
      .map(res => res.json());
  }

  searchMusic(str: string, type = 'artist', token: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    this.searchUrl = 'https://api.spotify.com/v1/search?query=' + str + '&offset=0&limit=20&type=' + type + '&market=US';
    return this.http.get(this.searchUrl, { headers: headers })
      .map((res: Response) => res.json())
  }

  getArtist(id: string, token: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    this.artistUrl = 'https://api.spotify.com/v1/artists/' + id;
    return this.http.get(this.artistUrl, { headers: headers })
      .map((res: Response) => res.json())
  }

  getAlbums(artistId: string, token: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    this.albumsUrl = 'https://api.spotify.com/v1/artists/' + artistId + '/albums/?limit=50&market=US';
    return this.http.get(this.albumsUrl, { headers: headers })
      .map((res: Response) => res.json())
  }

  getAlbum(id: string, token: string) {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    this.albumUrl = 'https://api.spotify.com/v1/albums/' + id;
    return this.http.get(this.albumUrl, { headers: headers })
      .map((res: Response) => res.json())
  }

}
