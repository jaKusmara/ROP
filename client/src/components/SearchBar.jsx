import React, { useState, useEffect, useRef } from 'react';
import { fetchPeopleDataSearchBar } from '../controllers/searchController';
import { useAuthContext } from '../hooks/useAuthContext';
import Dropdown from './Dropdown';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useAuthContext();
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.trim() !== '') {
      if (user) {
        fetchPeopleDataSearchBar(query, user)
          .then((data) => {
            setSearchResults(data);
            setShowDropdown(true);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setSearchResults([]);
            setShowDropdown(false);
          });
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [query, user]);

  const handleDropdownSelect = (selectedResult) => {
    setQuery(`${selectedResult.firstname} ${selectedResult.surname}`);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
      <div ref={inputRef} className='w-1/8'>
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="rounded"
        />
        {showDropdown && searchResults.length > 0 && (
          <Dropdown results={searchResults} onSelect={handleDropdownSelect} />
        )}
      </div>
  );
}

export default SearchBar;
