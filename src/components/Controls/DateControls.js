export const DateControls = ({ data, categories, displaySettings, utilities }) => {
    const { setNewFilters } = data.handlers;
    const { mediaType, entryType } = categories;
    const { dateRange } = displaySettings;
    const { setDateRange } = displaySettings.handlers;
    const { dateRangeDefault } = utilities;
    const entries = data.entries[entryType];
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
        const contextStart = Math.floor(dateRange.start/(range * 10)) * range * 10;
        const contextRange = {
            start: contextStart,
            end: contextStart + range * 10
        }
        if (range === 100) {
            contextRange.start = dateRangeDefault.start;
            contextRange.end = dateRangeDefault.end;
        }
        if (mediaType ==='literature' && range === 100) {
            contextRange.start = 1500;
        }
        if (mediaType === 'music' && range === 10) {
            contextRange.start = 1900;
            contextRange.end = dateRangeDefault.end;
        }
        const buttons = [];
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
            {mediaType === 'literature' && (
            <div className='buttons mb-0 has-addons'>
                <button
                    key={'earlier'}
                    className={dateRange.end <= 1500 ? 'button is-primary' : 'button'}
                    onClick={() => {
                        const newDateRange = dateRange.end <= 1500
                            ? dateRangeDefault
                            : { start: dateRangeDefault.start, end: 1500 }
                        setDateRange(newDateRange);
                        setNewFilters(true);
                    }}
                >
                    Earlier
                </button>
                {dateButtons(100)}
            </div>
            )}
            <div className='buttons mb-0 has-addons'>
                {dateRange.end - dateRange.start <= 100 || mediaType === 'music' ? dateButtons(10) : <></>}
            </div>
            <div className='buttons mb-0 has-addons'>
                {dateRange.end - dateRange.start <= 10 ? dateButtons(1) : <></>}
            </div>
        </div>
    )
}