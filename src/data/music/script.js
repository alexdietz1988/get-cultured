import { parse } from '@vanillaes/csv';
import albumsUnparsed from './albums.js';

const albumsParsed = parse(albumsUnparsed);
const artists = [];
const albums = [];

for (let i = 2; i < albumsParsed.length; i++) {
    albums.push({
        rank: parseInt(albumsParsed[i][0]),
        title: albumsParsed[i][1],
        year: parseInt(albumsParsed[i][3]),
        artist: albumsParsed[i][4],
        genres: albumsParsed[i][5].split(','),
        subgenres: albumsParsed[i][6].split(',')
    })
}

for (let album of albums) {
    let looking = true;
    const albumEntry = `${album.title} (${album.year}, #${album.rank})`;
    for (let artist of artists) {
        if (artist.name === album.artist) {
            looking = false;
            artist.albums.push(albumEntry);
            if (album.year < artist.year) {
                artist.year = album.year;
            }
            if (album.year > artist.endYear) {
                artist.endYear = album.year;
            }
            if (album.rank < artist.rank) {
                artist.rank = album.rank;
            }
            for (let genre of album.genres) {
                if (!artist.genres.includes(genre)) {
                    artist.genres.push(genre)
                }
            }
        }
    }
    if (looking) {
        artists.push({
            name: album.artist,
            year: album.year,
            endYear: album.year,
            albums: [albumEntry],
            rank: album.rank,
            genres: album.genres,
            subgenres: album.subgenres,
        })
    }
}

export const albumsProcessed = albums;
export const artistsProcessed = artists;