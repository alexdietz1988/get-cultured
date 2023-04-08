export const EntriesCompact = ({ categories, data, displaySettings, utilities, displayProps }) => {
    const { renderFinishedStatus, hideEntry, hiddenMessage, displayYearRange, displayLimit, loadMoreButton } = displayProps;
    const { entryType, setEntryType, mediaType, list } = categories
    const { currentListMetadata, setNewFilters, entriesFiltered } = data;
    const { dateRange, setDateRange, view, selectedCreator, setSelectedCreator } = displaySettings;
    const { setSavedSettings, dateRangeDefault, displayYear } = utilities;
    const isUltraCompact = entryType === 'creators' || 
        (entryType === 'works' && currentListMetadata.noCreators) ||
        (entryType === 'works' && selectedCreator)
    const renderWork = (entry, i) => {
        const { title, creator, year } = entry;
        return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div className='is-inline-block mr-2'>
                    <p>{title}</p>
                    <div className='has-text-weight-light'>
                    {(creator && selectedCreator !== creator) &&
                    <p onClick={() => {
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
    const renderCreator = (entry, i) => (
        <div key={i}>
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
        </div>
    )
    const renderEntries = [];
    let hiddenCount = 0;
    for (let i = 0; i < entriesFiltered.length && renderEntries.length < displayLimit; i++) {
        const entry = entriesFiltered[i];
        if (hideEntry(entry)) {
            hiddenCount++;
        } else {
            renderEntries.push(
                <div
                    className={'entry-compact ' + (isUltraCompact && 'entry-ultra-compact')}
                    key={'item' + i}>
                    {entryType === 'works' 
                        ? renderWork(entry, i) 
                        : renderCreator(entry, i)}
                </div>
            )
        }
    }

    return (
    <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {renderEntries}
        {entriesFiltered.length - hiddenCount > renderEntries.length && 
        <div className={'entry-compact is-flex is-justify-content-center is-align-items-center'}>
            {loadMoreButton}
        </div>}
        {renderEntries.length === 0 && hiddenMessage}
    </section>
    )
}