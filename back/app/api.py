#!/usr/bin/env python3
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request
from redis import Redis

from provider import Provider

app = Flask(__name__)
CORS(app)
redis = Redis(host='redis', port=6379)


@cross_origin()
@app.route('/tracks/<track_id>/added/true', methods=['POST'])
def track_add(track_id):
    return Provider().track_added_add(track_id)


@cross_origin()
@app.route('/tracks/<track_id>/added/false', methods=['POST'])
def track_delete(track_id):
    return Provider().track_added_rm(track_id)


@cross_origin()
@app.route('/tracks/<track_id>/added', methods=["GET"])
def track_is_added(track_id):
    return Provider().track_data(track_id)


@cross_origin()
@app.route("/tracks/<track_id>/tags", methods=['GET'])
def get_tags(track_id):
    if not Provider().track_added(track_id):
        return 'track not added', 401
    return Provider().track_data(track_id)


@cross_origin()
@app.route("/tracks/<track_id>/tags/<tag>", methods=['DELETE'])
def delete_tag(track_id, tag):
    if not Provider().track_added(track_id):
        return 'track not added', 401
    return Provider().track_tags_rm(track_id, tag)


@cross_origin()
@app.route("/tracks/<track_id>/tags/<tag>", methods=['POST'])
def add_tag(track_id, tag):
    if not Provider().track_added(track_id):
        return 'track not added', 401
    return Provider().track_tags_add(track_id, tag)


@cross_origin()
@app.route("/tracks/<track_id>", methods=['GET'])
def get_track(track_id):
    return {
        "id": track_id,
        "track": Provider().track(track_id)
    }


@cross_origin()
@app.route("/tracks")
def get_tracks():
    ids = request.args.get('ids')
    if not ids:
        return jsonify('invalid ids'), 400
    tracks_ids = ids.split(', ')
    return jsonify({
        "tracks": Provider().tracks(tracks_ids),
    })


@cross_origin()
@app.route("/tracks/added")
def get_tracks_added():
    tags = request.args.get('tags').split(', ') if request.args.get('tags') else None
    artists = request.args.get('artists').split(', ') if request.args.get('artists') else None
    return jsonify({
        "tracks": Provider().tracks_filtered(tags, artists),
    })


@cross_origin()
@app.route("/tags/<tag>/tracks", methods=['GET'])
def get_tag_tracks(tag):
    return jsonify({
        "id": tag,
        "tracks": Provider().tag_tracks(tag),
    })


@cross_origin()
@app.route("/tags/<tag>", methods=['GET'])
def get_tag(tag):
    # TODO : complete or remove this
    return jsonify({
        "id": tag,
    })


@cross_origin()
@app.route("/albums/<album_id>", methods=['GET'])
def get_album(album_id):
    return jsonify({
        "id": album_id,
        "album": Provider().spotify.album(album_id),
    })


@cross_origin()
@app.route("/albums/<album_id>/tracks", methods=['GET'])
def album_tracks(album_id):
    return jsonify({
        "id": album_id,
        "tracks": Provider().album_tracks(album_id),
    })


@cross_origin()
@app.route("/artists/<artist_id>", methods=['GET'])
def get_artist(artist_id):
    return jsonify({
        "id": artist_id,
        "artist": Provider().spotify.artist(artist_id),
    })


@cross_origin()
@app.route("/artists")
def get_artists():
    ids = request.args.get('ids')
    if not ids:
        return jsonify('invalid ids'), 400
    artists_ids = ids.split(', ')
    return jsonify({
        "artists": Provider().artists(artists_ids),
    })


@cross_origin()
@app.route("/artists/<artist_id>/tracks")
def get_artist_tracks(artist_id):
    return jsonify({
        "id": artist_id,
        "tracks": Provider().artist_tracks(artist_id),
    })


@cross_origin()
@app.route("/artists/<artist_id>/tracks/added", methods=['GET'])
def get_artist_added_tracks(artist_id):
    return jsonify({
        "id": artist_id,
        "tracks": Provider().tracks_artist(artist_id),
    })


@cross_origin()
@app.route("/artist/<artist_id>/albums", methods=['GET'])
def get_artist_albums(artist_id):
    return jsonify({
        "id": artist_id,
        "album": Provider().spotify.artist_albums(artist_id)
    })


@cross_origin()
@app.route("/search", methods=['GET'])
def search():
    q = request.args.get('q')
    return jsonify(Provider().spotify.search(q, 10, type="album,track,artist"))


@cross_origin()
@app.route("/list/tags", methods=['GET'])
def get_available_tags():
    return jsonify({
        "tags": Provider().tags_added()
    })


@cross_origin()
@app.route("/list/artists", methods=['GET'])
def get_available_artists():
    return jsonify({
        "artists": Provider().artists_added()
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=False)
