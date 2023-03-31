import { useState, useEffect } from "react";

import { MediaTypeControls } from "./MediaTypeControls.js";
import { ListControls } from "./ListControls.js"
import { ViewControls } from "./ViewControls.js";
import { DateControls } from "./DateControls.js";
import { Tags } from "./Tags.js";

import { Display } from "./Display.js";

import { greatestBooksFiction } from '../data/greatestBooksFiction';
import { greatestBooksNonfiction } from '../data/greatestBooksNonfiction';
import { rsAlbums } from '../data/rsAlbums';
import { rsTV } from '../data/rsTV';
import { ssCritics } from '../data/ssCritics';

import { parse } from '@vanillaes/csv';

const processList = list => {
    const originalData = {
        greatestBooksFiction,
        greatestBooksNonfiction,
        rsAlbums,
        rsTV,
        ssCritics,
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

const App = () => {
  const [loading, setLoading] = useState(true);
  const [newFilters, setNewFilters] = useState(false);
  const defaultData = { works: [], creators: [] };

  const [lists, setLists] = useState({
    literature: {
      default: 'greatestBooksFiction',
      specialNames: { works: 'books', creators: 'authors'},
      lists: {
        greatestBooksFiction: {
          label: 'The Greatest Books: Fiction',
          url: 'https://thegreatestbooks.org',
          about: 'Part of a meta-list, generated from 130 best-of lists, by Shane Sherman.',
          startYear: -700,
          data: defaultData,
        },
        greatestBooksNonfiction: {
          label: 'The Greatest Books: Nonfiction',
          url: 'https://thegreatestbooks.org',
          about: 'Part of a meta-list, generated from 130 best-of lists, by Shane Sherman.',
          startYear: -1400,
          data: defaultData,
        },
      }
    },
    music: {
      default: 'rsAlbums',
      specialNames: { works: 'albums', creators: 'artists'},
      lists: {
        rsAlbums: {
          label: 'Rolling Stone: The 500 Greatest Albums of All Time',
          about: <>A ranking by <em>Rolling Stone</em> magazine, last updated in 2020.</>,
          url: 'https://www.rollingstone.com/music/music-lists/best-albums-of-all-time-1062063/',
          startYear: 1955,
          data: defaultData,
        },
      }
    },
    film: {
      default: 'ssCritics',
      specialNames: { works: 'movies', creators: 'directors'},
      lists: {
        ssCritics: {
          label: 'Sight and Sound - Critics (2022)',
          about: <>The latest edition of <em>Sight and Sound</em> magazine's decennial ranking, based on a poll of 1,639 critics, programmers, curators, archivists and academics.</>,
          url: 'https://www.bfi.org.uk/sight-and-sound/greatest-films-all-time',
          startYear: 1924,
          data: defaultData,
        },
      }
    },
    television: {
      default: 'rsTV',
      specialNames: { works: 'shows', creators: 'creators'},
      lists: {
        rsTV: {
          label: 'Rolling Stone: The 100 Greatest TV Shows of All Time',
          about: <>A ranking by <em>Rolling Stone</em> magazine, last updated in 2022.</>,
          url: 'https://www.rollingstone.com/tv-movies/tv-movie-lists/best-tv-shows-of-all-time-1234598313/',
          startYear: 1951,
          noCreators: true,
          data: { works: [], creators: [] },
        }
      }
    }
  });

  const [entries, setEntries] = useState([]);
  const [entriesFiltered, setEntriesFiltered] = useState([]);
  const [entriesToDisplay, setEntriesToDisplay] = useState([]);

  const [mediaType, setMediaType] = useState('literature');
  const [list, setList] = useState('greatestBooksFiction');
  const [entryType, setEntryType] = useState('works');

  const dateRangeDefault = {
    start: lists[mediaType].lists[list].startYear,
    end: new Date().getFullYear()
  };
  const [dateRange, setDateRange] = useState(dateRangeDefault);

  const [query, setQuery] = useState('');
  const [selectedCreator, setSelectedCreator] = useState('');
  const [view, setView] = useState('compact');
  const [displayLimit, setDisplayLimit] = useState(25);

  const currentList = lists[mediaType].lists[list];
  const shortTimePeriod = dateRangeDefault.end - currentList.startYear < 100;

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
    query,
    handlers: { setView, setDisplayLimit, setDateRange, setSelectedCreator, setQuery }
  }
  const utilities = {
    dateRangeDefault,
    datesAreDefault: dateRange.start === dateRangeDefault.start && dateRange.end === dateRangeDefault.end,
    displayYear: year => year >= 0 ? year : Math.abs(year) + ' BC',
    savedSettings,
    handlers: { setSavedSettings },
  }

  const applyFilters = () => {
    const allEntries = lists[mediaType].lists[list].data[entryType];
    const filtered = [];
    for (let entry of allEntries) {
      const inDateRange = entry.year >= dateRange.start && entry.year < dateRange.end;
      const creatorMatch = selectedCreator === '' || selectedCreator === entry.creator;
      const queryMatch = 
        query === '' ||
        (entryType === 'works' && entry.title.toLowerCase().includes(query.toLowerCase())) ||
        (entryType === 'works' && entry.creator.toLowerCase().includes(query.toLowerCase())) ||
        (entryType === 'creators' && entry.name.toLowerCase().includes(query.toLowerCase()))
      if (inDateRange && creatorMatch && queryMatch) {
          filtered.push(entry);
      }
    }
    setEntriesFiltered(filtered);
    setEntriesToDisplay(filtered.slice(0, displayLimit));
  }

  useEffect(() => {
      if (loading) {
        const currentEntries = lists[mediaType].lists[list].data;
        if (currentEntries.works.length === 0) {
          const newLists = lists;
          const newEntries = processList(list);
          newLists[mediaType].lists[list].data = newEntries;
          setLists(newLists);
          setEntries(newEntries);
        } else {
          setEntries(currentEntries);
        }
        applyFilters();
        setLoading(false);
      } else if (newFilters) {
        applyFilters();
        setNewFilters(false);
      } else {
        setEntriesToDisplay(entriesFiltered.slice(0, displayLimit))
      }
  }, [loading, newFilters, displayLimit])

  const renderDateControls = elementType => {
    const renderDateControl = range => (
      <DateControls
        data={data}
        categories={categories}
        displaySettings={displaySettings}
        utilities={utilities}
        elementType={elementType}
        range={range} 
      />
    )
    return (
    <>
      {!shortTimePeriod && renderDateControl(100)}
      {(dateRange.end - dateRange.start <= 100 || shortTimePeriod) && renderDateControl(10)}
      {dateRange.end - dateRange.start <= 10 && renderDateControl(1)}
    </>
  )}

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
          <section className='section pb-2'>
            <div className='mb-3'>
              <MediaTypeControls
                data={data}
                categories={categories}
                displaySettings={displaySettings}
              />
            </div>
            <div className='mb-3'>
              <ListControls 
                  data={data}
                  mediaType={mediaType} 
                  list={categories.list} 
                  setList={setList} 
              />
            </div>
            <div className='my-3'>
              <ViewControls
                data={data}
                list={list}
                categories={categories}
                displaySettings={displaySettings}
              />
            </div>
            <div className='mt-4 mb-3'>
              <div className='mobile-only field is-grouped'>
                {renderDateControls('dropdown')}
              </div>
              <div className='desktop-only'>
                {renderDateControls('buttons')}
              </div>
            </div>
            <div className='my-3'>
                <Tags
                    data={data}
                    categories={categories}
                    displaySettings={displaySettings}
                    utilities={utilities}
                />
            </div>
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
