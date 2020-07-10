import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {Track, TrackData} from '../class/track';
import {SpAlbum, SpArtist} from '../class/spotify';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  track(id: string) {
    return this.http.get<{ id: string, track: Track }>(`${environment.api_url}/tracks/${id}`);
  }

  trackAdded(id: string) {
    return this.http.get<TrackData>(`${environment.api_url}/tracks/${id}/added`);
  }

  trackAddedAdd(id: string) {
    return this.http.post<TrackData>(`${environment.api_url}/tracks/${id}/added/true`, []);
  }

  trackAddedRm(id: string) {
    return this.http.post<TrackData>(`${environment.api_url}/tracks/${id}/added/false`, []);
  }

  trackTags(id: string) {
    return this.http.get<TrackData>(`${environment.api_url}/tracks/${id}/tags`);
  }

  trackTagsAdd(id: string, tag: string) {
    return this.http.post<TrackData>(`${environment.api_url}/tracks/${id}/tags/${tag}`, []);
  }

  trackTagsRm(id: string, tag: string) {
    return this.http.delete<TrackData>(`${environment.api_url}/tracks/${id}/tags/${tag}`);
  }

  tracks(ids: string[]) {
    return this.http.get<{ tracks: Track[] }>(`${environment.api_url}/tracks`, {params: {ids}});
  }

  tracksAdded(tags: string[] = [], artists: string[] = []) {
    const params = {tags: null, artists: null};
    if (tags) {
      params.tags = tags.join(', ');
    }
    if (artists) {
      params.artists = artists.join(', ');
    }
    return this.http.get<{ tracks: Track[] }>(`${environment.api_url}/tracks/added`, {params});
  }

  tag(tag: string) {
    return this.http.get<{id: string}>(`${environment.api_url}/tags/${tag}`);
  }

  tagTracks(tag: string) {
    return this.http.get<{id: string, tracks: Track[]}>(`${environment.api_url}/tags/${tag}/tracks`);
  }

  album(albumId: string) {
    return this.http.get<{album: SpAlbum}>(`${environment.api_url}/albums/${albumId}`);
  }

  albumTracks(albumId: string) {
    return this.http.get<{id: string, tracks: Track[]}>(`${environment.api_url}/albums/${albumId}/tracks`);
  }

  artist(artistId: string) {
    return this.http.get<{artist: SpArtist}>(`${environment.api_url}/artists/${artistId}`);
  }

  artists(ids: string[]) {
    return this.http.get<{ artists: SpArtist[] }>(`${environment.api_url}/artists`, {params: {ids}});
  }

  artistTracks(artistId: string) {
    return this.http.get<{id: string, tracks: Track[]}>(`${environment.api_url}/artists/${artistId}/tracks`);
  }

  artistTracksAdded(artistId: string) {
    return this.http.get<{id: string, tracks: Track[]}>(`${environment.api_url}/artists/${artistId}/tracks/added`);
  }

  artistAlbums(artistId: string) {
    return this.http.get<{ id: string, albums: SpAlbum[] }>(`${environment.api_url}/artists/${artistId}/albums`);
  }

  search(query: string) {
    return this.http.get<{ albums: SpAlbum[], artists: [], tracks: []}>(`${environment.api_url}/search`, {params: {q: query}});
  }

  listTags() {
    return this.http.get<{ tags: string[] }>(`${environment.api_url}/list/tags`);
  }

  listArtists() {
    return this.http.get<{ artists: SpArtist[] }>(`${environment.api_url}/list/artists`);
  }
}
