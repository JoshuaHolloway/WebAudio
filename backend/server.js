const express = require('express');
const app = express();
//=======================================
app.set('view engine', 'ejs');
//=======================================
// JS-Object
const db = {
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

    // Send response:
  const db_keys = Object.keys(db);
  res.send(db_keys);
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