const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'davidbowen',
        password: '',
        database: 'smart-brain'
    }
});

const app = express();

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '1',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        },
        {
            id: '125',
            name: 'David',
            email: 'david@gmail.com',
            password: 'soccer',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    db('users')
        .select('*')
        .then(data => {
            res.json(data);
        })
});

app.post('/signin', (req, res) => {
    // const { email, password } = req.body;
    // db('users');

    let userFound = false;

    for (let i = 0; i < database.users.length; i++) {

        if (req.body.email === database.users[i].email &&
            req.body.password === database.users[i].password) {
            console.log('sign in post works', database.users[i].name);
            userFound = true;
            res.json(database.users[i]);
        } else {
            console.log("sign in post doesn't work");
        }
    }
    if (!userFound) {
        res.status(400).json("Error logging in");
    }


});

app.post('/register', (req, res) => {
    const { email, name, password, balls } = req.body;

    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
        .then(user => {
            res.json(user[0])
        })
        .catch(err => {
            res.status(400).json('unable to register');
        })
});


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    db('users')
        .where('id', '=', id)
        .select('*')
        .then(data => {
            console.log(data);
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(404).json('not found', error);
        })
});

app.put('/image', (req, res) => {
    const { id } = req.body;

    db('users')
        .returning('*')
        .where('id', '=', id)
        .increment('entries', 1)
        .then(data => {
            console.log(data);
            return res.status(200).json(data[0]);
        })
        .catch(error => {
            console.log(error);
            return res.status(404).json(error);
        });
});

app.listen(3000, () => {
    console.log('app running on port 3000');
});


/*
    / --> res = this is working
    /signin --> POST = success/fail
    /register --> POST = user
    /profile/:userId --> GET = user
    /image --> PUT --> user & count
*/
