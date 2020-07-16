import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl: string = 'https://www.googleapis.com/youtube/v3';
  private apiKey: string = 'AIzaSyDUkWLE0G6PaEJgBr_6bX-AbGawA8iPBRk';
  private playlist: string = 'UUuaPTYj15JSkETGnEseaFFg';

  private nextPageToken: string = "";

  constructor(public http: HttpClient) { }

  /*getVideos(){
    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams();

    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playlist);
    params.set('key', this.apiKey);

    if(this.nextPageToken){
      params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, { params }).pipe(map( res => {
      console.log(res);
      this.nextPageToken = res.nextPageToken;

      let videos: any[] = [];
      for (let video of res.items) {
        let snippet = video.snippet;
        videos.push(snippet);
      }

      return videos;
    }));
  }*/

  getVideos() {

    const url = `${ this.youtubeUrl }/playlistItems`;

    const params = new HttpParams().set('part', 'snippet').set('maxResults', '20').set('playlistId', this.playlist ).set('key', this.apiKey ).set('pageToken', this.nextPageToken );

    return this.http.get<YoutubeResponse>( url, { params } ).pipe(map( resp => {
      this.nextPageToken = resp.nextPageToken;
      return resp.items;
    }), map( items => items.map( video => video.snippet )));

  }
}