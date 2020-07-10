import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Track} from '../../class/track';

@Component({
  selector: 'app-tracks-valid',
  templateUrl: './tracks-valid.component.html',
  styleUrls: ['./tracks-valid.component.scss']
})
export class TracksValidComponent implements OnInit {
  tracks$: Observable<{ tracks: Track[] }>;
  paramTags: string[];
  paramArtists: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.paramTags = params.get('tags') ? params.get('tags').split(', ') : [];
      this.paramArtists = params.get('artists') ? params.get('artists').split(', ') : [];
      this.tracks$ = this.api.tracksAdded(this.paramTags, this.paramArtists)
    });
  }
}
