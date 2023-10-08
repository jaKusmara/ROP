import { useEffect, useState } from 'react';
import { fetchPeopleDataSearchBar } from '../controllers/searchController';
import { useAuthContext } from '../hooks/useAuthContext';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useAuthContext()

  useEffect(() => {
    if (query.trim() !== '') {

    if(user){
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
    }
  }, [query, user]);

  {/**
  const handleDropdownItemClick = (item) => {
  };
*/}
  

  return (
    <div className="max-w-md relative">
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        {showDropdown && (
          <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <ul>
              {searchResults.map((result) => (
                <li
                  key={result._id}
                  //onClick={() => handleDropdownItemClick(result)}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {result.firstname} {result.surname}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
