export const EntriesCompact = ({ categories, data, displaySettings, utilities, displayProps }) => {
    const { renderFinishedStatus, isFinished, entriesToDisplay, displayYearRange } = displayProps;
    const { entryType, setEntryType, mediaType, list } = categories;
    const { currentListMetadata, setNewFilters } = data;
    const { dateRange, setDateRange, view, selectedCreator, setSelectedCreator, finishedFilter } = displaySettings;
    const { setSavedSettings, dateRangeDefault, displayYear } = utilities;
    const isUltraCompact = entryType === 'creators' || 
        (entryType === 'works' && currentListMetadata.noCreators) ||
        (entryType === 'works' && selectedCreator)
    const renderWorkCompact = (entry, index) => {
        const { title, creator, year } = entry;
        return (
        <div key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div className='is-inline-block mr-2'>
                <p>{title}</p>
                <div className='has-text-weight-light'>
                {(creator && selectedCreator !== creator) &&
                <p 
                    onClick={() => {
                    setSavedSettings({ mediaType, list, entryType, dateRange, view });
                    setDateRange(dateRangeDefault);
                    setSelectedCreator(creator);
                    setNewFilters(true);
                    }}>
                    <a>{creator}</a>
                </p>}
                <p>
                    <span className='mr-2'>{!currentListMetadata.noRanks && `#${entry.rank}, `}{displayYear(year)}</span>
                </p>
                </div>
            </div>
            <div className='is-inline-block'>
                {renderFinishedStatus(title, creator, year)}
            </div>
            </div>
            )
        }
    return (
    <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {entriesToDisplay.map((entry,i) => {
        const renderCreator = (
            <div>
            <p onClick={() => {
                setSavedSettings({ mediaType, list, entryType, dateRange, view });
                setDateRange(dateRangeDefault);
                setSelectedCreator(entry.name);
                setEntryType('works');
                setNewFilters(true);
            }}>
                <a>{entry.name}</a>
            </p>
            <p className='has-text-weight-light'>
                #{entry.rank}, {displayYearRange(entry.year, entry.endYear)}
            </p>
            </div>)
        const hideEntry = entryType === 'works' && 
            (isFinished(entry.title, entry.creator, entry.year) && finishedFilter === 'onlyUnfinished') ||
            (!isFinished(entry.title, entry.creator, entry.year) && finishedFilter === 'onlyFinished')
        return hideEntry ? <></>
            : (
            <div
            className={'entry-compact ' + (isUltraCompact && 'entry-ultra-compact')}
            key={'item' + i}>
            {entryType === 'works' ? renderWorkCompact(entry, i) : renderCreator}
            </div>)
        })}
    </section>
    )
}