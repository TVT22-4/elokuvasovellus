import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3001/search', {
                params: {
                    title: searchQuery,
                },
            });

            setSearchResults(response.data.results);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for movies and series"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}/>
            
          <button onClick={handleSearch}>Search</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {searchResults && (

        <div>
          <h2>Search Results</h2>
          {searchResults.map((result) => (
            <div key={result.targetId}>

              {/* Displaying movie or series image */}
              {result.poster_path && (
                <img src={`https://image.tmdb.org/t/p/w300${result.poster_path}`} alt={result.title}/>)}
                <p>Title: {result.title}</p>
                <p>Type: {result.type}</p>
                <p>Id: {result.targetId}</p>
            </div>
            ))}
        </div>
        )}
     </div>
)}



