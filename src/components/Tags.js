export const Tags = ({ data, categories, displaySettings, utilities }) => {
    const { setNewFilters } = data.handlers;
    const { setMediaType, setEntryType, setList } = categories.handlers;
    const { dateRangeDefault, displayYear, savedSettings } = utilities;
    const { dateRange, selectedCreator } = displaySettings;
    const { setDateRange, setSelectedCreator, setView } = displaySettings.handlers;
    const defaultDates = (dateRange.start === dateRangeDefault.start) && 
        (dateRange.end === dateRangeDefault.end);
    function returnToSavedSettings() {
        setMediaType(savedSettings.mediaType);
        setEntryType(savedSettings.entryType);
        setList(savedSettings.list);
        setDateRange(savedSettings.dateRange);
        setView(savedSettings.view);
    }
    const selectedDateTag = !defaultDates
        ? (
            <span 
                className='tag is-medium is-warning mr-2'
                onClick={() => {
                    setDateRange(dateRangeDefault);
                    setNewFilters(true);
                    }}>
                {dateRange.end === dateRange.start + 1 
                    ? displayYear(dateRange.start) 
                    : displayYear(dateRange.start) + '–' + displayYear(dateRange.end)}
                <button className="delete is-small"></button>
            </span>
        )
        : <></>;
    const selectedCreatorTag = selectedCreator
        ? (
            <span className='tag is-medium is-warning mr-2' onClick={() => {
                setSelectedCreator('');
                returnToSavedSettings();
                setNewFilters(true);
                }}>
                {selectedCreator}
                <button className="delete is-small"></button>
            </span>
        )
        : <></>;
    const tags = (
        <>
            {selectedDateTag}
            {selectedCreatorTag}
        </>
    )
    return (defaultDates && selectedCreator === '') ? <></> : tags;
}
