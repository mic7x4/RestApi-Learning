// Load our server using express somehow...
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');


const app = express();
app.use(morgan('short'))
const PORT = 3000;
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'rest__api'
})


app.get('/',(req,res) => {
    console.log('Responding to root Route');
    res.send('<h1> Hello from Root</h1>')
});

// get users
app.get('/users',(req,res) => {
    connection.query("SELECT * FROM users",(err,rows,fields) =>{
        res.json(rows);
    })
    
});

app.get('/users/:id',(req,res)=>{
    const id = req.params.id;
    const userQuery = `SELECT * FROM users WHERE id= ?`;
    if(userQuery){
        connection.query(userQuery,[id],(err,rows,fields) =>{
        res.json(rows);
    })  
    }else{
        res.send('user with given id can not be found');
    }
});

// Listening to the port 
app.listen(PORT,() => {
    console.log(`Server is up and Running on ${PORT}`);
})
