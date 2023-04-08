import { useEffect, useState } from "react";

import { EntriesCompact } from "./EntriesCompact";
import { EntriesTable } from "./EntriesTable";

export const EntriesDisplay = ({ data, categories, displaySettings, utilities, userData }) => {
  const { entriesFiltered, newFilters } = data;
  const { backend, userId, savedWorks, getSavedWorks } = userData;
  const { mediaType, entryType } = categories;
  const { view } = displaySettings;
  const { displayYear } = utilities;
  const specialNames = utilities.mediaTypes[mediaType].specialNames;
  const creatorName = specialNames.creators;
  const workName = specialNames.works;
  const [displayLimit, setDisplayLimit] = useState(25);
  useEffect(() => setDisplayLimit(25), [newFilters])
  const displayYearRange = (year, endYear) => {
    if (year === endYear) {
      return displayYear(year);
    } else if (year < 0 && endYear < 0) {
      return `${Math.abs(year)}–${Math.abs(endYear)} BC`;
    } else {
      return `${displayYear(year)}–${displayYear(endYear)}`;
    }
  }
  const isFinished = entry => {
    const { title, creator, year } = entry;
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
  const loadMoreButton = (
    <div className={'container is-flex is-justify-content-center is-align-items-center'}>
      <button className='button' onClick={() => setDisplayLimit(displayLimit + 50)}>
        Load more
      </button>
    </div>
  )
  const displayProps = {renderFinishedStatus, isFinished, displayLimit, setDisplayLimit, displayYearRange, loadMoreButton };
return (
    <section className='section pt-0'>
      {entryType === 'creators' &&
        <p className='is-size-7 ml-3'>Rank (e.g. "#1") is that of {creatorName.slice(0,-1)}'s highest ranked work.
        Dates are those of the {creatorName.slice(0,-1)}'s {workName} in the current list.</p>}
      {(entriesFiltered.length > 0) && (
          <>
            {view === 'table' 
              ? <EntriesTable 
                  categories={categories}
                  data={data}
                  displaySettings={displaySettings}
                  utilities={utilities}
                  displayProps={displayProps}
                  />
              : <EntriesCompact 
                  categories={categories}
                  data={data}
                  displaySettings={displaySettings}
                  utilities={utilities}
                  displayProps={displayProps}
                  />}
          </>
        )
      }
    </section>
    );
}