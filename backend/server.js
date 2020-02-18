const express = require('express');
const app = express();

const path = require('path');

// executed for every incoming request
app.use('/', (req, res, next) => {
    console.log('In the middleware');
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const port_num = 3e3;
app.listen(port_num, () => console.log('http://localhost:3000'));