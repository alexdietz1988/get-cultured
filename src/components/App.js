import { useState, useEffect } from "react";
import axios from 'axios'

import { RenderApp } from "./RenderApp";
import { processList, listMetadata } from "../getListData";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [newFilters, setNewFilters] = useState(false);

  const [lists, setLists] = useState({});
  const [entries, setEntries] = useState([]);
  const [entriesFiltered, setEntriesFiltered] = useState([]);
  const [entriesToDisplay, setEntriesToDisplay] = useState([]);

  const [mediaType, setMediaType] = useState('literature');
  const [list, setList] = useState('greatestBooksFiction');
  const [entryType, setEntryType] = useState('works');

  const data = { 
    lists, entries, entriesFiltered, entriesToDisplay, loading,
    currentListMetadata: listMetadata[list], 
    handlers: { setLoading, setNewFilters } };
  const categories = { mediaType, list, entryType, handlers: { setMediaType, setList, setEntryType } };

  const dateRangeDefault = {
    start: listMetadata[list].startYear,
    end: new Date().getFullYear()
  };
  const [dateRange, setDateRange] = useState(dateRangeDefault);

  const [query, setQuery] = useState('');
  const [selectedCreator, setSelectedCreator] = useState('');
  const [view, setView] = useState('compact');
  const [finishedFilter, setFinishedFilter] = useState('all');
  const [displayLimit, setDisplayLimit] = useState(25);
  const displaySettings = {
    view, displayLimit, dateRange, selectedCreator, query, finishedFilter,
    handlers: { setView, setDisplayLimit, setDateRange, setSelectedCreator, setQuery, setFinishedFilter }
  }

  const mediaTypes = {
    literature: {
      default: 'greatestBooksFiction',
      specialNames: { works: 'books', creators: 'authors'},
    },
    music: {
      default: 'rsAlbums',
      specialNames: { works: 'albums', creators: 'artists'},
    },
    film: {
      default: 'ssCritics',
      specialNames: { works: 'movies', creators: 'directors'},
    },
    television: {
      default: 'rsTV',
      specialNames: { works: 'shows', creators: 'creators'},
    }
  }
  const [savedSettings, setSavedSettings] = useState({ mediaType, list, entryType, dateRange, view });
  const utilities = {
    mediaTypes, listMetadata, dateRangeDefault, savedSettings, handlers: { setSavedSettings },
    datesAreDefault: dateRange.start === dateRangeDefault.start && dateRange.end === dateRangeDefault.end,
    displayYear: year => year >= 0 ? year : Math.abs(year) + ' BC',
  }

  const applyFilters = () => {
    const allEntries = lists[list][entryType];
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
        const currentEntries = lists[list];
        if (!currentEntries) {
          const newLists = lists;
          const newEntries = processList(list);
          newLists[list] = newEntries;
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

  const backend = axios.create({ baseURL: 'http://localhost:4000/' });
  const [userId, setUserId] = useState('');
  const [savedWorks, setSavedWorks] = useState([]);
  const getSavedWorks = async () => {
    const response = await backend.get(`savedWork/?userId=${userId}`);
    setSavedWorks(response.data);
  }
  useEffect(() => { if (userId) getSavedWorks(); }, [userId]);
  const userData = { backend, userId, setUserId, savedWorks, getSavedWorks };

  return (
    <RenderApp 
      userData={userData} 
      data={data} 
      categories={categories} 
      displaySettings={displaySettings}
      utilities={utilities} />)
}

export default App;
