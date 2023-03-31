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
            <div className='is-inline buttons has-addons'>
            {['compact', 'table'].map(currentView => (
                <button
                    key={currentView}
                    className={'button ' + (view === currentView && 'is-primary')}
                    onClick={() => {
                        setView(currentView);
                        setDisplayLimit(currentView === 'compact' ? 50 : 25);
                        }}>
                {currentView[0].toUpperCase() + currentView.slice(1)}
                </button>
            ))}
            </div>
            <div className='mx-4 is-inline control has-icons-right' style={{display: 'flex', alignItems: 'top'}}>
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
