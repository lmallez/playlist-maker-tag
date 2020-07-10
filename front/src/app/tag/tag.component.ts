import {Component, OnDestroy, OnInit} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit, OnDestroy {
  tag$: Observable<{ id: string }>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.tag$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.api.tag(params.get('id')))
    );
  }

  ngOnDestroy() {
    this.tag$ = null;
  }
}
