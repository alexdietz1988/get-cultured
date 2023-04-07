import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const ListControls = ({ data, mediaType, list, setList, utilities }) => {
    const { setLoading } = data.handlers;
    const { listMetadata } = utilities;
    const listsInMediaType = {};
    for (let element in listMetadata) {
        if (listMetadata[element].mediaType === mediaType) {
            listsInMediaType[element] = listMetadata[element];
        }
    }
    const currentListMetadata = listMetadata[list];
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
                        {currentListMetadata.label 
                            ? currentListMetadata.label 
                            : currentListMetadata[0].toUpperCase() + currentListMetadata.slice(1)}
                    </span> 
                    <i><FontAwesomeIcon icon={faChevronDown}/></i>
                </button>
            </div>
            <div className='dropdown-menu' id='dropdown-menu' role='menu'>
                <div className='dropdown-content'>
                    {Object.keys(listsInMediaType).map(item => (
                        <a
                            key={item}
                            className={'dropdown-item ' + (currentListMetadata === item && 'is-active')}
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
            {(currentListMetadata.about || currentListMetadata.url) && 
                <p className='is-size-6 has-text-weight-light p-2'>
                    {currentListMetadata.about && 
                        <span className='mr-1'>{currentListMetadata.about}</span>}
                    {currentListMetadata.url && 
                        <span>(<a href={currentListMetadata.url}>Source</a>)</span>}
                </p>
            }
        </>
    )
}