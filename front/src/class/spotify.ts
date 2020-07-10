export class SpArtist {
    id: string;
    name: string;
    images: any;
}

export class SpTrack {
    name: string;
    artists: SpArtist[];
    album: SpAlbum;
    track_number: number;
}

export class SpAlbum {
    images: any;
    name: string;
    artists: any;
    release_date: any;
    id: string;
}
