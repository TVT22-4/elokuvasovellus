const axios = require('axios');

//movies
async function getMoviesFromTMDB(accessToken, options = {}) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
            language: 'en-US',
            page:1,
            ...options,
            
        },
        headers: {
            Authorization: "Bearer "+ accessToken,
            accept: 'application/json',
        },
    });
    
    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching movies from TMDb');
  }
}

//series
async function getSeriesFromTMDB(accessToken, options = {}) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/discover/tv' , {
      params: {
        language: 'en-US',
        page:1,
        ...options,
      },
      headers: {
        Authorization: "Bearer "+ accessToken,
        accept: 'application/json',
      },
    });

    return response.data.results;
  }catch (error) {
    throw new Error ('Error fetching series from TMDb');
  }
}
async function getPopularMoviesFromTMDB(accessToken, options = {}) {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
        params: {
            language: 'en-US',
            page:1,
            ...options,

        },
        headers: {
            Authorization: "Bearer "+ accessToken,
            accept: 'application/json',
        },
    });

    return response.data.results;
  } catch (error) {
    throw new Error('Error fetching movies from TMDb');
  }
} 

module.exports = {
  getMoviesFromTMDB,
  getSeriesFromTMDB,
  getPopularMoviesFromTMDB,
};
