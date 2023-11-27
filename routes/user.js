const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const bcrypt = require('bcrypt');

const {createUser, getUsers, deleteUsers} = require('../postgre/user');

router.get('/', async (req, res) => {

    try {
        res.json(await getUsers());    
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.post('/register', upload.none() , async (req,res) => {
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    let password = req.body.password;

    password = await bcrypt.hash(password, 10);

    try {
        await createUser(username, fname,lname,email,password);
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }

});

router.delete('/:username', upload.none() , async (req,res) => {
    const usernameToDelete = req.params.username;

    try {
        deleteUsers(usernameToDelete)
        res.end();
    } catch (error) {
        console.log(error);
        res.json({error: error.message}).status(500);
    }

});

module.exports = router;