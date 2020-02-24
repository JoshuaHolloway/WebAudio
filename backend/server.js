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
app.get('/josh', (req, res) => {
    console.log('INSIDE /josh! :)');

    db.all('SELECT name FROM users_to_pets', (err, rows) => {
        // console.log(rows);
        const db_names = rows.map(x => x.name);
        // console.log(db_names);

        // Send response:
        res.send(db_names);
    });

    // // Send response:
    // const db_keys = Object.keys(fake_db);
    // res.send(db_keys);
});
//=======================================
// executed for every incoming request
app.use('/', (req, res) => {
    console.log('Root Route Handler: /');

    res.render('index.ejs', {
        josh: 'HI from server.js :)'
    });
});
//=======================================
const port_num = 3e3;
app.listen(port_num, () => console.log('http://localhost:3000'));
//=======================================