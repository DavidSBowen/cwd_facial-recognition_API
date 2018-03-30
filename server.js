const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')
const helmet = require('helmet');
const saltRounds = 10;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const rootPath = require('./controllers/rootPath');
const profile_Id = require('./controllers/profile_Id');
const imagePath = require('./controllers/imagePath');

const portNum = process.env.PORT || 3000;
const db = require('./databases/db1');

const app = express();

app.use(helmet());

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { rootPath.handleRootGET(req, res, db) });

app.post('/signin', (req, res) => { signin.handleSigninPOST(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegisterPOST(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => { profile_Id.handleProfile_IdGET(req, res, db) });

app.put('/image', (req, res) => { imagePath.handleImagePathPUT(req, res, db) });
app.post('/imageurl', (req, res) => { imagePath.handleClarifaiApiCall(req, res) });

app.listen(portNum, () => {
    console.log(`app running on port ${portNum}`);
});


/*
    / --> res = this is working
    /signin --> POST = success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT --> user & count
*/
