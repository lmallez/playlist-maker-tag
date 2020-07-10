import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {Observable} from "rxjs";
import {Track} from '../../../../class/track';
import {SpAlbum} from '../../../../class/spotify';

@Component({
  selector: 'app-album-tracks',
  templateUrl: './album-tracks.component.html',
  styleUrls: ['./album-tracks.component.scss']
})
export class AlbumTracksComponent implements OnInit, OnDestroy {
  @Input() album: SpAlbum;
  @Input() selectedTrackId: string = null;

  albumTracks$: Observable<{id: string, tracks: Track[]}>;
  albumArtistsIds: any;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.albumTracks$ = this.api.albumTracks(this.album.id);
    this.albumArtistsIds = this.album.artists.map(artist => artist.id);
  }

  ngOnDestroy() {
    this.albumTracks$ = null;
  }
}
