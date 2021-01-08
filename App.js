// Load our server using express somehow...
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('./public'));
app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended:false}));
const router = require('./routes/user.js');



app.use(router);
const PORT = process.env.PORT || 3000;



// Listening to the port 
app.listen(PORT,() => {
    console.log(`Server is up and Running on ${PORT}`);
})
