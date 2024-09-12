import React, { useEffect, useState } from 'react';
import style from './SearchInput.module.scss';

export default function SearchInput(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(window.innerWidth > 860);

  const handleSearch = () => {
    // handle search button click event
  };

  const handleInputChange = (event) => {
    // handle input change event
    setSearchTerm(event.target.value);
  };

  const handleToggleExpand = () => {
    if (window.innerWidth < 860) {
      setIsExpanded(!isExpanded);
    }
  };

  useEffect(() => {
    setIsExpanded(window.innerWidth > 860);
  }, [window.innerWidth]);

  useEffect(() => {
    if (searchTerm) {
      console.log('searching for:', searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className={`${style.searchInputContainer} ${isExpanded ? style.expanded : ''}`}>
      <div className={style.searchIconContainer} onClick={handleToggleExpand}>
        <img src={'/images/searchIcon.svg'} alt="" />
      </div>
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleInputChange} />
      <button className={searchTerm ? style.active : ''} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
