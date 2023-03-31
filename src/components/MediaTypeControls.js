import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const MediaTypeControls = ({ data, categories, displaySettings }) => {
    const { lists } = data;
    const { setLoading } = data.handlers;
    const { mediaType } = categories;
    const { setMediaType, setList, setEntryType } = categories.handlers;
    const { setSelectedCreator, setDateRange } = displaySettings.handlers;
    const [dropdownToggle, setDropdownToggle] = useState('');
    function handleSelect(currentMediaType) {
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
    }
    return (
        <>
            <div className={'mobile-only dropdown ' + dropdownToggle}>
                <div className='dropdown-trigger'>
                    <button 
                        className='button is-primary'
                        aria-haspopup='true'
                        aria-controls='dropdown-menu'
                        onClick={() => setDropdownToggle(dropdownToggle === 'is-active' ? '' : 'is-active')}>
                        <span className='mr-1'>
                            <span>{mediaType[0].toUpperCase() + mediaType.slice(1)}</span>
                        </span>
                        <i><FontAwesomeIcon icon={faChevronDown} /></i>
                    </button>
                </div>
                <div className='dropdown-menu' id='dropdown-menu' role='menu'>
                    <div className='dropdown-content'>
                        {Object.keys(lists).map(item => (
                            <a
                                key={item}
                                className={'dropdown-item ' + (mediaType === item && 'is-active')}
                                onClick={() => handleSelect(item)}>
                                {lists[item].label ? lists[item].label : item[0].toUpperCase() + item.slice(1)}
                            </a>))}
                    </div>
                </div>
            </div> 
            <div className='desktop-only is-inline buttons mr-2 has-addons'>
            {Object.keys(lists).map(currentMediaType => (
                <button
                key={currentMediaType}
                className={'button ' + (mediaType === currentMediaType && 'is-primary')}
                onClick={() => handleSelect(currentMediaType)}>
                {currentMediaType[0].toUpperCase() + currentMediaType.slice(1)}
                </button>
            ))}
            </div>

             
        </>
    )
}