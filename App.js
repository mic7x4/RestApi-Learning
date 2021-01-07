// Load our server using express somehow...
const express = require('express');
const morgan = require('morgan');



const app = express();
app.use(morgan('short'))
const PORT = 3000;



app.get('/',(req,res) => {
    console.log('Responding to root Route');
    res.send('<h1> Hello from Root</h1>')
});
// get users
app.get('/users',(req,res) => {
    let users = [{id:1, firstname:'Michael',lastName:"Crook"},
                {id:2, firstname:'Netphantom',lastName:"Crook"},
                {id:3, firstname:'Kanigra',lastName:"James"},
            ];
    res.json(users);
});

app.listen(PORT,() => {
    console.log(`Server is up and Running on ${PORT}`);
})
