import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export const ListControls = ({ data, mediaType, list, setList }) => {
    const { lists } = data;
    const { setLoading } = data.handlers;
    const [dropdownToggle, setDropdownToggle] = useState('');
    const currentList = lists[mediaType].lists[list];
    return (
        <div>
            <div className={'dropdown ' + dropdownToggle}>
                <div className='dropdown-trigger'>
                    <button 
                        className='button is-info is-light'
                        aria-haspopup='true'
                        aria-controls='dropdown-menu'
                        onClick={() => setDropdownToggle(dropdownToggle === 'is-active' ? '' : 'is-active')}>
                        <span className='mr-1'>
                            <b className='mr-1'>List:</b>
                            <span>{currentList.label}</span>
                        </span>
                        <i>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </i>
                    </button>
                </div>
                <div className='dropdown-menu' id='dropdown-menu' role='menu'>
                    <div className='dropdown-content'>
                        {Object.keys(lists[mediaType].lists).length > 1
                            ? Object.keys(lists[mediaType].lists).map(thisList => (
                                <a
                                    key={thisList}
                                    className={list === thisList
                                        ? 'dropdown-item is-active'
                                        : 'dropdown-item'}
                                    onClick={() => {
                                        setList(thisList);
                                        setLoading(true);
                                        setDropdownToggle('');
                                        }}>
                                    {lists[mediaType].lists[thisList].label}
                                </a>)
                                )
                            : <a className='dropdown-item is-size-7'>This is the only list currently available</a>
                            }
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
            
        </div>
    )
}