import {Component, Input, OnInit} from '@angular/core';
import {SpArtist} from '../../../../class/spotify';

@Component({
  selector: 'app-artist-infos',
  templateUrl: './artist-infos.component.html',
  styleUrls: ['./artist-infos.component.scss']
})
export class ArtistInfosComponent {
  @Input() artist: SpArtist;

  constructor() { }
}
