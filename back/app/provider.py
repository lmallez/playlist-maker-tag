#!/usr/bin/env python3
from spotipy import Spotify, SpotifyClientCredentials
from database import Database


class Provider:
    def __init__(self):
        self.database = Database('./database.db')
        self.spotify = Spotify(client_credentials_manager=SpotifyClientCredentials())

    @staticmethod
    def __build_track(track_id, spotify, data):
        return {
            'id': track_id,
            'spotify': spotify,
            'data': data,
        }

    def _build_sp_tracks(self, sp_tracks):
        return [
            self.__build_track(sp_track['id'], sp_track, self.track_data(sp_track['id'])) for sp_track in sp_tracks
        ]

    def track(self, track_id: str):
        return self.__build_track(
            track_id,
            self.spotify.track(track_id),
            self.track_data(track_id),
        )

    def tracks(self, track_ids: []):
        if len(track_ids) == 0:
            return []
        sp_tracks = []
        for i in range(0, len(track_ids) // 50 + (1 if len(track_ids) % 50 > 0 else 0)):
            sp_tracks += self.spotify.tracks(track_ids[50 * i: 50 * (i + 1) - 1])['tracks']
        sp_tracks.sort(key=lambda x: (x['album']['release_date'], x['album']['name'], x['track_number']))
        return self._build_sp_tracks(sp_tracks)

    def artists(self, artists_ids: []):
        if len(artists_ids) == 0:
            return []
        sp_artists = []
        for i in range(0, len(artists_ids) // 50 + (1 if len(artists_ids) % 50 > 0 else 0)):
            sp_artists += self.spotify.artists(artists_ids[50 * i: 50 * (i + 1) - 1])['artists']
        sp_artists.sort(key=lambda x: (x['name'], x['name']))
        return sp_artists

    def tracks_filtered(self, tags=None, artist_ids=None):
        tracks_ids = self.database.tracks_added(tags, artist_ids)
        return self.tracks(tracks_ids)

    def tag_tracks(self, tag: str):
        tracks_ids = self.database.tracks_by_tag(tag)
        return self.tracks(tracks_ids)

    def tracks_artist(self, artist_id: str):
        tracks_ids = self.database.tracks_by_artist(artist_id)
        return self.tracks(tracks_ids)

    def track_added(self, track_id: str):
        return self.database.track_is_added(track_id)

    def _track_tags(self, track_id: str):
        return self.database.track_get_tags(track_id)

    def track_data(self, track_id: str):
        return {
            'id': track_id,
            'added': self.track_added(track_id),
            'tags': self._track_tags(track_id),
        }

    def track_added_add(self, track_id: str):
        track = self.spotify.track(track_id)
        artist_ids = [artist['id'] for artist in track['artists']]
        self.database.track_add(track_id, track['album']['release_date'], artist_ids)
        return self.track_data(track_id)

    def track_added_rm(self, track_id: str):
        self.database.track_delete(track_id)
        return self.track_data(track_id)

    def track_tags_add(self, track_id: str, tag: str):
        self.database.track_add_tag(tag, track_id)
        return self.track_data(track_id)

    def track_tags_rm(self, track_id: str, tag: str):
        self.database.track_delete_tag(tag, track_id)
        return self.track_data(track_id)

    def album_tracks(self, album_id):
        tracks = self.spotify.album_tracks(album_id)['items']
        return self._build_sp_tracks(tracks)

    def artist_tracks(self, artist_id):
        tracks = self.spotify.artist_top_tracks(artist_id)['tracks']
        return self._build_sp_tracks(tracks)

    def artists_added(self):
        artist_ids = self.database.get_available_artists()
        artists = []
        for i in range(0, len(artist_ids) // 50 + (1 if len(artist_ids) % 50 != 0 else 0)):
            artists += self.spotify.artists(artist_ids[50 * i: 50 * (i + 1) - 1])['artists']
        return sorted(artists, key=lambda x: x['name'])

    def tags_added(self):
        return self.database.get_available_tags()
