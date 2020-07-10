import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Track} from '../../../../class/track';

@Component({
  selector: 'app-artist-tracks-added',
  templateUrl: './artist-tracks-added.component.html',
  styleUrls: ['./artist-tracks-added.component.scss']
})
export class ArtistTracksAddedComponent implements OnInit, OnDestroy {
  @Input() artistId: string;
  tracks$: Observable<{ id: string, tracks: Track[] }>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.tracks$ = this.api.artistTracksAdded(this.artistId);
  }

  ngOnDestroy() {
    this.tracks$ = null;
  }
}
