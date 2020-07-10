import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Observable, of} from 'rxjs';
import {TrackData} from '../../../class/track';

@Component({
  selector: 'app-track-valid',
  templateUrl: './track-valid.component.html',
  styleUrls: ['./track-valid.component.scss']
})
export class TrackValidComponent implements OnInit {
  @Input() trackData: TrackData;
  data$: Observable<TrackData>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.data$ = this.trackData
        ? of(this.trackData)
        : this.api.trackAdded(this.trackData.id);
  }

  setValid(valid: boolean) {
    if (valid) {
      this.data$ = this.api.trackAddedAdd(this.trackData.id)
    } else {
      this.data$ = this.api.trackAddedRm(this.trackData.id)
    }
  }
}
