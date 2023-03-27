import { DateControls } from "./DateControls"
import { SelectionControls } from "./SelectionControls";

export const Controls = ({ data, categories, displaySettings, utilities }) => {
    const { view } = displaySettings;
    const { setView, setDisplayLimit } = displaySettings.handlers;
    return (
        <>
            <div className='mt-4 mb-3'>
                <DateControls
                    data={data}
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
                    data={data}
                    categories={categories}
                    displaySettings={displaySettings}
                    utilities={utilities} 
                />
            </div>
        </>
    )
}
