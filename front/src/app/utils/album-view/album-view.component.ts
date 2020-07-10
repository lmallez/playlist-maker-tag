import {Component, Input} from '@angular/core';
import {SpAlbum} from '../../../class/spotify';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.scss']
})
export class AlbumViewComponent {
  @Input() selectedTrackId: string = null;
  @Input() album: SpAlbum;
}
