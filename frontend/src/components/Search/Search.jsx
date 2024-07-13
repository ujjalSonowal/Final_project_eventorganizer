import React, { useState, useEffect } from "react";

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  // Fetch search results on search term change (optional: debounce for frequent updates)
  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `http://localhost:5001/events/search?${searchTerm}`
      );
      const data = await response.json();
      setSearchResults(data);
    };

    if (searchTerm) {
      fetchResults();
    } else {
      setSearchResults([]); // Clear results when search term is empty
    }
  }, [searchTerm]);

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name, location, or organizer"
      />
      <button type="submit">Search</button>
    </form>
  );
};
