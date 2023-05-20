import { useEffect, useState } from "react";

import { EntriesCompact } from "./EntriesCompact";
import { EntriesTable } from "./EntriesTable";

export const EntriesDisplay = ({ data, categories, displaySettings, utilities, userData }) => {
  const { entriesFiltered, newFilters } = data;
  const { backend, userId, savedWorks, getSavedWorks } = userData;
  const { mediaType, entryType } = categories;
  const { view, finishedFilter, setFinishedFilter } = displaySettings;
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
    if (userId === '') return <></>;
    return (
      <div 
          className={'tag is-info ' + (!isFinished(title, creator, year) && 'is-light')}
          onClick={() => isFinished(title, creator, year)
            ? markAsUnfinished(title, creator, year)
            : markAsFinished(title, creator, year)}>
          ✓
        </div>
    );
  }
  const loadMoreButton = (
    <button className='button' onClick={() => setDisplayLimit(displayLimit + 50)}>
      Load more
    </button>
  )
  const hideEntry = entry => {
    return (
        entryType === 'works' && 
        (isFinished(entry) && finishedFilter === 'onlyUnfinished') ||
        (!isFinished(entry) && finishedFilter === 'onlyFinished')
    )
  }
  const hiddenMessage = <span>Some works are being hidden by your filters. <a onClick={() => setFinishedFilter('all')}>Reset filters.</a></span>;
  const displayProps = {renderFinishedStatus, isFinished, hideEntry, displayLimit, setDisplayLimit, displayYearRange, loadMoreButton, hiddenMessage };
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