import {Component, Input, OnInit} from '@angular/core';
import {SpArtist} from '../../../class/spotify';

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.scss']
})
export class ArtistViewComponent {
  @Input() artist: SpArtist;

  constructor() { }
}
