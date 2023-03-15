import { useEffect } from 'react';

import { greatestBooksFiction } from '../data/greatestBooksFiction';
import { greatestBooksNonfiction } from '../data/greatestBooksNonfiction';
import { rs500Albums } from '../data/rs500Albums';

import { parse } from '@vanillaes/csv';

const processList = list => {
    const originalData = {
        greatestBooksFiction,
        greatestBooksNonfiction,
        rs500Albums,
    }
    const worksUnprocessed = parse(originalData[list]);
    const works = [];
    for (let i = 1; i < worksUnprocessed.length; i++) {
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

export const LoadEntries = ({ lists, setLists, setEntries, categories, displaySettings }) => {
    const { dateRange, selectedCreator, displayLimit } = displaySettings;
    const { list, mediaType, entryType } = categories;

    const applyFilters = () => {
        const allEntries = lists[mediaType][list].data[entryType];
        const filteredEntries = [];
        for (let entry of allEntries) {
          const inDateRange = entry.year >= dateRange.start && entry.year < dateRange.end;
          const creatorMatch = selectedCreator === '' || selectedCreator === entry.creator;
          if (inDateRange && creatorMatch) {
              filteredEntries.push(entry);
          }
        }
        setEntries({ 
            all: allEntries,
            filtered: filteredEntries,
            toDisplay: filteredEntries.slice(0, displayLimit),
        })
    }

    useEffect(() => {
        if (!lists[mediaType][list].data.works) {
            const newLists = lists;
            newLists[mediaType][list].data = processList(list);
            setLists(newLists);
        } 
        else {
            applyFilters();
        }
    },
        [
            lists,
            list, 
            entryType, 
            mediaType, 
            selectedCreator, 
            dateRange,
            displayLimit,
        ])

    return <></>
}