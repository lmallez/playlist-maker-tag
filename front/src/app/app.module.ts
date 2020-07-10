import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {TracksValidComponent} from "./tracks-valid/tracks-valid.component";
import {AlbumComponent} from "./album/album.component";
import {ArtistComponent} from "./artist/artist.component";
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {TagComponent} from "./tag/tag.component";
import {TrackComponent} from "./track/track.component";
import {TrackFilterComponent} from "./tracks-valid/track-filter/track-filter.component";
import {AlbumViewComponent} from "./utils/album-view/album-view.component";
import {ArtistViewComponent} from "./utils/artist-view/artist-view.component";
import {TrackTagListComponent} from "./utils/tag-list/track-tag-list.component";
import {TrackListComponent} from "./utils/track-list/track-list.component";
import {TrackValidComponent} from "./utils/track-valid/track-valid.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ArtistTracksAddedComponent} from "./utils/artist-view/artist-tracks-added/artist-tracks-added.component";
import {ArtistInfosComponent} from "./utils/artist-view/artist-infos/artist-infos.component";
import {ArtistLinkComponent} from "./utils/artist-link/artist-link.component";
import {AlbumTracksComponent} from "./utils/album-view/album-tracks/album-tracks.component";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {TagTracksComponent} from './tag/tag-tracks/tag-tracks.component';
import { ArtistTracksTopComponent } from './utils/artist-view/artist-tracks-top/artist-tracks-top.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    AlbumTracksComponent,
    AlbumViewComponent,
    ArtistComponent,
    ArtistInfosComponent,
    ArtistLinkComponent,
    ArtistTracksAddedComponent,
    ArtistViewComponent,
    SearchBarComponent,
    TagComponent,
    TrackTagListComponent,
    TrackComponent,
    TrackFilterComponent,
    TrackListComponent,
    TrackValidComponent,
    TracksValidComponent,
    TagTracksComponent,
    ArtistTracksTopComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
