import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const ListControls = ({ data, mediaType, list, setList }) => {
    const { lists } = data;
    const { setLoading } = data.handlers;
    const listsInMediaType = lists[mediaType].lists;
    const currentList = listsInMediaType[list];
    const [dropdownToggle, setDropdownToggle] = useState('');
    return (
        <>
            <div className={'dropdown ' + dropdownToggle}>
            <div className='dropdown-trigger'>
                <button 
                    className='button is-primary'
                    aria-haspopup='true'
                    aria-controls='dropdown-menu'
                    onClick={() => setDropdownToggle(dropdownToggle === 'is-active' ? '' : 'is-active')}
                    >
                    <span className='mr-1'>
                        {currentList.label 
                            ? currentList.label 
                            : currentList[0].toUpperCase() + currentList.slice(1)}
                    </span> 
                    <i><FontAwesomeIcon icon={faChevronDown}/></i>
                </button>
            </div>
            <div className='dropdown-menu' id='dropdown-menu' role='menu'>
                <div className='dropdown-content'>
                    {Object.keys(listsInMediaType).map(item => (
                        <a
                            key={item}
                            className={'dropdown-item ' + (currentList === item && 'is-active')}
                            onClick={() => {
                                setList(item);
                                setLoading(true);
                            }}>
                            {listsInMediaType[item].label 
                                ? listsInMediaType[item].label 
                                : listsInMediaType[0].toUpperCase() + listsInMediaType.slice(1)}
                        </a>))}
                </div>
            </div>
        </div>  
            {(currentList.about || currentList.url) && 
                <p className='is-size-6 has-text-weight-light p-2'>
                    {currentList.about && 
                        <span className='mr-1'>{currentList.about}</span>}
                    {currentList.url && 
                        <span>(<a href={currentList.url}>Source</a>)</span>}
                </p>
            }
        </>
    )
}