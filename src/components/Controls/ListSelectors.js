import { ListControls } from './ListControls'

export const ListSelectors = ({ data, categories, displaySettings }) => {
    const { lists } = data;
    const { setLoading } = data.handlers;
    const { mediaType } = categories;
    const { setMediaType, setList } = categories.handlers;
    const { setSelectedCreator } = displaySettings.handlers;
    return (
        <>
            <div className='mt-2'>
                <div className='is-inline buttons mr-2 mb-0 has-addons'>
                {Object.keys(lists).map(currentMediaType => (
                    <button
                    key={currentMediaType}
                    className={mediaType === currentMediaType ? 'button mb-0 is-primary' : 'button'}
                    onClick={() => {
                        setMediaType(currentMediaType);
                        setList(lists[currentMediaType].default);
                        setSelectedCreator('');
                        setLoading(true);
                        }}>
                    {currentMediaType[0].toUpperCase() + currentMediaType.slice(1)}
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