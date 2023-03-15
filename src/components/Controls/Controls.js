import { DateControls } from "./DateControls"
import { ListControls } from "./ListControls";
import { SelectionControls } from "./SelectionControls";

export const Controls = ({ lists, entries, categories, displaySettings, utilities }) => {
    const { mediaType, entryType } = categories;
    const { setMediaType, setEntryType, setList } = categories.handlers;
    const { view } = displaySettings;
    const { setView, setDisplayLimit, setSelectedCreator } = displaySettings.handlers;
    const { specialNames } = utilities;
    return(
        <section className='section'>
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
                            }}>
                    {specialNames[mediaType][currentEntryType][0].toUpperCase() + 
                    specialNames[mediaType][currentEntryType].slice(1)}
                </button>
                ))}
                </div>
                
            </div>
            <div className='my-3'>
                <ListControls 
                    lists={lists} 
                    mediaType={mediaType} 
                    list={categories.list} 
                    setList={setList} 
                />
            </div>
            <div className='mt-4 mb-3'>
                <DateControls
                    entries={entries}
                    categories={categories}
                    displaySettings={displaySettings}
                    utilities={utilities}
                />
            </div>
            <div className='my-3'>
                <div className='buttons has-addons'>
                {['compact', 'table'].map(currentView => (
                    <button
                        key={currentView}
                        className={view === currentView ? 'button is-primary' : 'button'}
                        onClick={() => {
                            setView(currentView);
                            setDisplayLimit(currentView === 'compact' ? 50 : 25);
                            }}>
                    {currentView[0].toUpperCase() + currentView.slice(1)} View
                    </button>
                ))}
                </div>
            </div>
            <div className='my-3'>
                <SelectionControls
                    categories={categories}
                    displaySettings={displaySettings}
                    utilities={utilities} 
                />
            </div>
        </section>
    )
}
