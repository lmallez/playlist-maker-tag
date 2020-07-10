import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Track} from '../../../../class/track';
import {ApiService} from '../../../../services/api.service';

@Component({
  selector: 'app-artist-tracks-top',
  templateUrl: './artist-tracks-top.component.html',
  styleUrls: ['./artist-tracks-top.component.scss']
})
export class ArtistTracksTopComponent implements OnInit, OnDestroy {
  @Input() artistId: string;
  tracks$: Observable<{ id: string, tracks: Track[] }>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.tracks$ = this.api.artistTracks(this.artistId);
  }

  ngOnDestroy() {
    this.tracks$ = null;
  }
}
