// Load our server using express somehow...
const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');


app.use(express.static('./public'));
app.use(morgan('short'))
app.use(bodyParser.urlencoded({extended:false}));
const PORT = 3000;

const getConnection = () => {
        return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'rest__api'
    });
}
// Creating connection for the database
const connection = getConnection();
// Creating new user
app.post('/user__create',(req,res) => {
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
