import { DateControls } from "./DateControls"

export const Controls = ({ settings, settingsHandlers, data }) => {
    const { 
        mediaType, 
        media, 
        genre, 
        view, 
        selectedCreator, 
        selectedWork, 
        specialNames 
    } = settings;
    const { 
        restoreDefaults, 
        setMediaType, 
        setMedia, 
        setGenre, 
        setSelectedCreator, 
        setSelectedWork,
        setDisplayLimit, 
        setView
    } = settingsHandlers;

    return(
        <section className='section'>
            <div className='m-2'>
                <button
                    className={mediaType === 'literature' ? 'button is-primary' : 'button'}
                    onClick={() => {restoreDefaults(); setMediaType('literature');}}>
                    Literature
                </button>
                <button
                    className={mediaType === 'music' ? 'button is-primary' : 'button'}
                    onClick={() => {restoreDefaults(); setMediaType('music');}}>
                    Music
                </button>
            </div>
            {mediaType === 'literature' 
                ? (
                    <div className='m-2'>
                        <button
                            className={genre === 'fiction' ? 'button is-primary' : 'button'}
                            onClick={() => {restoreDefaults(); setGenre('fiction'); }}>
                            Fiction
                        </button>
                        <button
                            className={genre === 'nonfiction' ? 'button is-primary' : 'button'}
                            onClick={() => {restoreDefaults(); setGenre('nonfiction');}}>
                            Nonfiction
                        </button>
                    </div>
                )
                : null}
            <div className='m-2'>
                <button
                    className={media === 'works' ? 'button is-primary' : 'button'}
                    onClick={() => {restoreDefaults(); setMedia('works');}}>
                    {specialNames.works[0].toUpperCase() + specialNames.works.slice(1)}
                </button>
                <button
                    className={media === 'creators' ? 'button is-primary' : 'button'}
                    onClick={() => {restoreDefaults(); setMedia('creators');}}>
                    {specialNames.creators[0].toUpperCase() + specialNames.creators.slice(1)}
                </button>
            </div>
            <DateControls
                settings={settings}
                settingsHandlers={settingsHandlers}
                data={data} />
            <div className='m-2'>
                <button
                    className={view === 'table' ? 'button is-primary' : 'button'}
                    onClick={() => {setView('table'); setDisplayLimit(25);}}>
                    Table View
                </button>
                <button
                    className={view === 'compact' ? 'button is-primary' : 'button'}
                    onClick={() => {setView('compact'); setDisplayLimit(50);}}>
                    Compact View
                </button>
            </div>
            { selectedCreator
            ? (
                <button className='tag m-2' onClick={() => setSelectedCreator('')}>
                    {selectedCreator}
                </button>
            )
            : null}
            { selectedWork
            ? (
                <button className='tag m-2' onClick={() => setSelectedWork('')}>
                    {selectedWork}
                </button>
            )
            : null}
        </section>
    )
}
