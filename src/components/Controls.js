import { DateControls } from "./DateControls"

export const Controls = ({ settings, settingsHandlers, data }) => {
    return(
        <section className='section'>
            <div className='m-2'>
                <button
                    className={settings.mediaType === 'literature' ? 'button is-primary' : 'button'}
                    onClick={() => {settingsHandlers.restoreDefaults(); settingsHandlers.setMediaType('literature');}}>
                    Literature
                </button>
                <button
                    className={settings.mediaType === 'music' ? 'button is-primary' : 'button'}
                    onClick={() => {settingsHandlers.restoreDefaults(); settingsHandlers.setMediaType('music');}}>
                    Music
                </button>
            </div>
            {settings.mediaType === 'literature' 
                ? (
                    <div className='m-2'>
                        <button
                            className={settings.genre === 'fiction' ? 'button is-primary' : 'button'}
                            onClick={() => {settingsHandlers.restoreDefaults(); settingsHandlers.setGenre('fiction'); }}>
                            Fiction
                        </button>
                        <button
                            className={settings.genre === 'nonfiction' ? 'button is-primary' : 'button'}
                            onClick={() => {settingsHandlers.restoreDefaults(); settingsHandlers.setGenre('nonfiction');}}>
                            Nonfiction
                        </button>
                    </div>
                )
                : null}
            <div className='m-2'>
                <button
                    className={settings.media === 'works' ? 'button is-primary' : 'button'}
                    onClick={() => {settingsHandlers.restoreDefaults(); settingsHandlers.setMedia('works');}}>
                    {settings.specialNames.works[0].toUpperCase() + settings.specialNames.works.slice(1)}
                </button>
                <button
                    className={settings.media === 'creators' ? 'button is-primary' : 'button'}
                    onClick={() => {settingsHandlers.restoreDefaults(); settingsHandlers.setMedia('creators');}}>
                    {settings.specialNames.creators[0].toUpperCase() + settings.specialNames.creators.slice(1)}
                </button>
            </div>
            <DateControls
                settings={settings}
                settingsHandlers={settingsHandlers}
                data={data} />
            <div className='m-2'>
                <button
                    className={settings.view === 'table' ? 'button is-primary' : 'button'}
                    onClick={() => {settingsHandlers.setView('table'); settingsHandlers.setDisplayLimit(25);}}>
                    Table View
                </button>
                <button
                    className={settings.view === 'compact' ? 'button is-primary' : 'button'}
                    onClick={() => {settingsHandlers.setView('compact'); settingsHandlers.setDisplayLimit(50);}}>
                    Compact View
                </button>
            </div>
            { settings.selectedCreator
            ? (
                <button className='tag m-2' onClick={() => settingsHandlers.setSelectedCreator('')}>
                    {settings.selectedCreator}
                </button>
            )
            : null}
            { settings.selectedWork
            ? (
                <button className='tag m-2' onClick={() => settingsHandlers.setSelectedWork('')}>
                    {settings.selectedWork}
                </button>
            )
            : null}
        </section>
    )
}
