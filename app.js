require('dotenv').config();
const express = require('express');
const app = express();
const reviewRouter = require('./routes/review');
const cors = require('cors');
const userRoute = require('./routes/user');
const groupRoute = require('./routes/group');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

//Routes
app.use('/user', userRoute );
app.use('/group', groupRoute);
app.use('/review', reviewRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
    console.log('Server running on port ' + PORT);
} );