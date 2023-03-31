export const DateControls = ({ data, categories, displaySettings, utilities }) => {
    const { lists } = data;
    const { setNewFilters } = data.handlers;
    const { list, mediaType, entryType } = categories;
    const { dateRange } = displaySettings;
    const { setDateRange, setSelectedCreator } = displaySettings.handlers;
    const { dateRangeDefault } = utilities;
    const entries = data.entries[entryType];
    const currentList = lists[mediaType].lists[list]
    const shortTimePeriod = dateRangeDefault.end - currentList.startYear < 100;
    const isEmpty = (start, end) => {
        if (!entries) {
            return true;
        }
        for (let entry of entries) {
            if (entry.year >= start && entry.year <= end) {
                return false;
            }
        }
        return true;
    }
    const dateButtons = range => {
        const buttons = [];
        const contextStart = Math.floor(dateRange.start/(range * 10)) * range * 10;
        const contextRange = {
            start: contextStart,
            end: contextStart + range * 10
        }
        if (range === 100) {
            contextRange.start = dateRangeDefault.start;
            contextRange.end = dateRangeDefault.end;
        }
        if (currentList.startYear < 1500 && range === 100) {
            contextRange.start = 1500;
            buttons.push(
                <button
                key={'earlier'}
                className={dateRange.end <= 1500 ? 'button is-primary' : 'button'}
                onClick={() => {
                    const newDateRange = dateRange.end <= 1500
                        ? dateRangeDefault
                        : { start: dateRangeDefault.start, end: 1500 }
                    setDateRange(newDateRange);
                    setSelectedCreator('');
                    setNewFilters(true);
                }}>
                Earlier
                </button>);
        }
        if (shortTimePeriod && range === 10) {
            contextRange.start = Math.floor(currentList.startYear/10) * 10;
            contextRange.end = dateRangeDefault.end;
        }
        for (let i = contextRange.start; i < contextRange.end; i += range) {
            if (!isEmpty(i, i + range)) {
                const isSelected = dateRange.start >= i && dateRange.end <= i + range;
                const reset = range === 100
                    ? dateRangeDefault
                    : { start: contextRange.start, end: contextRange.end  };
                buttons.push(
                    <button
                        key={range + '-' + i}
                        className={isSelected ? 'button is-primary' : 'button'}
                        onClick={() => {
                            setDateRange(isSelected ? reset : {start: i, end: i + range});
                            setSelectedCreator('');
                            setNewFilters(true);
                        }}
                    >
                        {range >= 10 ? i + 's' : i}
                    </button>)
            }
        }
        return buttons;
    }
    return(
        <div>
            {!shortTimePeriod && (
                <div className='buttons mb-0 has-addons'>
                    {dateButtons(100)}
                </div>
            )}
            {(dateRange.end - dateRange.start <= 100 || shortTimePeriod) && (
                <div className='buttons mb-0 has-addons'>
                    {dateButtons(10)}
                </div>
            )}
            {dateRange.end - dateRange.start <= 10 && (
                <div className='buttons mb-0 has-addons'>
                    {dateButtons(1)}
                </div>
            )}
        </div>
    )
}