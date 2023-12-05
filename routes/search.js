const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const axios = require('axios');

// accessToken
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMTQzNjc3MTM3MTNiN2I1NmY3YTIyZThkNmQ1YmRjNyIsInN1YiI6IjY1NmVlMzg0M2RjMzEzMDBlMWVmMzM0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FxVZGdEi1hngr_d0EsAsEixlNo_V6_5skE1hNZeHwXs';

router.get('/search', upload.none(), async function (req, res) {
    const { title, genre, type } = req.query;

    console.log('Query Parameters:', { title, genre, type });

    try {
        // request to TMDb API to search for movies and series
        const tmdbResponse = await axios.get('https://api.themoviedb.org/3/search/multi', {
            params: {
                query:title,
                page:1,
            },
            headers: {
                Authorization: "Bearer"+ {accessToken},
                accept: 'application/json',
            },
            
        });

        // Extract relevant data from the TMDb response
        const tmdbResults = tmdbResponse.data.results;
        const content = tmdbResults.map(item => ({
            targetId: item.id,
            title: item.title || item.name,
            genre: item.genre || 'Unknown',
            type: item.media_type === 'movie' ? 'movie' : 'series',
        }));

        // Filter content based on search criteria
        const results = content.filter(item =>
            (!title || item.title.toLowerCase().includes(title.toLowerCase())) &&
            (!genre || item.genre.toLowerCase() === genre.toLowerCase()) &&
            (!type || item.type.toLowerCase() === type.toLowerCase())
        );

        // If title is provided but no content matches
        if (title && results.length === 0) {
            const errorMessage = 'No content found with the provided title.';
            console.error(errorMessage); // Log the error to the terminal
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
