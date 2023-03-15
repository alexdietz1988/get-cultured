import { useState } from "react";

import { LoadEntries } from "./LoadEntries.js";
import { Display } from "./Display.js";
import { Controls } from "./Controls/Controls.js";

function App() {
  const [lists, setLists] = useState({
    literature: {
      greatestBooksFiction: {
        label: 'The Greatest Books: Fiction',
        data: {},
      },
      greatestBooksNonfiction: {
        label: 'The Greatest Books: Nonfiction',
        data: {},
      },
    },
    music: {
      rs500Albums: {
        label: 'Rolling Stone: The 500 Greatest Albums of All Time',
        data: {},
      },
    }
  });
  const [entries, setEntries] = useState({ all: [], filtered: [], toDisplay: [] });

  const [mediaType, setMediaType] = useState('literature');
  const [list, setList] = useState('greatestBooksFiction');
  const [entryType, setEntryType] = useState('works');

  const dateRangeDefault = {start: -700, end: 2023};
  const [dateRange, setDateRange] = useState(dateRangeDefault);

  const [selectedCreator, setSelectedCreator] = useState('');
  const [view, setView] = useState('compact');
  const [displayLimit, setDisplayLimit] = useState(25);

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
    handlers: { setMediaType, setList, setEntryType, }
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
  return (
    <>
      <LoadEntries
        lists={lists}
        setLists={setLists}
        setEntries={setEntries}
        categories={categories}
        displaySettings={displaySettings}
      />
      <div className='section pb-0'>
        <h1 className='title'>Get Cultured</h1>
        <h2 className='subtitle'>Explore selected lists of great works of art</h2>
      </div>
      <Controls
        lists={lists}
        entries={entries}
        categories={categories}
        displaySettings={displaySettings}
        utilities={utilities}
      />
      <Display
        entries={entries}
        categories={categories}
        displaySettings={displaySettings}
        utilities={utilities}
      />
      <footer className='footer'>
        <div className='content has-text-centered'>
          <strong>Get Cultured</strong> by <a href="https://alexdietz.com/">Alex Dietz</a>.
          The favicon is from <a href="https://www.flaticon.com/free-icons/book" title="book icons">Freepik - Flaticon</a>.
        </div>
      </footer>
    </>)
}

export default App;
