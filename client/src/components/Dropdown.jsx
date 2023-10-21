import React from 'react';

function Dropdown({ results, onSelect }) {
  return (
    <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
      {results.map((result) => (
        <li
          key={result._id}
          onClick={() => onSelect(result)}
          className="p-2 cursor-pointer hover:bg-gray-100"
        >
          {result.firstname} {result.surname}
        </li>
      ))}
    </ul>
  );
}

export default Dropdown;
