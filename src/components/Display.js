export const Display = ({ settings, settingsHandlers, filtered }) => {
  const tableView = () => {
    const worksContent = (
      <>
      <thead>
        <tr>
          <th>Rank</th>
          <th>{settings.specialNames.creators[0].toUpperCase() + settings.specialNames.creators.slice(1,-1)}</th>
          <th>Title</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
      {filtered.map((entry,i) => 
          <tr key={'item' + i}>
            <td>{entry.rank}</td>
            <td onClick={() => {
              settingsHandlers.setSelectedCreator(entry.creator);
              settingsHandlers.setDateRange(settings.dateRangeDefault);
              }}>{entry.creator}</td>
            <td><em>{entry.title}</em></td>
            <td onClick={() => settingsHandlers.setDateRange({start: entry.year, end: entry.year + 1})}>{entry.year}</td>
          </tr>
      )}
      </tbody>
      </>
    )
    const creatorsContent = (
      <>
        <thead>
          <tr>
            <th>Rank</th>
            <th>{settings.specialNames.creators[0].toUpperCase() + settings.specialNames.creators.slice(1,-1)}</th>
            <th>Years</th>
            <th>Works</th>
          </tr>
        </thead>
        <tbody>
        {filtered.map((entry,i) => (
          <tr key={'item' + i}>
            <td>{entry.rank}</td>
            <td>{entry.name}</td>
            <td>{entry.year === entry.endYear ? entry.year : entry.year + '–' + entry.endYear}</td>
            <td><em>{entry.works
              ? entry.works.join(', ')
              : ''}</em></td>
          </tr>
        )
        )}
        </tbody>
      </>
    )
      return(
        <table className='table'>
          {settings.media === 'works' ? worksContent : creatorsContent}
        </table>
      )
  }
  const compactView = () => (
    <section
    style={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
      {filtered.map((entry,i) => 
        <div
          style={{
            width: '150px',
            height: '50px',
            margin: '15px',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
          }}
          key={'item' + i}>
          <div 
            onClick={() => {
              settingsHandlers.restoreDefaults();
              if (settings.media === 'works') {
                settingsHandlers.setSelectedWork(entry.title);
              } else {
                settingsHandlers.setSelectedCreator(entry.name);
                
              }
            }}>
            {settings.media === 'works' ? entry.title : entry.name}</div>
        </div>
      )}
    </section>
  )

  return (
    <section className='section pt-0'>
      {settings.view === 'table' ? tableView() : compactView()}
    </section>
    );
}