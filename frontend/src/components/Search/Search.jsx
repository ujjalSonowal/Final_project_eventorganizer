// src/components/SearchResults/SearchResults.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Events } from "../Events/Events";

export const Search = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get("query");
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/filter/search?query=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data.events);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [location.search]);

  return (
    <div>
      <h2>Search Results</h2>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((event) => (
            <li key={event._id}>
              {/* <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>Organized by: {event.organiseId}</p> */}
              <Events event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};
