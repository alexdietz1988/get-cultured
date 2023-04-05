import { useState } from "react";

export const ViewControls = ({ data, list, categories, displaySettings }) => {
    const { lists } = data;
    const { setNewFilters } = data.handlers;
    const { entryType, mediaType } = categories;
    const { setEntryType } = categories.handlers;
    const { view, query } = displaySettings;
    const { setView, setDisplayLimit, setQuery, setSelectedCreator } = displaySettings.handlers;
    const currentList = lists[mediaType].lists[list];
    const [searchInput, setSearchInput] = useState('');
    return (
        <>
            {!currentList.noCreators &&
            <div className='is-inline mr-4 mb-0 buttons has-addons'>
            {['works', 'creators'].map(currentEntryType => 
                <button
                    key={currentEntryType}
                    className={'button ' + (entryType === currentEntryType && 'is-primary')}
                    onClick={() => {
                        setEntryType(currentEntryType);
                        if (currentEntryType  === 'creators') {
                            setSelectedCreator('');
                        }
                        setNewFilters(true);
                        }}>
                {lists[mediaType].specialNames[currentEntryType][0].toUpperCase() + 
                    lists[mediaType].specialNames[currentEntryType].slice(1)}
            </button>
            )}
            </div>
            }
            <button
                className={'button mr-4 ' + (view === 'compact' && 'is-primary')}
                onClick={() => {
                    setView(view === 'compact' ? 'table' : 'compact');
                    setDisplayLimit(view === 'compact' ? 25 : 50);
                    }}>
                <span>Compact</span>
                {view === 'compact' && 
                <span className="icon is-right">
                    <i className="delete is-small"/>
                </span>
                }
            </button>
            <div className='search control has-icons-right'>
                <input onChange={e => {
                  setSearchInput(e.target.value);
                  setQuery(e.target.value);
                  setNewFilters(true);
                }} value={searchInput} className='input is-inline' placeholder='Search title or creator' />
                {query !== '' &&
                <span className="icon is-right">
                  <button className="delete is-small" onClick={() => {
                    setSearchInput('');
                    setQuery('');
                    setNewFilters(true);
                  }}/>
                </span>}
              </div>
        </>
    )
}
