// App.js or any other component
import { useState } from 'react';
import SearchBar from './components/SearchBar';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = async (query) => {
    try {
      // Send the search query to the backend
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>My MERN App</h1>
      <SearchBar handleSearch={handleSearch} />
      {/* Display search results here */}
      <ul>
        {searchResults.map((result) => (
          <li key={result._id}>
            {result.firstname} {result.lastname} - {result.username} - {result.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
