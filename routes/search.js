const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const axios = require('axios');


// accessToken
const accessToken = process.env.ACCESS_TOKEN;

// Function to fetch movie genres from TMDb
async function getMovieGenres() {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
            params: {
                language: 'en-US',
                
            },
            headers: {
                Authorization: 'Bearer ' + accessToken, // Replace with your actual access token
                accept: 'application/json',
            },
        });

        return response.data.genres;
    } catch (error) {
        throw new Error('Error fetching movie genres from TMDb');
    }
}

// Function to get genre name based on ID
function getGenreName(genreList, genreId) {
    const genre = genreList.find(g => g.id === genreId);
    return genre ? genre.name : 'Unknown';
}

router.get('/search', upload.none(), async function (req, res) {
    const { title, genre, type } = req.query;

    console.log('Query Parameters:', { title, genre, type });

    try {
        // Fetch movie genres from TMDb
        const movieGenres = await getMovieGenres();

        // Request to TMDb API to search for movies and series
        const tmdbResponse = await axios.get('https://api.themoviedb.org/3/search/multi', {
            params: {
                query: title,
                page: 1,
                with_genres: genre,
            },
            headers: {
                Authorization: 'Bearer ' + accessToken,
                accept: 'application/json',
            },
        });

        // Extract relevant data from the TMDb response
        const tmdbResults = tmdbResponse.data.results;
        const content = tmdbResults.map(item => ({
            targetId: item.id,
            title: item.title || item.name,
            genre: item.genre_ids && item.genre_ids.length > 0
                ? item.genre_ids.map(id => getGenreName(movieGenres, id)).join(', ')
                : 'Unknown',
            type: item.media_type === 'movie' ? 'movie' : 'series',
        }));

        // Filter content based on search criteria
        const results = content.filter(item =>
            (!title || item.title.toLowerCase().includes(title.toLowerCase())) &&
            (!genre || item.genre.toLowerCase().includes(genre.toLowerCase())) &&
            (!type || item.type.toLowerCase() === type.toLowerCase())
        );

        // If both title and genre are provided but no content matches
        if (title && genre && results.length === 0) {
            const errorMessage = 'No content found with the provided title and genre.';
            console.error(errorMessage);
            return res.status(400).json({
                status: 'error',
                message: errorMessage,
            });
        }

        // Return the filtered results
        res.json({ status: 'success', results });
    } catch (error) {
        console.error('Error fetching data from TMDb:', error.message);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
});

module.exports = router;


