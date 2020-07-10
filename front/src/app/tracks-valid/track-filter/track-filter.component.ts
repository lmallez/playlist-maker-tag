import {Component, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../../../services/api.service";
import {Router} from "@angular/router";
import {SpArtist} from '../../../class/spotify';

@Component({
  selector: 'app-track-filter',
  templateUrl: './track-filter.component.html',
  styleUrls: ['./track-filter.component.scss']
})
export class TrackFilterComponent implements OnInit {
  @Input() aTags: string[] = []
  @Input() aArtists: string[] = []

  tags: {item_text: string, item_id: string}[] = []
  artists: {item_text: string, item_id: string}[] = []

  listTags$: Observable<{ tags: string[] }>;
  listArtists$: Observable<{ artists: SpArtist[] }>;

  dropdownSettings = {};

  constructor(private api: ApiService,
              private router: Router) { }

  ngOnInit() {
    if (this.aTags && this.aTags.length > 0) {
      this.tags.push.apply(this.tags, this.resolveTags(this.aTags))
    }
    if (this.aArtists && this.aArtists.length > 0) {
      this.api.artists(this.aArtists).subscribe(
          (data: {artists: SpArtist[]}) => this.artists = this.resolveArtists(data.artists)
      );
    }

    this.listTags$ = this.api.listTags();
    this.listArtists$ = this.api.listArtists();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      limitSelection: 10
    };
  }

  resolveTags(listTags: string[]): { item_text: string, item_id: string }[] {
    return listTags.map((x: string) => ({'item_text': x, 'item_id': x}))
  }

  resolveArtists(listArtists: SpArtist[]): { item_text: string, item_id: string }[] {
    return listArtists.map((x: SpArtist) => ({'item_text': x.name, 'item_id': x.id}))
  }


  navigate() {
    const tags = this.tags ? this.tags.map(x => x['item_id']) : null
    const artists = this.artists ? this.artists.map(x => x['item_id']) : null
    const params = {};
    if (null !== tags && tags.length > 0)
      params['tags'] = tags.join(', ')
    if (null !== artists && artists.length > 0)
      params['artists'] = artists.join(', ')
    console.log(params)
    this.router.navigate(
        ['/tracks'],
        {queryParams: params}
    ).then()
  }
}
