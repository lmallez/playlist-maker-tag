import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {switchMap} from "rxjs/operators";
import {Track} from '../../class/track';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit, OnDestroy {
  track$: Observable<{track: Track}>;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private api: ApiService
  ) {}

  ngOnInit() {
    this.track$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) => this.api.track(params.get('id')))
    );
  }

  ngOnDestroy() {
    this.track$ = null;
  }
}
