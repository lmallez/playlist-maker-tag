import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-tag-tracks',
  templateUrl: './tag-tracks.component.html',
  styleUrls: ['./tag-tracks.component.scss']
})
export class TagTracksComponent implements OnInit, OnDestroy {
  @Input() tagId: string;
  tracks$: Observable<{ tracks: any[] }>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.tracks$ = this.api.tagTracks(this.tagId)
  }

  ngOnDestroy() {
    this.tracks$ = null;
  }
}
