const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const axios = require('axios');
var xml2js = require('xml2js');
const {createToken, auth } = require('../auth/auth');


const {createGroup, getUsers, getGroups, getGroup, deleteGroups, addUser, deleteUser, addNews, getNews, deleteNews} = require('../postgre/group');

router.post('/create', auth, upload.none(), async (req, res) => {
    const groupname = req.body.groupname;
    const description = req.body.description;
    
    try {
        await createGroup(groupname, description);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({ error: error.message }).status(401);
    }
});


router.get('/group/:idGroup/users', auth, async (req, res) => {
    const idGroup = req.params.idGroup;

    try {
        res.json(await getUsers(idGroup));    
    } catch (error) {
        res.status(401).json({error: error.message});
    }
});


router.get('/group', async (req, res) => {

    try {
        res.json(await getGroups());    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/group/:idGroup', async (req, res) => {
    const idGroup = req.params.idGroup;

    try {
        res.json(await getGroup(idGroup));    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete('/:idGroup', auth, upload.none() , async (req,res) => {
    const idGroup = req.params.idGroup;

    try {
        deleteGroups(idGroup)
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(403);
    }

});

router.post('/group/:idGroup/users', auth, upload.none() , async (req,res) => {
    const username = req.body.username;
    const idGroup = req.body.idGroup;
   
    try {
        await addUser(username, idGroup);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(401);
    }

});

router.delete('/group/:idGroup/users/:username', auth, upload.none() , async (req,res) => {
    const username = req.params.username;

    try {
        await deleteUser(username)
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(403);
    }

});


async function fetchData(area, categoryID, eventID) {
  try {
    const response = await axios.get(`https://www.finnkino.fi/xml/News/?area=${area}&categoryID=${categoryID}&eventID=${eventID}`);

    const xmlData = response.data;

    const jsResult = await xml2js.parseStringPromise(xmlData);
    
    console.log(jsResult.News);
    
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

fetchData('1041', '', '123');


router.post('/group/:idGroup/news/add-news', auth, async (req, res) => {
    const { idGroup, area, categoryID, eventID } = req.body;

    try {
        await addNews(idGroup, area, categoryID, eventID);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }
});

router.get('/group/:idGroup/news', auth, async (req, res) => {
    const idGroup = req.params.idGroup;

    try {
        res.json(await getNews(idGroup));    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete('/group/:idGroup/news/:materialID', auth, upload.none() , async (req,res) => {
    const materialID = req.params.materialID;

    try {
        deleteNews(materialID)
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }

});


module.exports = router;