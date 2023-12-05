require('dotenv').config();
const express = require('express');
const customRoute = require('./routes/custom_user');
const searchRoute = require ('./routes/search');
const app = express();
const cors = require ('cors');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

//Routes
app.use('/', customRoute);
app.use('/', searchRoute);



const PORT = process.env.PORT || 3001;

app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
});





