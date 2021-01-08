// Contains all users related routes 
const express = require('express');
const router =  express.Router();
const mysql = require('mysql');


const pool = mysql.createPool({
    connectionLimit: 10,
        host:'localhost',
        user:'root',
        password:'',
        database:'rest__api'
    
})
const getConnection = () => {
    return pool
}

// Creating connection for the database
const connection = getConnection();

router.get('/messages',(req,res) => {
    console.log('messages');
    res.json({message:"This is a simple messages"});
    res.end();
});

// Creating new user
router.post('/user__create',(req,res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const createUser = "INSERT INTO users (firstname,lastname) VALUES (?,?)";
    getConnection().query(createUser,[firstname,lastname],(err,results,fields)=>{
        if(err){
            console.log(`Error ==>> ${err}`);
            res.sendStatus(5000)
            return
        }
        console.log(`Inserted new user with ID: ${results.insertId}`);
        res.end();
    })

});


router.get('/users/:id',(req,res)=>{
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
router.get('/',(req,res) => {
    console.log('Responding to root Route');
    res.send('<h1> Hello from Root</h1>')
});
// get users
router.get('/users',(req,res) => {
    connection.query("SELECT * FROM users",(err,rows,fields) =>{
        res.json(rows);
    })
    
});





module.exports = router;