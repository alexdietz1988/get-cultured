import { useState } from "react";

export const ListControls = ({ data, mediaType, list, setList }) => {
    const { lists } = data;
    const { setLoading } = data.handlers;
    const [dropdownToggle, setDropdownToggle] = useState('');
    return (
        <div className={'dropdown ' + dropdownToggle}>
            <div className='dropdown-trigger'>
                <button 
                    className='button is-info is-light'
                    aria-haspopup='true'
                    aria-controls='dropdown-menu'
                    onClick={() => setDropdownToggle(dropdownToggle === 'is-active' ? '' : 'is-active')}>
                    <b className='mr-1'>List:</b>
                    <span>{lists[mediaType][list].label}</span>
                </button>
            </div>
            <div className='dropdown-menu' id='dropdown-menu' role='menu'>
                <div className='dropdown-content'>
                    {Object.keys(lists[mediaType]).length > 1
                        ? Object.keys(lists[mediaType]).map(currentList => (
                            <a
                                key={currentList}
                                className={list === currentList
                                    ? 'dropdown-item is-active'
                                    : 'dropdown-item'}
                                onClick={() => {
                                    setList(currentList);
                                    setLoading(true);
                                    setDropdownToggle('');
                                    }}>
                                {lists[mediaType][currentList].label}
                            </a>)
                            )
                        : <a className='dropdown-item is-size-7'>This is the only list currently available</a>
                        }
                </div>
            </div>
        </div>
        )
}