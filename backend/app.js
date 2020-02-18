const path = require('path');
const express = require('express');
const body_parser = require('body-parser');
//===========================
const errorController = require('./controllers/error'); //.js
//===========================
const app = express();
//===========================
// register parser
app.use(body_parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//===========================
app.set('view engine', 'ejs');
app.set('views', 'views');
//===========================
const adminRoutes = require('./routes/admin'); //.js
app.use('/admin', adminRoutes);
//===========================
const shop_routes = require('./routes/shop'); //.js
app.use(shop_routes);
//===========================
// handle errors:
app.use(errorController.get404);
//===========================
const port_num = 3e3;
app.listen(port_num, () => console.log('http://localhost:3000/'));
//===========================