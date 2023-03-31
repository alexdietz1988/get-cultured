export const MediaTypeControls = ({ data, categories, displaySettings }) => {
    const { lists } = data;
    const { setLoading } = data.handlers;
    const { mediaType } = categories;
    const { setMediaType, setList, setEntryType } = categories.handlers;
    const { setSelectedCreator, setDateRange } = displaySettings.handlers;
    return (
        <>
            <div className='is-inline buttons mr-2 mb-0 has-addons'>
            {Object.keys(lists).map(currentMediaType => (
                <button
                key={currentMediaType}
                className={mediaType === currentMediaType ? 'button mb-0 is-primary' : 'button'}
                onClick={() => {
                    setMediaType(currentMediaType);
                    const newList = lists[currentMediaType].default;
                    setList(newList);
                    if (lists[currentMediaType].lists[newList].noCreators) {
                        setEntryType('works');
                    }
                    setDateRange({
                        start: lists[currentMediaType].lists[newList].startYear,
                        end: new Date().getFullYear()
                    })
                    setSelectedCreator('');
                    setLoading(true);
                    }}>
                {currentMediaType[0].toUpperCase() + currentMediaType.slice(1)}
                </button>
            ))}
            </div>
        </>
    )
}