const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest:'upload/'});

const {addPost, getPost, getUser, deletePost} = require('../postgre/custom_user');
const { getMoviesFromTMDB , getSeriesFromTMDB} = require('../tmdb');


//movies and series for the user page
router.get('/custom_user/movies_and_series', async function(req, res) {
    try {
      
      const accessToken = process.env.ACCESS_TOKEN;
  
      const popularMovies = await getMoviesFromTMDB(accessToken, {
        sort_by: 'popularity.desc',
      });

      const topRatedMovies = await getMoviesFromTMDB (accessToken, {
        sort_by: 'vote_average.desc',
      });

      const popularSeries = await getSeriesFromTMDB(accessToken, {
        sort_by: 'popularity.desc',
      });


      res.json({ popularMovies,topRatedMovies, popularSeries });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//user adds movies to watchlist
router.post('/custom_user/movies_and_series/watchlist', upload.none(), async function(req, res){
   try{

    const userName = req.body.userName;
    const postType = req.body.postType;
    const targetId = req.body.targetId;

    
    await addPost (userName, postType, targetId);
        res.status(201).json({message:'Added to watchlist successfully'});
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

//get all users 
router.get('/custom_user/movies_and_series/watchlist', async function(req,res){

    try {
    res.json(await getPost());
    } catch (error) {
      res.status(500).json({error:error.message});
    }

});


//get user and watchlist with materialID
router.get('/custom_user/movies_and_series/watchlist/:userName', async function (req, res) {
  const userName = req.params.userName;

    try {
        const user = await getUser(userName);
        if (user.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json({ user });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//delete post from watchlist
router.delete('/custom_user/movies_and_series/watchlist/:materialID/:userName', upload.none(), async function (req,res){
  const {materialID, userName} = req.params;

  try {
      await deletePost(materialID, userName)
      res.end();
  }catch (error) {
      console.log(error);
      res.status(204).json({error: error.message});
  }
});


module.exports = router;
