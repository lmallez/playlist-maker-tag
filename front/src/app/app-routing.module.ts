import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TrackComponent} from './track/track.component';
import {AlbumComponent} from './album/album.component';
import {TagComponent} from './tag/tag.component';
import {TracksValidComponent} from './tracks-valid/tracks-valid.component';
import {ArtistComponent} from './artist/artist.component';

const routes: Routes = [
  { path: 'album/:id', component: AlbumComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: 'track/:id', component: TrackComponent },
  { path: 'tag/:id', component: TagComponent },
  { path: 'tracks', component: TracksValidComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
