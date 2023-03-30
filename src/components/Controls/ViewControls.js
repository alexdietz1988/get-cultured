export const ViewControls = ({ data, list, categories, displaySettings }) => {
    const { lists } = data;
    const { setNewFilters } = data.handlers;
    const { entryType, mediaType } = categories;
    const { setEntryType } = categories.handlers;
    const { view } = displaySettings;
    const { setView, setDisplayLimit } = displaySettings.handlers;
    const currentList = lists[mediaType].lists[list];
    return (
        <>
            {!currentList.noCreators &&
            <div className='is-inline mr-4 mb-0 buttons has-addons'>
            {['works', 'creators'].map(currentEntryType => 
                <button
                    key={currentEntryType}
                    className={entryType === currentEntryType ? 'button is-primary' : 'button'}
                    onClick={() => {
                        setEntryType(currentEntryType);
                        setNewFilters(true);
                        }}>
                {lists[mediaType].specialNames[currentEntryType][0].toUpperCase() + 
                    lists[mediaType].specialNames[currentEntryType].slice(1)}
            </button>
            )}
            </div>
            }
            <div className='is-inline buttons has-addons'>
            {['compact', 'table'].map(currentView => (
                <button
                    key={currentView}
                    className={view === currentView ? 'button is-primary' : 'button'}
                    onClick={() => {
                        setView(currentView);
                        setDisplayLimit(currentView === 'compact' ? 50 : 25);
                        }}>
                {currentView[0].toUpperCase() + currentView.slice(1)}
                </button>
            ))}
            </div>
        </>
    )
}
