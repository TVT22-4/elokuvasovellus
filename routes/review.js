const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const axios = require('axios');
require('dotenv').config();
const {getPopularMoviesFromTMDB} = require('../tmdb');
const {addReview, getReviews, getReview, deleteReview} = require ('../postgre/reviews');
const {auth} = require('../auth/auth');

router.get('/all', async function(req, res){
    res.json(await getReviews());
});

router.get('/byid', async function(req, res){
    const idreview = req.query.idreview;

    console.log(idreview);
    res.json(await getReview(idreview));
});

router.post('/', auth, upload.none(), async function(req, res){
    const username = req.body.username;
    const revtext = req.body.revtext;
    const rating = req.body.rating;
    const targetid = req.body.targetid;

    try {
        await addReview(username, revtext, rating, targetid);
        res.end();
    } catch (error) {
        res.json({error: error.message}).status(401);
    }
});

router.delete('/', async function(req, res){
    const idreview = req.query.idreview;

    try {
        await deleteReview(idreview);
        console.log('row removed');
        res.end();
    } catch (error) {
        res.json({error: error.message}).status(500);
    }
});


router.get('/movies', async function(req, res) {
    try {

      const accessToken = process.env.ACCESS_TOKEN;

      const popularMovies = await getPopularMoviesFromTMDB(accessToken, {
        sort_by: 'popularity.desc',
      });

      res.json({popularMovies});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message});
    }
  });

module.exports = router;

