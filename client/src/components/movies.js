import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = 'http://localhost:3001';

export default function Movies(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        axios.get('/review/movies')
            .then(resp =>{setMovies(resp.data); setLoading(false);})
            .catch(error => {setError(error); setLoading(false);});
    },[]);

    return(
      <body>
      <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {movies && (
              <div>
                  {movies.popularMovies && movies.popularMovies.length > 0 && (
                    <ul>
                      {movies.popularMovies.map((m) => (
                        <li key={m.id}>
                          <h4>{m.title}</h4>
                          <img src={`https://image.tmdb.org/t/p/w300${m.poster_path}`} alt={m.title}/>
                          <p>{'Movie ID: ' + m.id}</p>
                          <p>{'Release date: ' + m.release_date}</p>
                          <p>{'Overview: ' + m.overview}</p>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
          )}
      </div>
      </body>
  )  
}