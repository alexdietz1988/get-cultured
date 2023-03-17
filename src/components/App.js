import { useState } from "react";

import { books, authors } from "../data/books/script.js";
import { albums, artists } from "../data/music/script.js";

import { Display } from "./Display.js";
import { Controls } from "./Controls.js";

function App() {
  const dateRangeDefault = {start: -700, end: 2023};

  const [mediaType, setMediaType] = useState('literature');
  const [genre, setGenre] = useState('fiction');
  const [media, setMedia] = useState('works');
  const [dateRange, setDateRange] = useState(dateRangeDefault);
  const [selectedCreator, setSelectedCreator] = useState('');
  const [selectedWork, setSelectedWork] = useState('');

  const [view, setView] = useState('table');
  const [displayLimit, setDisplayLimit] = useState(25);

  const restoreDefaults = () => {
    setGenre('fiction');
    setMedia('works');
    setDateRange(settings.dateRangeDefault);
    setSelectedCreator('');
    setSelectedWork('');
    setView('table');
  }

  const dataTypes = {
    literature: {works: books[genre], creators: authors[genre]},
    music: {works: albums, creators: artists},
  }
  function getSpecialNames() {
    if (mediaType === 'literature') {
      return {works: 'books', creators: 'authors'};
    }
    if (mediaType === 'music') {
      return {works: 'albums', creators: 'artists'};
    }
  }
  const specialNames = getSpecialNames();
  const data = dataTypes[mediaType][media];

  function filter(start, end) {
    const filtered = [];
    for (let i = 0; i < data.length && filtered.length < displayLimit; i++) {
      const inDateRange = data[i].year >= start && data[i].year < end;
      const creatorMatch = selectedCreator === '' || selectedCreator === data[i].creator;
      const workMatch = selectedWork === '' || selectedWork === data[i].title;
      if (inDateRange && creatorMatch && workMatch) {
          filtered.push(data[i]);
      }
    }
    return filtered;
  }
  const filtered = filter(dateRange.start, dateRange.end);
  const settings = { dateRange, dateRangeDefault, mediaType, genre, media, selectedCreator, selectedWork, specialNames, view, displayLimit };
  const settingsHandlers = { setDateRange, setMediaType, setGenre, setMedia, setSelectedCreator, setSelectedWork, setView, setDisplayLimit, restoreDefaults };
  
  return (
    <>
      <Controls
        settings={settings}
        settingsHandlers={settingsHandlers}
        data={data}
      />
      <Display
        settings={settings}
        settingsHandlers={settingsHandlers}
        filtered={filtered}
      />
    </>)
}

export default App;
