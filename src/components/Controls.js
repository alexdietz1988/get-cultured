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
                <div className='is-inline mr-2 buttons has-addons'>
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
                        <div className='is-inline mx-2 buttons has-addons'>
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
                <div className='is-inline ml-2 buttons has-addons'>
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
            </div>
            <div className='m-2'>
                <DateControls
                    settings={settings}
                    settingsHandlers={settingsHandlers}
                    data={data} />
            </div>
            <div className='m-2'>
                <div className='buttons has-addons'>
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
            </div>
            { selectedCreator
            ? (
                <span className='tag is-medium is-warning m-2' onClick={() => setSelectedCreator('')}>
                    {selectedCreator}
                    <button class="delete is-small"></button>
                </span>
            )
            : null}
            { selectedWork
            ? (
                <button className='tag is-medium is-warning m-2' onClick={() => setSelectedWork('')}>
                    {selectedWork}
                    <button class="delete is-small"></button>
                </button>
            )
            : null}
        </section>
    )
}
