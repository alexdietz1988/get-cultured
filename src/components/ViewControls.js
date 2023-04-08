import { useState } from "react";

export const ViewControls = ({ data, categories, displaySettings, userData, utilities }) => {
    const { currentListMetadata, setNewFilters } = data;
    const { entryType, setEntryType, mediaType } = categories;
    const { view, setView, query, setQuery, finishedFilter, setFinishedFilter, setDisplayLimit, setSelectedCreator } = displaySettings;
    const [searchInput, setSearchInput] = useState('');
    const { userId } = userData;
    const { mediaTypes } = utilities;
    return (
        <>
            <div className='mb-3'>
            {!currentListMetadata.noCreators &&
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
                {mediaTypes[mediaType].specialNames[currentEntryType][0].toUpperCase() + 
                    mediaTypes[mediaType].specialNames[currentEntryType].slice(1)}
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
            {userId && entryType === 'works' && (
            <div className='buttons is-inline has-addons mr-4'>
                <button 
                    className={'button ' + (finishedFilter === 'all' && 'is-primary')} 
                    onClick={() => setFinishedFilter('all')}>
                    All
                </button>
                <button 
                    className={'button ' + (finishedFilter === 'onlyUnfinished' && 'is-primary')} 
                    onClick={() => setFinishedFilter('onlyUnfinished')}>
                    Unfinished
                </button>
                <button 
                    className={'button ' + (finishedFilter === 'onlyFinished' && 'is-primary')} 
                    onClick={() => setFinishedFilter('onlyFinished')}>
                    Finished
                </button>
            </div>)}
            </div>
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
