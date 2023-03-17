export function DateControls({settings, settingsHandlers, data}) {
    function isEmpty(start, end) {
        for (let entry of data) {
            if (entry.year >= start && entry.year <= end) {
                return false;
            }
        }
        return true;
    }

    function dateButtons(range) {
        const contextStart = Math.floor(settings.dateRange.start/(range * 10)) * range * 10;
        const contextRange = {
            start: contextStart,
            end: contextStart + range * 10
        }
        if (range === 100) {
            contextRange.start = settings.dateRangeDefault.start;
            contextRange.end = settings.dateRangeDefault.end;
        }
        if (settings.mediaType ==='literature' && range === 100) {
            contextRange.start = 1500;
        }
        if (settings.mediaType === 'music' && range === 10) {
            contextRange.start = 1900;
            contextRange.end = settings.dateRangeDefault.end;
        }
        const buttons = [];
        for (let i = contextRange.start; i < contextRange.end; i += range) {
            if (!isEmpty(i, i + range)) {
                const isSelected = settings.dateRange.start >= i && settings.dateRange.end <= i + range;
                const reset = range === 100
                    ? settings.dateRangeDefault
                    : {start: contextRange.start, end: contextRange.end};
                buttons.push(
                    <button
                        key={range + '-' + i}
                        className={isSelected ? 'button is-primary' : 'button'}
                        onClick={() => settingsHandlers.setDateRange(isSelected ? reset : {start: i, end: i + range} )}
                    >
                        {range >= 10 ? i + 's' : i}
                    </button>)
            }
        }
        return buttons;
    }
    return(
        <div className='m-2'>
            {settings.mediaType === 'literature'
                ? (
            <div className='m-2'>
                <button
                    key={'earlier'}
                    className={settings.dateRange.end <= 1500 ? 'button is-primary' : 'button'}
                    onClick={() => settingsHandlers.setDateRange(settings.dateRange.end <= 1500
                        ? settings.dateRangeDefault
                        : {start: settings.dateRangeDefault.start, end: 1500} )}
                >
                    Earlier
                </button>
                {dateButtons(100)}
            </div>
            )
            : null}
            <div className='m-2'>{settings.dateRange.end - settings.dateRange.start <= 100 || settings.mediaType === 'music'
                ? dateButtons(10)
                : null}</div>
            <div className='m-2'>{settings.dateRange.end - settings.dateRange.start <= 10 ? dateButtons(1) : null}</div>
        </div>
    )
}