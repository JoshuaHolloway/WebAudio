const express = require('express');
const app = express();

// executed for every incoming request
app.use((req, res, next) => {
    console.log('In the middleware');
    res.send('<h1>Hello from express!<\h1>');
});

const port_num = 3e3;
app.listen(port_num, () => console.log('http://localhost:3000'));