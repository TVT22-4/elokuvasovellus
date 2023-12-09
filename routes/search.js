const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'upload/' });
const axios = require('axios');


const accessToken = process.env.ACCESS_TOKEN;

// Endpoint for searching movies and series
router.get('/search', upload.none(), async function (req, res) {
    const { title, targetId, genre, type } = req.query;

    console.log('Query Parameters:', { title, targetId, genre, type });

    try {
        // Request to TMDb API to search for movies
        const tmdbResponse = await axios.get('https://api.themoviedb.org/3/search/multi', {
            params: {
                query: title,
                page: 1,
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
            type: item.media_type === 'movie' ? 'movie' : 'series',
        }));

        // Filter content based on search criteria
        const results = content.filter(item =>
            (!title || item.title.toLowerCase().includes(title.toLowerCase())) &&
            (!targetId || item.targetId === targetId) &&
            (!type || item.type.toLowerCase() === type.toLowerCase())
        );

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



