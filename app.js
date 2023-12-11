require('dotenv').config();
const express = require('express');
const multer = require('multer');
const userRoute = require('./routes/user');
const groupRoute = require('./routes/group');
const upload = multer({dest: 'upload/'});
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/user', userRoute );
app.use('/group', groupRoute);


const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
    console.log('Server running on port ' + PORT)
} );

app.get('/', function(req,res){
    res.send('Home page');
});

module.exports = app;