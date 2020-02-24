console.log('In server.js');
const express = require('express');
const app = express();
//=======================================
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('pets.db');
//=======================================
app.set('view engine', 'ejs');
//=======================================
// JS-Object
const fake_db = {
  // Key: Value
  philip: {
    // JS-Object
    //Key: Value
    job: 'prof',
    pet: 'cat.jpg'
  },
  josh: { job: 'dev', pet: 'dog.jpg' },
  steve: { job: 'eng', pet: 'bear.jpg' }
};
//=======================================
app.get('/users', (req, res) => {
    console.clear();
    console.log('INSIDE /users handler');

    db.all('SELECT name FROM users_to_pets', (err, rows) => {
        // console.log(rows);
        const data = rows.map(x => x.name);
        // console.log(db_names);

        // Send response:
        res.send(data);
    });

    // // Send response:
    // const db_keys = Object.keys(fake_db);
    // res.send(db_keys);
});
//=======================================
app.get('/josh/:userid', (req, res) => {
    console.clear();
    console.log('In  /josh/:userid  Path');

    const userID = req.params.userid;
    console.log(userID);

    db.all(
        // Arg-1: SQL-query
        'SELECT * FROM users_to_pets WHERE name=$name',

        // Arg-2: Object that contains the mapping for $name
        {
            $name: nameToLookup
        },

        // Arg-3: Callback function to run when the query finishes        
        (err, rows) => {

            console.log(rows);

            // Send response:
            res.send(data);
    });

    // res.send({josh: 'a'});
});

//=======================================
app.get('/users/:userid', (req, res) => {

    console.log('inside /users/:userid');

    const nameToLookup = req.params.userid;

    db.all(
        // Arg-1: SQL-query
        'SELECT * FROM users_to_pets WHERE name=$name',

        // Arg-2: Object that contains the mapping for $name
        {
        $name: nameToLookup
        },

        // Arg-3: Callback function to run when the query finishes
        (err, rows) => {
        console.log('Query has finished');
        console.log(rows);
        if (rows.length > 0) {
            //res.send(rows);
            res.send(rows[0]); // Array only has one element (the row)
        } else {
            res.send({}); // failed, so return an empty object instead of undefined
        }
        }
    );
});
//=======================================
// executed for every incoming request
app.use('/', (req, res) => {
    console.log('INSIDE / handler');

    res.render('index.ejs', {
        josh: 'HI from server.js :)'
    });
});
//=======================================
const port_num = 3e3;
app.listen(port_num, () => console.log('http://localhost:3000'));
//=======================================