import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const DateControls = ({ data, categories, displaySettings, utilities, range, elementType }) => {
    const { lists } = data;
    const { setNewFilters } = data.handlers;
    const { list, mediaType, entryType } = categories;
    const { dateRange } = displaySettings;
    const { setDateRange, setSelectedCreator } = displaySettings.handlers;
    const { dateRangeDefault, datesAreDefault } = utilities;
    const entries = data.entries[entryType];
    const currentList = lists[mediaType].lists[list];
    const shortTimePeriod = dateRangeDefault.end - currentList.startYear < 100;
    const [dropdownToggle, setDropdownToggle] = useState('');
    const isEmpty = (start, end) => {
        if (!entries) {
            return true;
        }
        for (let entry of entries) {
            if (entry.year >= start && entry.year <= end) {
                return false;
            }
        }
        return true;
    }
    const buttons = [];
    const dropdownItems = [];
    const contextStart = Math.floor(dateRange.start/(range * 10)) * range * 10;
    const contextRange = {
        start: contextStart,
        end: contextStart + range * 10
    }
    if (range === 100) {
        contextRange.start = dateRangeDefault.start;
        contextRange.end = dateRangeDefault.end;
    }
    if (currentList.startYear < 1500 && range === 100) {
        contextRange.start = 1500;
        const label = 'Earlier';
        const handleSelect = () => {
            const newDateRange = dateRange.end <= 1500
                ? dateRangeDefault
                : { start: dateRangeDefault.start, end: 1500 }
            setDateRange(newDateRange);
            setSelectedCreator('');
            setDropdownToggle('');
            setNewFilters(true);
        }
        buttons.push(
            <button
                key={label.toLowerCase()}
                className={'button ' + (dateRange.end <= 1500 && 'is-primary')}
                onClick={handleSelect}>
                {label}
            </button>)
        dropdownItems.push(
            <a
                key={label.toLowerCase()}
                className={'dropdown-item ' + (dateRange.end <= 1500 && 'is-active')}
                onClick={handleSelect}>
                {label}
            </a>
        )
    }
    if (shortTimePeriod && range === 10) {
        contextRange.start = Math.floor(currentList.startYear/10) * 10;
        contextRange.end = dateRangeDefault.end;
    }
    for (let i = contextRange.start; i < contextRange.end; i += range) {
        if (!isEmpty(i, i + range)) {
            const isSelected = dateRange.start >= i && dateRange.end <= i + range;
            const reset = range === 100
                ? dateRangeDefault
                : { start: contextRange.start, end: contextRange.end  };
            const key = range + '-' + i;
            const label = i + (range >= 10 && 's');
            const handleSelect = () => {
                const newDateRange = {start: i, end: i + range};
                setDateRange(isSelected ? reset : newDateRange);
                setSelectedCreator('');
                setNewFilters(true);
                setDropdownToggle('');
            }
            buttons.push(
                <button
                    key={key}
                    className={'button ' + (isSelected && 'is-primary')}
                    onClick={handleSelect}
                >
                    {label}
                </button>)
            dropdownItems.push(
                <a
                    key={key}
                    className={'dropdown-item ' + (isSelected && 'is-active')}
                    onClick={handleSelect}>
                    {label}
                </a>
            )
        }
    }
    function dropdownLabel() {
        const rangeNames = {100: 'Century', 10: 'Decade', 1: 'Year'};
        if ((range === 100 && datesAreDefault) || (range < 100 && dateRange.end - dateRange.start > range)) {
            return rangeNames[range];
        }
        let prefix = `${rangeNames[range]}: `;
        if (dateRange.end === 1500) {
            return prefix + 'Pre-1500';
        }
        return Math.floor(dateRange.start/(range)) * range + (range > 1 ? 's' : '');
    }
    return elementType === 'dropdown' 
        ? (
            <div className={'dropdown mr-2 ' + dropdownToggle}>
                <div className='dropdown-trigger'>
                    <button 
                        className='button is-primary'
                        aria-haspopup='true'
                        aria-controls='dropdown-menu'
                        onClick={() => setDropdownToggle(dropdownToggle === 'is-active' ? '' : 'is-active')}>
                        <span className='mr-1'>
                            <span>{dropdownLabel()}</span>
                        </span>
                        <i>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </i>
                    </button>
                </div>
                <div className='dropdown-menu' id='dropdown-menu' role='menu'>
                    <div className='dropdown-content'>
                        {dropdownItems}
                    </div>
                </div>
            </div>
        )
        : <div className='buttons mb-0 has-addons is-block'>{buttons}</div>
    ;
}