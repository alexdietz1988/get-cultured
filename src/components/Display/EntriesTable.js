export const EntriesTable = ({ categories, data, displaySettings, utilities, displayProps }) => {
    const { entriesToDisplay, displayYearRange } = displayProps;
    const { entryType, setEntryType, mediaType } = categories;
    const { currentListMetadata, setNewFilters } = data;
    const { setDateRange, setSelectedCreator } = displaySettings;
    const { dateRangeDefault, displayYear } = utilities;
    const specialNames = utilities.mediaTypes[mediaType].specialNames;
    const creatorName = specialNames.creators;
    
    const worksContent = (
      <>
      <thead>
        <tr>
          <th>Rank</th>
          <th style={{width: '250px'}}>Title</th>
          {!currentListMetadata.noCreators && <th style={{width: '250px'}}>
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
            {!currentListMetadata.noCreators && renderCreator}
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