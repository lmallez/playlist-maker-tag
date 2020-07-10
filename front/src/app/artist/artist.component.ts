import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {SpArtist} from '../../class/spotify';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit, OnDestroy {
  artist$: Observable<{ artist: SpArtist }>;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private api: ApiService
  ) {}

  ngOnInit() {
    this.artist$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
            this.api.artist(params.get('id')))
    );
  }

  ngOnDestroy() {
    this.artist$ = null;
  }
}
