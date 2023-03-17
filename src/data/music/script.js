import { parse } from '@vanillaes/csv';
import albumsUnparsed from './albums.js';

function processAlbums() {
    const albums = [];
    const albumsParsed = parse(albumsUnparsed);
    for (let i = 2; i < albumsParsed.length; i++) {
        albums.push({
            rank: parseInt(albumsParsed[i][0]),
            title: albumsParsed[i][1],
            year: parseInt(albumsParsed[i][3]),
            creator: albumsParsed[i][4],
            genres: albumsParsed[i][5].split(','),
            subgenres: albumsParsed[i][6].split(',')
        })
    }
    return albums;
}
export const albums = processAlbums();

function processArtists() {
    const artists = [];
    for (let album of albums) {
        let looking = true;
        for (let artist of artists) {
            if (artist.name === album.creator) {
                looking = false;
                artist.works.push(album.title);
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
                name: album.creator,
                year: album.year,
                endYear: album.year,
                works: [album.title],
                rank: album.rank,
                genres: album.genres,
                subgenres: album.subgenres,
            })
        }
    }
    return artists;
}
export const artists = processArtists();
