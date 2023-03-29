export const Display = ({ data, categories, displaySettings, utilities }) => {
  const { lists, entriesFiltered, entriesToDisplay } = data;
  const { setNewFilters } = data.handlers;
  const { mediaType, entryType, list } = categories;
  const { setEntryType } = categories.handlers;
  const { dateRange, view, displayLimit } = displaySettings;
  const { setDateRange, setDisplayLimit, setSelectedCreator } = displaySettings.handlers;
  const { dateRangeDefault, displayYear } = utilities;
  const { setSavedSettings } = utilities.handlers;
  const currentList = lists[mediaType].lists[list]
  const creatorName = lists[mediaType].specialNames.creators;
  const workName = lists[mediaType].specialNames.works;
  const displayYearRange = (year, endYear) => {
    return year === endYear
      ? displayYear(year)
      : displayYear(year) + '–' + endYear
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
    const height = entryType === 'creators' || currentList.noCreators ? '75px' : '125px';
    return (
    <section
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      {entriesToDisplay.map((entry,i) => {
        const renderWork = (
          <div>
            <p>{entry.title}</p>
            <p className='has-text-weight-light'>
              {entry.creator !== 'No Creator Listed' &&
              <span 
              onClick={() => {
                setSavedSettings({ mediaType, list, entryType, dateRange, view });
                setDateRange(dateRangeDefault);
                setSelectedCreator(entry.creator);
                setNewFilters(true);
              }}>
              <a>{entry.creator}</a>
              <br />
              </span>
              }
              #{entry.rank}, {displayYear(entry.year)}
            </p>
          </div>)
        const renderCreator = (
          <div>
            <p onClick={() => {
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
        return (
          <div
            style={{
              width: '150px',
              height: height,
              margin: '15px',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'start',
              overflow: 'scroll'
            }}
            key={'item' + i}>
            {entryType === 'works' ? renderWork : renderCreator}
          </div>)
      })}
    </section>
  )}
  const entriesDisplay = view === 'table' ? tableView() : compactView()
  const loadMoreButton = (
    <div className={ view === 'table'
      ? 'container'
      : 'container is-flex is-justify-content-center'}>
      <button className='button' onClick={() => {
        setDisplayLimit(displayLimit + 50);
        }}>
        Load more
      </button>
    </div>
  )
  return (
    <section className='section pt-0'>
      {entryType === 'creators' &&
        <p className='is-size-7 ml-3'>Rank (e.g. "#1") is that of {creatorName.slice(0,-1)}'s highest ranked work.
        Dates are those of the {creatorName.slice(0,-1)}'s {workName} in the current list.</p>}
      {(entriesToDisplay.length > 0)
        ? (
          <>
            {entriesDisplay}
            {entriesFiltered.length > displayLimit ? loadMoreButton : <></>}
          </>
        )
        : <></>
      }
    </section>
    );
}