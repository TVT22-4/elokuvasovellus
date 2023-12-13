require('dotenv').config();
const jwt = require('jsonwebtoken');
const { isGroupMember, isGroupOwner } = require('../postgre/group');


function auth(req,res,next){
    const token = req.headers.authorization?.split(' ')[1];

    try{
        const username = jwt.verify(token, process.env.JWT_SECRET_KEY).username;
        res.locals.username = username;
        next();
    }catch(err){
        res.status(403).send('Unauthorized');
    }
}

function createToken(username){
    return jwt.sign({username: username}, process.env.JWT_SECRET_KEY);
}

async function authorizeGroup(req, res, next) {
  const idGroup = req.params.idGroup;
  const username = res.locals.username;

  try {
      const isMember = await isGroupMember(idGroup, username);
      const isOwner = await isGroupOwner(idGroup, username);

      if (isMember || isOwner) {
          next(); 
      } else {
          res.status(403).json({ error: 'You are not authorized to access this group page.' });
      }
  } catch (error) {
      console.error('Error authorizing group access:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports =  {auth, createToken, authorizeGroup};