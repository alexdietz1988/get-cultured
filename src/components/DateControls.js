export function DateControls({dateRangeDefault, dateRange, setDateRange, data}) {
    function isEmpty(start, end) {
        for (let entry of data) {
            if (entry.year >= start && entry.year <= end) {
                return false;
            }
        }
        return true;
    }

    function dateButtons(range) {
        const contextStart = Math.floor(dateRange.start/(range * 10)) * range * 10
        const contextRange = {
            start: range === 100
                ? dateRangeDefault.start
                : contextStart,
            end: range === 100
                ? dateRangeDefault.end
                : contextStart + range * 10
        }
        const buttons = [];
        for (let i = contextRange.start; i < contextRange.end; i += range) {
            if (!isEmpty(i, i + range)) {
                const isSelected = dateRange.start >= i && dateRange.end <= i + range;
                const reset = range === 100
                    ? dateRangeDefault
                    : {start: contextRange.start, end: contextRange.end};
                buttons.push(
                    <button
                        key={range + '-' + i}
                        className={isSelected ? 'button is-primary' : 'button'}
                        onClick={() => setDateRange(isSelected ? reset : {start: i, end: i + range} )}
                    >
                        {range >= 10 ? i + 's' : i}
                    </button>)
            }
        }
        return buttons;
    }
    return(
        <div className='m-2'>
            <div className='m-2'>{dateButtons(100)}</div>
            <div className='m-2'>{dateRange.end - dateRange.start <= 100 ? dateButtons(10) : null}</div>
            <div className='m-2'>{dateRange.end - dateRange.start <= 10 ? dateButtons(1) : null}</div>
        </div>
    )
}