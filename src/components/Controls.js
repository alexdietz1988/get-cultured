import { DateControls } from "./DateControls"

export function Controls({
        mediaType,
        setMediaType,
        genre,
        setGenre,
        media,
        setMedia,
        data,
        dateRangeDefault,
        dateRange,
        setDateRange
    }) {
    function renderButton(buttonName) {
        const lookup = {
            'literature': [mediaType, setMediaType],
            'music': [mediaType, setMediaType],
            'fiction': [genre, setGenre],
            'nonfiction': [genre, setGenre],
            'works': [media, setMedia],
            'creators': [media, setMedia],
        }
        const [classChecker, onClickHandler] = [lookup[buttonName][0], lookup[buttonName][1]];
        const specialNames = {
            'works': {literature: 'Books', music: 'Albums'},
            'creators': {literature: 'Authors', music: 'Artists'}
        }
        const displayName = buttonName === 'works' || buttonName === 'creators'
            ? specialNames[buttonName][mediaType]
            : buttonName[0].toUpperCase() + buttonName.slice(1);
        return(
            <button
                className={classChecker === buttonName ? 'button is-primary' : 'button'}
                onClick={() => onClickHandler(buttonName)}
            >
                {displayName}
            </button>
        )
    }

    return(
        <section className='section'>
            <div className='m-2'>
                {renderButton('literature')}
                {renderButton('music')}
            </div>
            {mediaType === 'literature' 
                ? <>{renderButton('fiction')}{renderButton('nonfiction')}</>
                : null}
            <div className='m-2'>
                {renderButton('works')}
                {renderButton('creators')}
            </div>
            <DateControls dateRangeDefault={dateRangeDefault} dateRange={dateRange} setDateRange={setDateRange} data={data} />
        </section>
    )
}
