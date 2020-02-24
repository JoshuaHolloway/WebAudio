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
// REST: Get some data from the users collection
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
app.get('/users/:userid', (req, res) => {
    console.clear();
    console.log('In  /users/:userid  Path');

    const userID = req.params.userid;
    console.log(userID);

    db.all(
        // Arg-1: SQL-query
        'SELECT * FROM users_to_pets WHERE name=$name',

        // Arg-2: Object that contains the mapping for $name
        {
            $name: userID
        },

        // Arg-3: Callback function to run when the query finishes        
        (err, rows) => {

            console.log(rows);

            // If query is invalid return empty object
            if (rows.length < 1)
                res.send({});
            else
            {
                // Assume only one person with userID in db
                const row = rows[0];
                res.send(row);
            }
                
    });
});
//=======================================
// REST: Post some new data to the users collection
app.post('/users', (req, res) => {

    console.log('Inside /users POST');

    console.log(req);
    res.send({});
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