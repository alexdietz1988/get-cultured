export const Display = ({ data, categories, displaySettings, utilities, userData }) => {
  const { lists, entriesFiltered, entriesToDisplay } = data;
  const { setNewFilters } = data.handlers;
  const { backend, userId, savedWorks, getSavedWorks } = userData;
  const { mediaType, entryType, list } = categories;
  const { setEntryType } = categories.handlers;
  const { dateRange, view, displayLimit, selectedCreator, finishedFilter } = displaySettings;
  const { setDateRange, setDisplayLimit, setSelectedCreator } = displaySettings.handlers;
  const { dateRangeDefault, displayYear } = utilities;
  const { setSavedSettings } = utilities.handlers;
  const currentList = lists[mediaType].lists[list]
  const creatorName = lists[mediaType].specialNames.creators;
  const workName = lists[mediaType].specialNames.works;
  const displayYearRange = (year, endYear) => {
    if (year === endYear) {
      return displayYear(year);
    } else if (year < 0 && endYear < 0) {
      return `${Math.abs(year)}–${Math.abs(endYear)} BC`;
    } else {
      return `${displayYear(year)}–${displayYear(endYear)}`;
    }
  }
  const isFinished = (title, creator, year) => {
    return savedWorks.some(el => 
      el.title === title && 
      el.creator === creator && 
      el.year === year &&
      el.status === 'finished'
      )
  }
  const markAsFinished = async (title, creator, year) => {
    await backend.post('savedWork', {userId, title, creator, year, status: 'finished'});
    getSavedWorks();
  }
  const markAsUnfinished = async (title, creator, year) => {
    await backend.post('savedWork', {userId, title, creator, year, status: 'unfinished'});
    getSavedWorks();
  }
  const renderFinishedStatus = (title, creator, year) => {
    if (userId === '') {
      return <></>;
    } else if (isFinished(title, creator, year)) {
      return (
        <div 
          className='tag is-info'
          onClick={() => markAsUnfinished(title, creator, year)}>
          ✓
        </div>);
    } else return (
      <div
        className='tag is-info is-light'
        onClick={() => markAsFinished(title, creator, year)}>
        ✓
      </div>
    )
  }
  const tableView = () => {
    const worksContent = (
      <>
      <thead>
        <tr>
          <th>Rank</th>
          <th style={{width: '250px'}}>Title</th>
          {!currentList.noCreators && <th style={{width: '250px'}}>
            {creatorName[0].toUpperCase() + creatorName.slice(1, -1)}
          </th>}
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
      {entriesToDisplay.map((entry,i) => {
        const renderCreator = entry.creator === 'No Creator Listed'
          ? <td>No Creator Listed</td>
          : <td onClick={() => {
            setSelectedCreator(entry.creator);
            setDateRange(dateRangeDefault);
            setNewFilters(true);
            }}><a>{entry.creator}</a>
          </td>
        
        return (<tr key={'item' + i}>
            <td>{entry.rank}</td>
            <td><em>{entry.title}</em></td>
            {!currentList.noCreators && renderCreator}
            <td onClick={() => {
              setSelectedCreator('');
              setDateRange({start: entry.year, end: entry.year + 1});
              setNewFilters(true);
            }}><a>{displayYear(entry.year)}</a></td>
          </tr>)}
      )}
      </tbody>
      </>
    )
    const creatorsContent = (
      <>
        <thead>
          <tr>
            <th>Rank</th>
            <th>
              {creatorName[0].toUpperCase() + creatorName.slice(1, -1)}
            </th>
            <th>Years</th>
          </tr>
        </thead>
        <tbody>
        {entriesToDisplay.map((entry,i) => (
          <tr key={'item' + i}>
            <td>{entry.rank}</td>
            <td><a onClick={() => {
              setSelectedCreator(entry.name);
              setEntryType('works');
              setNewFilters(true);
              }}>{entry.name}</a></td>
            <td>{displayYearRange(entry.year, entry.endYear)}</td>
          </tr>
        )
        )}
        </tbody>
      </>
    )
      return(
        <table className='table'>
          {entryType === 'works' ? worksContent : creatorsContent}
        </table>
      )
  }
  const compactView = () => {
    const isUltraCompact = entryType === 'creators' || 
      (entryType === 'works' && currentList.noCreators) ||
      (entryType === 'works' && selectedCreator)
    return (
    <section style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {entriesToDisplay.map((entry,i) => {
        const renderWork = (
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div className='is-inline-block mr-2'>
              <p>{entry.title}</p>
              <div className='has-text-weight-light'>
                {(entry.creator && selectedCreator !== entry.creator) &&
                <p 
                  onClick={() => {
                    setSavedSettings({ mediaType, list, entryType, dateRange, view });
                    setDateRange(dateRangeDefault);
                    setSelectedCreator(entry.creator);
                    setNewFilters(true);
                  }}>
                  <a>{entry.creator}</a>
                </p>}
                <p>
                  <span className='mr-2'>{!currentList.noRanks && `#${entry.rank}, `}{displayYear(entry.year)}</span>
                </p>
              </div>
            </div>
            <div className='is-inline-block'>
              {renderFinishedStatus(entry.title, entry.creator, entry.year)}
            </div>
          </div>
          )
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
            {entryType === 'works' ? renderWork : renderCreator}
          </div>)
      })}
    </section>
  )}
  const entriesDisplay = view === 'table' ? tableView() : compactView()
  const loadMoreButton = (
    <div className={'container is-flex is-justify-content-center'}>
      <button className='button' onClick={() => setDisplayLimit(displayLimit + 50)}>
        Load more
      </button>
    </div>
  )
return (
    <section className='section pt-0'>
      {entryType === 'creators' &&
        <p className='is-size-7 ml-3'>Rank (e.g. "#1") is that of {creatorName.slice(0,-1)}'s highest ranked work.
        Dates are those of the {creatorName.slice(0,-1)}'s {workName} in the current list.</p>}
      {(entriesToDisplay.length > 0) && (
          <>
            {entriesDisplay}
            {entriesFiltered.length > displayLimit && loadMoreButton}
          </>
        )
      }
    </section>
    );
}