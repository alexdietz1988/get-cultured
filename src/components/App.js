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

  const [mediaType, setMediaType] = useState('literature');
  const [list, setList] = useState('greatestBooksFiction');
  const [entryType, setEntryType] = useState('works');

  const data = { 
    lists, entries, entriesFiltered, loading, setLoading, newFilters, setNewFilters,
    currentListMetadata: listMetadata[list]};
  const categories = { mediaType, setMediaType, list, setList, entryType, setEntryType };

  const dateRangeDefault = {
    start: listMetadata[list].startYear,
    end: new Date().getFullYear()
  };
  const [dateRange, setDateRange] = useState(dateRangeDefault);

  const [query, setQuery] = useState('');
  const [selectedCreator, setSelectedCreator] = useState('');
  const [view, setView] = useState('compact');
  const [finishedFilter, setFinishedFilter] = useState('all');

  const displaySettings = {
    view, setView, dateRange, setDateRange, 
    selectedCreator, setSelectedCreator, query, setQuery, finishedFilter, setFinishedFilter,
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
    mediaTypes, listMetadata, dateRangeDefault, savedSettings, setSavedSettings,
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
      }
  }, [loading, newFilters])

  const backend = axios.create({ baseURL: 'http://localhost:4000/' });
  const [userId, setUserId] = useState('646897e8818f5d7630baccd9');
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
