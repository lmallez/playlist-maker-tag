import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Track} from '../../../class/track';
import {Router} from "@angular/router";

@Component({
    selector: 'app-track-list',
    templateUrl: './track-list.component.html',
    styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent {
    @Input() tracks: Track[];
    @Input() valid = true;
    @Input() sort = true;

    constructor(private router: Router) {
    }

    albumUrl = `${environment.self_url}/album/`;

    sortedTracks() {
        if (!this.sort) {
            return this.tracks;
        }
        return this.tracks;
        // return this.tracks.sort(
        //     // TODO : refactor this
        //     (a: Track, b: Track) => {
        //       if (a.spotify.album.release_date === b.spotify.album.release_date) {
        //         if (a.spotify.album.name === b.spotify.album.name) {
        //           return a.spotify.track_number - b.spotify.track_number;
        //         }
        //         return a.spotify.album.name > b.spotify.album.name ? 1 : -1;
        //       }
        //       return a.spotify.album.release_date > b.spotify.album.release_date ? -1 : 1;
        //     }
        // );
    }

    navigate(albumId: string) {
        this.router.navigate(['/album', albumId]).then();
    }
}
