import { ListControls } from './ListControls'

export const ListSelectors = ({ data, categories, displaySettings, utilities }) => {
    const { lists } = data;
    const { setLoading, setNewFilters } = data.handlers;
    const { mediaType, entryType } = categories;
    const { setMediaType, setEntryType, setList } = categories.handlers;
    const { setSelectedCreator } = displaySettings.handlers;
    const { specialNames } = utilities;
    return (
        <>
            <div className='mt-2'>
                <div className='is-inline buttons mr-2 mb-0 has-addons'>
                {Object.keys(lists).map(currentMediaType => (
                    <button
                    key={currentMediaType}
                    className={mediaType === currentMediaType ? 'button mb-0 is-primary' : 'button'}
                    onClick={() => {
                        const defaultLists = {
                            literature: 'greatestBooksFiction',
                            music: 'rs500Albums'
                        }
                        setMediaType(currentMediaType);
                        setList(defaultLists[currentMediaType]);
                        setSelectedCreator('');
                        setLoading(true);
                        }}>
                    {currentMediaType[0].toUpperCase() + currentMediaType.slice(1)}
                    </button>
                ))}
                </div>
                <div className='is-inline mx-2 mb-0 buttons has-addons'>
                {['works', 'creators'].map(currentEntryType => (
                    <button
                        key={currentEntryType}
                        className={entryType === currentEntryType ? 'button is-primary' : 'button'}
                        onClick={() => {
                            setEntryType(currentEntryType);
                            setNewFilters(true);
                            }}>
                    {specialNames[mediaType][currentEntryType][0].toUpperCase() + 
                    specialNames[mediaType][currentEntryType].slice(1)}
                </button>
                ))}
            </div>
                
            </div>
            <div className='my-3'>
                <ListControls 
                    data={data}
                    mediaType={mediaType} 
                    list={categories.list} 
                    setList={setList} 
                />
            </div>
        </>
    )
}