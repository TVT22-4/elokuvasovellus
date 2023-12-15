import axios from 'axios';
import { useEffect, useState } from "react";
import { jwtToken } from './signals';

export default function CustomUser() {
    const [moviesAndSeries, setMoviesAndSeries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [watchList, setWatchList] = useState([]);
  
    useEffect(() => {
      const fetchMoviesAndSeries = async () => {
        try {
          const token = jwtToken.value;
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
  
          const response = await axios.get('/custom_user/movies_and_series', config);
  
          setWatchList(response.data.watchList);
          setMoviesAndSeries(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
  
      fetchMoviesAndSeries();
    }, []);

    //add to watchlist
    const addToWatchList = async (targetId, postType) => {
      try {
        const token = jwtToken.value;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.post('custom_user/movies_and_series/watchlist', {
          userName: token.username,
          postType,
          targetId,
        },config);

        setWatchList((prevWatchList) => [...(prevWatchList || []), { id: targetId, type: postType }]);
      }catch (error){
        console.log('Error adding to watchlist', error.message);
      }
    };

    //delete from watchlist
    const removeFromWatchList = async (materialID) => {
      try {
        const token = jwtToken.value;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const userName = token.username;
        await axios.delete(`/custom_user/movies_and_series/watchlist/${materialID}/${userName}`,config);

        setWatchList((prevWatchList) => prevWatchList.filter(item => item.id !==materialID));
      }catch (error){
        console.log('Error removing from watchlist', error.message);
      }
    };

  
    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {moviesAndSeries && (
          <div>

            {/*Popular movies for user page*/}
            <h2>Popular Movies</h2>
            <ul>
              {moviesAndSeries.popularMovies.map(movie => (
                <li key={movie.id}>
                  <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title}/>
                  <button onClick={() => addToWatchList(movie.id, 'movie')}>Add to watchlist</button>
                </li>
                
              ))}
            </ul>
  
            {/*Top rated movies for user page*/}
            <h2> Top Rated Movies</h2>
            <ul>
              {moviesAndSeries.topRatedMovies.map(movie => (
              <li key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title}/>
                <button onClick = {() => addToWatchList(movie.id,'movie')}>Add to watchlist</button>
              </li>
                
              ))}
            </ul>
  
            {/*Popular series for user page*/}
            <h2>Popular Series</h2>
            <ul>
              {moviesAndSeries.popularSeries.map(series => (
                <li key={series.id}>
                  <img src={`https://image.tmdb.org/t/p/w300${series.poster_path}`} alt={series.name}/>
                  <button onClick = {()=> addToWatchList(series.id, 'series')}>Add to watchlist</button>
                </li>
              ))}
            </ul>
          </div>
        )}

<h2>Watchlist</h2>
<ul>
  {Array.isArray(watchList) && watchList.map(item => (
    <li key={item.id}>
      <span>{item.type === 'movie' ? 'Movie' : 'Series'}</span>
      <img
        src={`https://image.tmdb.org/t/p/w300${item.type === 'movie' ? item.poster_path : (item.series && item.series.poster_path)}`}
        alt={`Watchlist ${item.type}`}
        style={{ width: '100px', height: '150px' }}  
      />
      <button onClick={() => removeFromWatchList(item.id)}>Remove from watchlist</button>
    </li>
  ))}
</ul>


      </div>
    );
  }
