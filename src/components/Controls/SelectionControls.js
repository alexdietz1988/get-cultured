export const SelectionControls = ({ data, categories, displaySettings, utilities }) => {
    const { setNewFilters } = data.handlers;
    const { setMediaType, setEntryType, setList } = categories.handlers;
    const { dateRangeDefault, displayYear, savedSettings } = utilities;
    const { dateRange, selectedCreator } = displaySettings;
    const { setDateRange, setSelectedCreator, setView } = displaySettings.handlers;
    const defaultDates = (dateRange.start === dateRangeDefault.start) && 
        (dateRange.end === dateRangeDefault.end);
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
                setMediaType(savedSettings.mediaType);
                setEntryType(savedSettings.entryType);
                setList(savedSettings.list);
                setDateRange(savedSettings.dateRange);
                setView(savedSettings.view);
                setNewFilters(true);
                }}>
                {selectedCreator}
                <button className="delete is-small"></button>
            </span>
        )
        : <></>;
    return (!defaultDates || selectedCreator) && (
            <>
                {selectedDateTag}
                {selectedCreatorTag}
            </>
        )
}
