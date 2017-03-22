const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const logger = require('morgan');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
    console.log('Connected to database ' + config.database);
});
mongoose.connection.on('error', function (err) {
    console.log('Database error ' + err);
});

const app = express();
const users = require('./routes/users');

const port = process.env.PORT||8080;
//cors middleware
app.use(cors());

app.use(express.static(path.join(__dirname, 'client')));
app.use(logger('dev'));
//body parser middleware
app.use(bodyParser.json());
//passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users', users);

app.get('/', function (req, res) {
    res.send('Invalid endpoint');
});

app.get('*',function(req,res){
    "use strict";
    res.sendfile(path.join(__dirname,'public/index.html'));
});
app.listen(port, function () {
    console.log('Server started on port ' + port);
});