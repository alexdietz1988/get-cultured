import { useState } from "react";

import { books, authors } from "../data/books/script.js";
import { albumsProcessed as albums, artistsProcessed as artists } from "../data/music/script.js";

import { Display } from "./Display.js";
import { Controls } from "./Controls.js";

function App() {

  const dateRangeDefault = {start: -700, end: 2023};
  const [mediaType, setMediaType] = useState('literature');
  const [genre, setGenre] = useState('fiction');
  const [media, setMedia] = useState('works');
  const [dateRange, setDateRange] = useState(dateRangeDefault);
  const dataTypes = {
    literature: {works: books[genre], creators: authors[genre]},
    music: {works: albums, creators: artists},
  }
  const data = dataTypes[mediaType][media];

  function filter(start, end) {
    const displayLimit = 100;
    const filtered = [];
    for (let i = 0; i < data.length && filtered.length <= displayLimit; i++) {
        if (data[i].year >= start && data[i].year < end)  {
            filtered.push(data[i]);
        }
    }
    return filtered;
  }
  const filtered = filter(dateRange.start, dateRange.end);

  return (
    <>
      <Controls
        dateRangeDefault={dateRangeDefault}
        dateRange={dateRange}
        setDateRange={setDateRange}
        mediaType={mediaType}
        setMediaType={setMediaType}
        genre={genre}
        setGenre={setGenre}
        media={media}
        setMedia={setMedia}
        data={data}
      />
      <Display filtered={filtered} media={media} />
    </>)
}

export default App;
