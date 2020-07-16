import { Component, OnInit } from '@angular/core';
import { YoutubeService } from "./../../services/youtube.service";
import { Video } from '../../models/youtube.models';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSeleccionado: any;

  constructor(public youtubeService: YoutubeService) { 
    this.youtubeService.getVideos().subscribe(videos => {
      console.log(videos);
      this.videos = videos;
    });
  }

  ngOnInit(): void {
  }

  verVideo(video: any){
    this.videoSeleccionado = video;
    $('#modalVideo').modal();
  }

  cerrarModal(){
    this.videoSeleccionado = null;
    $('#modalVideo').modal('hide');
  }

  cargarMasVideos(){
    this.youtubeService.getVideos().subscribe(videos => {
      console.log(videos);
      this.videos.push.apply(this.videos, videos);
    });
  }

}
