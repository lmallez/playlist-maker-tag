import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ApiService} from "../../../services/api.service";
import {TrackData} from '../../../class/track';
import {environment} from '../../../environments/environment';
import {Router} from "@angular/router";

@Component({
  selector: 'app-track-tag-list',
  templateUrl: './track-tag-list.component.html',
  styleUrls: ['./track-tag-list.component.scss']
})
export class TrackTagListComponent implements OnInit {
  @Input() trackData: TrackData;
  data$: Observable<TrackData>;

  url = `${environment.self_url}/tag/`;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.data$ = this.trackData
        ? of(this.trackData)
        : this.api.trackTags(this.trackData.id);
  }

  removeTag(tag: string) {
    this.data$ = this.api.trackTagsRm(this.trackData.id, tag);
  }

  addTag(tag: string) {
    this.data$ = this.api.trackTagsAdd(this.trackData.id, tag);
  }

  navigate(tag: string) {
    this.router.navigate(['/tag', tag]);
  }
}
