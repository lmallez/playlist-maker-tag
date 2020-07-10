import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  response$: Observable<any>;
  focus = false;

  constructor(private api: ApiService,
              private router: Router) {
  }

  ngOnInit() {
  }

  search(param: string) {
    if (param.length == 0) {
      this.response$ = null;
      return;
    }
    this.response$ = this.api.search(param);
  }

  linkTo(dest: any[]) {
    this.router.navigate(dest).then()
    this.response$ = null
  }

  ngOnDestroy() {
    this.response$ = null;
  }
}
