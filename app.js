require('dotenv').config();
const express = require('express');
const app = express();
const reviewRouter = require('./routes/review');
const cors = require('cors');
const userRoute = require('./routes/user');
const groupRoute = require('./routes/group');
const reviewRouter = require('./routes/review');
const customRoute = require('./routes/custom_user');
const searchRoute = require ('./routes/search');
const upload = multer({dest: 'upload/'});
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//Routes
app.use('/user', userRoute );
app.use('/group', groupRoute);
app.use('/review', reviewRouter);
app.use('/', customRoute);
app.use('/', searchRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
    console.log('Server running on port ' + PORT);
} );