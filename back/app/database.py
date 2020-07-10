#!/usr/bin/env python3
import os
import sqlite3


class Select:
    def __init__(self, fields, table, joins=None, where=None, args=None):
        if joins is None:
            joins = []
        self.fields = fields
        self.table = table
        self.joins = joins if joins else []
        self.wheres = where if where else []
        self.args = args if args else []

    def join(self, table, on):
        self.joins.append([table, on])

    def where(self, close, args=None):
        self.wheres.append(close)
        if args:
            self.args += args

    def arg(self, arg):
        self.args.append(arg)

    def str(self):
        return "SELECT {} FROM {} {} {}".format(
            ", ".join(self.fields),
            self.table,
            "" if len(self.joins) == 0 else " ".join(["LEFT JOIN {} ON {}".format(x[0], x[1]) for x in self.joins]),
            "" if len(self.wheres) == 0 else "WHERE " + " AND ".join(self.wheres),
        )


class Database:
    def __init__(self, db_path):
        if not os.path.exists(db_path):
            open(db_path, 'a').close()
            self.conn = sqlite3.connect(db_path)
            self.create()
        else:
            self.conn = sqlite3.connect(db_path)

    def create(self):
        c = self.conn.cursor()
        c.execute('''CREATE TABLE tracks (track_id text, release_date date)''')
        c.execute('''CREATE TABLE tracks_artists (track_id text, artist_id text)''')
        c.execute('''CREATE TABLE tracks_tags (tag text, spotify_id text)''')
        c.execute('''CREATE TABLE artists_tags (tag text, spotify_id text)''')
        c.close()

    def track_add(self, track_id, release_date, artists_id):
        c = self.conn.cursor()
        c.execute('''INSERT INTO tracks VALUES (?, ?)''', (track_id, release_date,))
        for artist_id in artists_id:
            c.execute('''INSERT INTO tracks_artists VALUES (?, ?)''', (track_id, artist_id,))
        self.conn.commit()
        c.close()

    def track_delete(self, track_id):
        c = self.conn.cursor()
        c.execute('''DELETE FROM tracks WHERE track_id=?''', (track_id,))
        c.execute('''DELETE FROM tracks_artists WHERE track_id=?''', (track_id,))
        self.conn.commit()
        c.close()

    def track_is_added(self, track_id):
        c = self.conn.cursor()
        resp = c.execute('''SELECT track_id FROM tracks WHERE track_id=?''', (track_id,)).fetchall()
        c.close()
        return len(resp) > 0

    def track_get_tags(self, spotify_id: str):
        if not self.track_is_added(spotify_id):
            return []
        c = self.conn.cursor()
        resp = c.execute('''SELECT DISTINCT tag FROM tracks_tags WHERE spotify_id=? ORDER BY tag''', (spotify_id,)).fetchall()
        c.close()
        return [resp[0] for resp in resp]

    def track_add_tag(self, tag: str, spotify_id: str):
        if not self.track_is_added(spotify_id):
            raise
        c = self.conn.cursor()
        c.execute('''INSERT INTO tracks_tags VALUES (?, ?)''', (tag, spotify_id,))
        self.conn.commit()
        c.close()

    def track_delete_tag(self, tag: str, spotify_id: str):
        if not self.track_is_added(spotify_id):
            raise
        c = self.conn.cursor()
        c.execute('''DELETE FROM tracks_tags WHERE tag=? AND spotify_id=?''', (tag, spotify_id,))
        self.conn.commit()
        c.close()

    def tracks_by_tag(self, tag: str):
        c = self.conn.cursor()
        resp = c.execute('''SELECT DISTINCT spotify_id FROM tracks_tags LEFT JOIN tracks_artists ON tracks_tags.spotify_id = tracks_artists.track_id WHERE tag=? AND tracks_artists.track_id NOT NULL''', (tag,)).fetchall()
        c.close()
        return [resp[0] for resp in resp]

    def tracks_added(self, tags: list = None, artists: list = None):
        c = self.conn.cursor()
        r = Select(['t.track_id'], 'tracks t')
        if tags:
            r.join('tracks_tags tt', 'tt.spotify_id = t.track_id')
            r.where('tt.tag IN ({})'.format(', '.join('?'*len(tags))), tags)
        if artists:
            r.join('tracks_artists ta', 'ta.track_id = t.track_id')
            r.where('ta.artist_id IN ({})'.format(', '.join('?'*len(artists))), artists)
        resp = c.execute(r.str(), r.args).fetchall()
        c.close()
        return [resp[0] for resp in resp]

    def tracks_by_artist(self, artist_id: str):
        c = self.conn.cursor()
        resp = c.execute('''SELECT DISTINCT track_id FROM tracks_artists WHERE artist_id=?''', (artist_id,)).fetchall()
        c.close()
        return [resp[0] for resp in resp]

    def get_available_tags(self):
        c = self.conn.cursor()
        resp = c.execute('''SELECT DISTINCT tag FROM tracks_tags''').fetchall()
        c.close()
        return [resp[0] for resp in resp]

    def get_available_artists(self):
        c = self.conn.cursor()
        resp = c.execute('''SELECT DISTINCT artist_id FROM tracks_artists''').fetchall()
        c.close()
        return [resp[0] for resp in resp]


if __name__ == '__main__':
    t = Database('database.db')
    t.create()

