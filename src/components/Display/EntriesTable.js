export const EntriesTable = ({ categories, data, displaySettings, utilities, displayProps }) => {
  const { displayYearRange, displayLimit, setDisplayLimit, hideEntry, hiddenMessage, loadMoreButton } = displayProps;
  const { entryType, setEntryType, mediaType } = categories;
  const { currentListMetadata, setNewFilters, entriesFiltered } = data;
  const { setDateRange, setSelectedCreator } = displaySettings;
  const { dateRangeDefault, displayYear } = utilities;
  const specialNames = utilities.mediaTypes[mediaType].specialNames;
  const creatorName = specialNames.creators;

  const header = () => {
    const renderCreatorName = creatorName[0].toUpperCase() + creatorName.slice(1, -1);
    return (entryType === 'works') 
      ? (
        <tr>
          <th>Rank</th>
          <th style={{width: '250px'}}>Title</th>
          {!currentListMetadata.noCreators && <th style={{width: '250px'}}>
            {renderCreatorName}
          </th>}
          <th>Year</th>
        </tr>
      )
      : (
      <tr>
        <th>Rank</th>
        <th>{renderCreatorName}</th>
        <th>Years</th>
      </tr>
    )
  }
  const renderWork = (entry, i) => {
    const { rank, title, creator, year } = entry;
    return (
    <tr key={'item' + i}>
      <td>{rank}</td>
      <td><em>{title}</em></td>
      {!currentListMetadata.noCreators && <td onClick={() => {
      setSelectedCreator(creator);
      setDateRange(dateRangeDefault);
      setNewFilters(true);
      }}><a>{creator}</a>
    </td>}
      <td onClick={() => {
        setSelectedCreator('');
        setDateRange({start: year, end: year + 1});
        setNewFilters(true);
      }}><a>{displayYear(year)}</a></td>
    </tr>
  )}

  const renderCreator = (entry, i) => {
    const { rank, name, year, endYear } = entry;
    return (
    <tr key={i}>
      <td>{rank}</td>
      <td><a onClick={() => {
        setSelectedCreator(name);
        setEntryType('works');
        setNewFilters(true);
        }}>{name}</a></td>
      <td>{displayYearRange(year, endYear)}</td>
    </tr>
  )}
  
  const renderEntries = [];
  let hiddenCount = 0;
  for (let i = 0; i < entriesFiltered.length && renderEntries.length < displayLimit; i++) {
    const entry = entriesFiltered[i];
    if (hideEntry(entry)) hiddenCount++;
    else renderEntries.push(entryType === 'works' 
      ? renderWork(entry, i)
      : renderCreator(entry, i));
  }
  
  return(
    <>
      <table className='table'>
        <thead>{header()}</thead>
        <tbody>{renderEntries}</tbody>
      </table>
      {entriesFiltered.length - hiddenCount > renderEntries.length && 
        <div className={'is-flex is-justify-content-center'}>{loadMoreButton}</div>}
      {renderEntries.length === 0 && hiddenMessage}
    </>
  )
}