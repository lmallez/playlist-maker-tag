import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {switchMap} from "rxjs/operators";
import {SpAlbum} from '../../class/spotify';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnDestroy {
  album$: Observable<{ album: SpAlbum }>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.album$ =  this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.api.album(params.get('id')))
    );
  }

  ngOnDestroy() {
    this.album$ = null;
  }
}
