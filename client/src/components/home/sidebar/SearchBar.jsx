
import { useState, useEffect } from "react";
import { useSearchContext } from "../../../hooks/useContext/useSearchContext";
import { useAuthContext } from "../../../hooks/useContext/useAuthContext";
import { useSearch } from "../../../hooks/useSearch";
import Search from "./Search";

export default function SearchBar() {
  const { user } = useAuthContext();
  const { state: searchState } = useSearchContext();
  const { search } = useSearch();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query) {
      search(user, query);
    }
  }, [query]);
  
  return (
    <div className="relative max-w-full p-4">
      <input
        type="text"
        className="w-full text-black p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {searchState.query && query && <Search query={searchState.query} />}
    </div>
  );
}
