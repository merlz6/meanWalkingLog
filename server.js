const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

app.use(express.json());
app.use(express.static('public'))
app.use(session({
    secret:'feedmeseymour',
    resave:false,
    saveUninitialized:false
}));

const walksController = require('./controllers/walks.js');
app.use('/walks', walksController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionController = require('./controllers/session.js');
app.use('/session', sessionController);

mongoose.connect(
    'mongodb://localhost:27017/walkingLog',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
})
app.listen(3000, () => {
    console.log('listening...');
})
