const router = require('express').Router();
require('dotenv').config()
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const bcrypt = require('bcrypt');
const {createToken, auth } = require('../auth/auth');
const jwt = require('jsonwebtoken');


const {createUser, checkUsername, getUsers, getUser, deleteUsers, getUsersGroups} = require('../postgre/user');


router.post('/register', upload.none() , async (req,res) => {
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    let password = req.body.password;

    password = await bcrypt.hash(password, 10);

    try {
        await createUser(username, fname,lname,email,password);
        const token = createToken(username);
        res.status(200).json({jwtToken: token});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', upload.none(), async (req,res) => {
    const username = req.body.username;
    let password = req.body.password;

    const passwordHash = await checkUsername(username);

    if(passwordHash){
        const isCorrect = await bcrypt.compare(password, passwordHash);
        if(isCorrect){
            const token = jwt.sign({username: username}, process.env.JWT_SECRET_KEY);
            res.status(200).json({jwtToken:token});
        }else{
            res.status(401).json({error: 'Invalid password'});
        }
    }else{
        res.status(401).json({error: 'User not found'});
    }
});

router.get('/', auth, async (req, res) => {

    try {
        res.json(await getUsers());    
    } catch (error) {
        res.status(401).json({error: error.message});
    }
});

router.get('/user/:username', auth, async (req, res) => {

    try {
        const username = res.locals.username;
        res.json(await getUser(username));    
    } catch (error) {
        res.status(401).json({error: error.message});
    }
});

router.delete('/:username', auth, upload.none() , async (req,res) => {
    const usernameToDelete = req.params.username;

    try {
        await deleteUsers(usernameToDelete)
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(403);
    }

});

router.get('/user/:username/groups', auth, async (req, res) => {
    const username = req.params.username;

    try {
        const userGroups = await getUsersGroups(username);
        res.json(userGroups);
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;