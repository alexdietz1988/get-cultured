import { useState, useEffect } from "react";

import { Display } from "./Display.js";
import { Controls } from "./Controls/Controls.js";
import { ListSelectors } from "./Controls/ListSelectors.js";

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

const App = () => {
  const [loading, setLoading] = useState(true);
  const [newFilters, setNewFilters] = useState(false);

  const [lists, setLists] = useState({
    literature: {
      default: 'greatestBooksFiction',
      greatestBooksFiction: {
        label: 'The Greatest Books: Fiction',
        startYear: -700,
        data: {},
      },
      greatestBooksNonfiction: {
        label: 'The Greatest Books: Nonfiction',
        startYear: -1400,
        data: {},
      },
    },
    music: {
      default: 'rs500Albums',
      rs500Albums: {
        label: 'Rolling Stone: The 500 Greatest Albums of All Time',
        startYear: 1955,
        data: {},
      },
    }
  });
  const [entries, setEntries] = useState([]);
  const [entriesFiltered, setEntriesFiltered] = useState([]);
  const [entriesToDisplay, setEntriesToDisplay] = useState([]);

  const [mediaType, setMediaType] = useState('literature');
  const [list, setList] = useState('greatestBooksFiction');
  const [entryType, setEntryType] = useState('works');

  const dateRangeDefault = {start: -700, end: new Date().getFullYear()};
  const [dateRange, setDateRange] = useState(dateRangeDefault);

  const [selectedCreator, setSelectedCreator] = useState('');
  const [view, setView] = useState('compact');
  const [displayLimit, setDisplayLimit] = useState(25);

  const data = {
    lists,
    entries,
    entriesFiltered,
    entriesToDisplay,
    handlers: { setLoading, setNewFilters }
  }
  const [savedSettings, setSavedSettings] = useState({
    mediaType,
    list,
    entryType,
    dateRange,
    view
  });
  const categories = {
    mediaType,
    list,
    entryType,
    handlers: { setMediaType, setList, setEntryType }
  }
  const displaySettings = {
    view,
    displayLimit,
    dateRange,
    selectedCreator,
    handlers: { setView, setDisplayLimit, setDateRange, setSelectedCreator }
  }
  const utilities = {
    dateRangeDefault,
    specialNames: {
      literature: { works: 'books', creators: 'authors' },
      music: { works: 'albums', creators: 'artists' },
    },
    displayYear: year => year >= 0 ? year : Math.abs(year) + ' BC',
    savedSettings,
    handlers: { setSavedSettings },
  }

  const applyFilters = () => {
    const allEntries = lists[mediaType][list].data[entryType];
    const filtered = [];
    for (let entry of allEntries) {
      const inDateRange = entry.year >= dateRange.start && entry.year < dateRange.end;
      const creatorMatch = selectedCreator === '' || selectedCreator === entry.creator;
      if (inDateRange && creatorMatch) {
          filtered.push(entry);
      }
    }
    setEntriesFiltered(filtered);
    setEntriesToDisplay(filtered.slice(0, displayLimit));
  }

  useEffect(() => {
      if (loading) {
        const newLists = lists;
        const newEntries = processList(list);
        newLists[mediaType][list].data = newEntries;
        setLists(newLists);
        setEntries(newEntries);
        applyFilters();
        setLoading(false);
      } else if (newFilters) {
        applyFilters();
        setNewFilters(false);
      } else {
        setEntriesToDisplay(entriesFiltered.slice(0, displayLimit))
      }
  }, [loading, newFilters, displayLimit])

  return (
    <>
      <div className='section pb-0'>
        <h1 className='title'>Get Cultured</h1>
        <h2 className='subtitle'>Explore selected lists of great works of art</h2>
      </div>
      { loading 
        ? (
          <div style={{height: '90vh'}} className='section is-flex is-justify-content-center is-align-items-center'>
            <p>Loading...</p>
          </div>
        )
        : (
        <>
          <section className='section'>
            <ListSelectors 
              data={data}
              categories={categories}
              displaySettings={displaySettings}
              utilities={utilities}
            />
            <Controls
              data={data}
              categories={categories}
              displaySettings={displaySettings}
              utilities={utilities}
            />
          </section>
          <Display
            data={data}
            categories={categories}
            displaySettings={displaySettings}
            utilities={utilities}
          />
        </>
        )
      }
      
      <footer className='footer'>
        <div className='content has-text-centered'>
          <strong>Get Cultured</strong> by <a href="https://alexdietz.com/">Alex Dietz</a>.
          The favicon is from <a href="https://www.flaticon.com/free-icons/book" title="book icons">Freepik - Flaticon</a>.
        </div>
      </footer>
    </>)
}

export default App;
