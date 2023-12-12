import axios from 'axios';
import { useEffect, useState } from "react";


export default function CustomUser() {
    const [moviesAndSeries, setMoviesAndSeries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios.get('http://localhost:3001/custom_user/movies_and_series')
        .then(response => {
          setMoviesAndSeries(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }, []);
  
    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {moviesAndSeries && (
          <div>
            <h2>Popular Movies</h2>
            <ul>
              {moviesAndSeries.popularMovies.map(movie => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
  
            <h2> Top Rated Movies</h2>
            <ul>
              {moviesAndSeries.topRatedMovies.map(movie => (
              <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
  
            <h2>Popular Series</h2>
            <ul>
              {moviesAndSeries.popularSeries.map(series => (
                <li key={series.id}>{series.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }