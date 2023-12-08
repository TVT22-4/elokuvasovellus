const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest:'upload/'});

const {addPost, getPost, getUser, deletePost} = require('../postgre/custom_user');
const { getMoviesFromTMDB , getSeriesFromTMDB} = require('../tmdb');


//movies for the user page
router.get('/custom_user/movies', async function(req, res) {
    try {
      
      const accessToken = process.env.ACCESS_TOKEN;
  
      const movies = await getMoviesFromTMDB(accessToken);
  
      
      res.json({ movies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


//series for the user page
router.get('/custom_user/series', async function(req, res) {
    try {
        const accessToken = process.env.ACCESS_TOKEN;

        const series = await getSeriesFromTMDB(accessToken);

        res.json({series});
    }catch (error){
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


//user adds movies to list etc
router.post('/custom_user', upload.none(), async function(req, res){

   
    const userName = req.body.userName;
    const postType = req.body.postType;
    const targetId = req.body.targetId;

    try {
        await addPost (userName, postType, targetId);
        res.status(201).end();
    } catch (error){
        res.status(400).json({error: error.message});
    }
});

router.get('/custom_user', async function(req,res){

    try {
    res.json(await getPost());
    } catch (error) {
      res.status(500).json({error:error.message});
    }

});


router.get('/custom_user/:materialID', async function (req, res) {
    const materialID = req.params.materialID;

    try {
        const user = await getUser(materialID);
        if (user.length === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json({ user });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/custom_user/:materialID', upload.none(), async function (req,res){
    const materialID = req.params.materialID;

    try {
        await deletePost(materialID)
        res.end();
    }catch (error) {
        console.log(error);
        res.status(204).json({error: error.message});
    }
});

module.exports = router;
