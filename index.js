const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const uuid = require('uuid').v4;
const MongoStore = require('connect-mongo')(session);
// const cors = require('cors');

const OauthRouter = require('./routes/Oauth');
const OneUpRouter = require('./routes/OneUp');

//Connect to MongoDB
const mongodb_host = process.env.MONGODB_HOST || 'localhost';
const dbUrl = `mongodb://${mongodb_host}:27017/1uphealth`;
const connect = mongoose.connect(dbUrl);
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

// Initialize express
const app = express();

// Needed for CORS headers so react app can connect
// app.use(cors());

// Add Session
app.use(session({
    genid: (req) => {
        return uuid();
    },
    secret: "1upHealthDemo", // In production we want this to be an env variable
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(require('body-parser').json());

app.get('/', (req, res) => {
    console.log(req.session);
    res.send(req.session);
});

app.use('/oauth', OauthRouter);
app.use('/api', OneUpRouter);


// Destroy Session
app.get('/logout', (req, res, next) => {
    req.session.destroy( err => {
        next(err);
    })
});

app.listen(5000, () => {console.log("running on port 5000")});