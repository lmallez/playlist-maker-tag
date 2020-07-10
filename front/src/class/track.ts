import {SpTrack} from './spotify';

export class TrackData {
    id: string;
    added: boolean;
    tags: string[];
}

export class Track {
    data: TrackData;
    spotify: SpTrack;
    id: string;
}
