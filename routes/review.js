const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});

const {addReview, getReviews} = require ('../postgre/reviews');

router.get('/', async function(req, res){
    res.json(await getReviews());
});

router.post('/', upload.none(), async function(req, res){
    const username = req.body.username;
    const revtext = req.body.revtext;
    const rating = req.body.rating;
    const targetid = req.body.targetid;

    try {
        await addReview(username, revtext, rating, targetid);
        res.end();
    } catch (error) {
        res.json({error: error.message}).status(500);
    }
});

module.exports = router;