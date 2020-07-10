import {Component, Input} from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-artist-link',
  templateUrl: './artist-link.component.html',
  styleUrls: ['./artist-link.component.scss']
})
export class ArtistLinkComponent {
  @Input() artist: any;
  url = environment.self_url + '/artist/'
}
