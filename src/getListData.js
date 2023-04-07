import { greatestBooksFiction } from './data/greatestBooksFiction';
import { greatestBooksNonfiction } from './data/greatestBooksNonfiction';
import { rsAlbums } from './data/rsAlbums';
import { rsTV } from './data/rsTV';
import { ssCritics } from './data/ssCritics';
import { pitchfork2010s } from "./data/pitchfork2010s.js";
import { slateNonfiction } from "./data/slateNonfiction.js";
import { rtDocs } from "./data/rtDocs.js";

import { parse } from '@vanillaes/csv';

export const processList = list => {
    const originalData = {
        greatestBooksFiction,
        greatestBooksNonfiction,
        rsAlbums,
        rsTV,
        ssCritics,
        pitchfork2010s,
        slateNonfiction,
        rtDocs
    }
    const worksUnprocessed = parse(originalData[list]);
    const works = [];
    for (let i = 2; i < worksUnprocessed.length; i++) {
        works.push({
            rank: parseInt(worksUnprocessed[i][0]),
            title: worksUnprocessed[i][1].trim(),
            creator: worksUnprocessed[i][2],
            year: parseInt(worksUnprocessed[i][3]),
        })
    }
    const creators = [];
    for (let work of works) {
        let unmatched = true;
        for (let creator of creators) {
            if (work.creator === creator.name) {
                unmatched = false;
                if (work.year < creator.year) {
                    creator.year = work.year;
                }
                if (work.year > creator.endYear) {
                creator.endYear = work.year;
            }
                if (work.rank < creator.rank) {
                    creator.rank = work.rank;
                }
                creator.works.push(work.title);
            }
        }
        if (unmatched) {
            creators.push({
                name: work.creator,
                year: work.year,
                endYear: work.year,
                rank: work.rank,
                works: [work.title],
            })
        }
    }
    return { works, creators };
}

export const listMetadata = {
    greatestBooksFiction: {
        mediaType: 'literature',
        label: 'The Greatest Books: Fiction',
        url: 'https://thegreatestbooks.org',
        about: 'Part of a meta-list, generated from 130 best-of lists, by Shane Sherman.',
        startYear: -700,
        },
    greatestBooksNonfiction: {
        mediaType: 'literature',
        label: 'The Greatest Books: Nonfiction',
        url: 'https://thegreatestbooks.org',
        about: 'Part of a meta-list, generated from 130 best-of lists, by Shane Sherman.',
        startYear: -1400,
        },
    slateNonfiction: {
        mediaType: 'literature',
        label: 'Slate: The 50 Best Nonfiction Books of the Past 25 Years (2019)',
        url: 'https://slate.com/human-interest/2019/11/50-best-nonfiction-books.html',
        about: '',
        startYear: 1995,
        noRanks: true,
        },
    rsAlbums: {
        mediaType: 'music',
        label: 'Rolling Stone: The 500 Greatest Albums of All Time',
        about: <>A ranking by <em>Rolling Stone</em> magazine, last updated in 2020.</>,
        url: 'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/',
        startYear: 1955,
        },
    pitchfork2010s: {
        mediaType: 'music',
        label: 'Pitchfork: The 200 Best Albums of the 2010s',
        about: <></>,
        url: 'https://pitchfork.com/features/lists-and-guides/the-200-best-albums-of-the-2010s/',
        startYear: 2010,
    },
    ssCritics: {
        mediaType: 'film',
        label: 'Sight and Sound - Critics (2022)',
        about: <>The latest edition of <em>Sight and Sound</em> magazine's decennial ranking, based on a poll of 1,639 critics, programmers, curators, archivists and academics.</>,
        url: 'https://www.bfi.org.uk/sight-and-sound/greatest-films-all-time',
        startYear: 1924,
    },
    rtDocs: {
        mediaType: 'film',
        label: 'Rotten Tomatoes: 100 Best-Reviewed Documentaries of All Time',
        about: '',
        url: 'https://editorial.rottentomatoes.com/guide/100-best-documentaries/',
        startYear: 2001,
    },
    rsTV: {
        mediaType: 'television',
        label: 'Rolling Stone: The 100 Greatest TV Shows of All Time',
        about: <>A ranking by <em>Rolling Stone</em> magazine, last updated in 2022.</>,
        url: 'https://www.rollingstone.com/tv-movies/tv-movie-lists/best-tv-shows-of-all-time-1234598313/',
        startYear: 1951,
    }
}
