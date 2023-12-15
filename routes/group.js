const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const {createToken, auth, authorizeGroup } = require('../auth/auth');


const {createGroup, getUsers, getGroups, getGroup, deleteGroups, addUser, deleteUser, addNews, getNews, deleteNews, createJoinRequest, getJoinRequests, acceptJoinRequest, deleteJoinRequest, isGroupMember, isGroupOwner} = require('../postgre/group');

router.post('/create', auth, upload.none(), async (req, res) => {
    const groupname = req.body.groupname;
    const description = req.body.description;
    const username = res.locals.username;
    
    try {
        const createdGroup = await createGroup(groupname, description, username);
        res.json(createdGroup); 
      } catch (error) {
        console.log(error);
        res.json({ error: error.message }).status(401);
      }
    });


router.get('/group/:idGroup/users', auth, authorizeGroup, async (req, res) => {
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

router.get('/group/:idGroup', auth, authorizeGroup, async (req, res) => {
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

router.post('/group/:idGroup/users', auth, async (req, res) => {
    const { username } = req.body;
    const { idGroup } = req.params;
    const creatorUsername = res.locals.username;
  
    try {
      const isCreator = await isGroupCreator(idGroup, creatorUsername);
      if (!isCreator) {
        throw new Error('You are not authorized to add users to this group.');
      }
  
      await addUser(username, idGroup);
      res.json({ message: 'User added to the group successfully.' });
    } catch (error) {
      console.log(error);
      res.json({ error: error.message }).status(401);
    }
  });


  router.delete('/group/:idGroup/users/:username', auth, authorizeGroup, async (req, res) => {
    const username = req.params.username;
    const idGroup = req.params.idGroup;
    const creatorUsername = res.locals.username;
  
    try {
      await deleteUser(username, idGroup, creatorUsername);
      res.end();
    } catch (error) {
      console.error(error);
      res.json({ error: error.message }).status(403);
    }
  });
  

router.post('/group/:idGroup/news/add-news', auth, authorizeGroup, async (req, res) => {
  const idGroup = req.params.idGroup;
  const title = req.body.selectedNews.Title[0];
  const publishDate = req.body.selectedNews.PublishDate[0];

    try {
        await addNews(idGroup, title, publishDate);
        res.end();
    } catch (error) {
        console.log(error.message)
        res.json({error: error.message}).status(500);
    }
});

router.get('/group/:idGroup/news', auth, authorizeGroup, async (req, res) => {
    const idGroup = req.params.idGroup;
    try {
        res.json(await getNews(idGroup));
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.delete('/group/:idGroup/news/:materialID', auth, authorizeGroup, upload.none() , async (req,res) => {
    const materialID = req.params.materialID;

    try {
        deleteNews(materialID)
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }

});

router.post('/group/:idGroup/users/requests', auth, async (req, res) => {
    const idGroup = req.params.idGroup;
    const username = res.locals.username;
  
    try {
      await createJoinRequest(idGroup, username);
      res.end();
    } catch (error) {
      console.error('Error creating join request:', error.message);
      res.status(500).json({ error: error.message });
    }
});
  
  router.get('/group/:idGroup/users/requests', auth, authorizeGroup, async (req, res) => {
    const idGroup = req.params.idGroup;

    try {
      const joinRequests = await getJoinRequests(idGroup);
      res.json(joinRequests);
    } catch (error) {
      console.error('Error getting join requests:', error.message);
      res.status(500).json({ error: error.message });
    }
});
  
router.post('/group/:idGroup/users/requests/:requestID', auth, authorizeGroup, async (req, res) => {
  const idGroup = req.params.idGroup;
  const requestId = req.params.requestID;

  try {
      await acceptJoinRequest(idGroup, requestId);
      res.end();
  } catch (error) {
      console.error('Error accepting join request:', error.message);
      res.status(500).json({ error: error.message });
  }
});


router.delete('/group/:idGroup/users/requests/:requestID', auth, authorizeGroup, async (req, res) => {
    const requestId = req.params.requestID;
    const idGroup = req.params.idGroup;

    try {
        await deleteJoinRequest(requestId);
        res.end();
    } catch (error) {
        console.error('Error deleting join request:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/group/:idGroup/checkOwner', auth, authorizeGroup, (req, res) => {
    const idGroup = req.params.idGroup;
    const username = res.locals.username;

    try {
      const isOwner = isGroupOwner(idGroup, username);
      res.json({ isOwner });
    } catch (error) {
      console.error('Error checking group ownership:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/group/:idGroup/checkMember', auth, authorizeGroup, (req, res) => {
  const idGroup = req.params.idGroup;
  const username = res.locals.username;

  try {
    const isMember = isGroupMember(idGroup, username);
    res.json({ isMember });
  } catch (error) {
    console.error('Error checking group ownership:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  
  
module.exports = router;