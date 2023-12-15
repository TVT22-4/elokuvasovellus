const axios = require('axios');

//movies
async function getMoviesFromTMDB(accessToken, options = {}) {
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

module.exports = {getMoviesFromTMDB};