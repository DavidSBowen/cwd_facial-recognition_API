const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex')
const saltRounds = 10;

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

app.get('/', (req, res) => {
    db
        .select('*')
        .from('users')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('not found');
            }
        }).catch(err => {
            res.status(400).json('database error');
        })
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    console.log('POST /signin attempted sign in to: ' + email)
    db
        .select('email', 'hash')
        .from('login')
        .where({
            email: email
        })
        .then(data => {
            bcrypt.compare(password, data[0].hash, function (err, resp) {
                if (resp) {
                    db.select('*')
                        .from('users')
                        .where({
                            email: data[0].email
                        })
                        .then(data2 => {
                            console.log('POST /signin successful for:', data2[0].email);
                            res.status(200).json(data2[0]);
                        })
                        .catch(error => {
                            console.log('POST /signin error selecting email from users db', error);
                            res.status(400).json('username / password combo not found')
                        })
                } else {
                    console.log('POST /signin Password problem:' + err + ' ' + data[0].email);
                    res.status(400).json('username / password combo not found');
                }
            });

        })
        .catch(err => {
            console.log('POST /signin error finding email in login db', err);
            res.status(400).json('unable to find user');
        })
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, saltRounds, (hashError, hashSuccess) => {
        db.transaction(trx => {
            trx.insert({
                hash: hashSuccess,
                email: email
            })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            email: loginEmail[0],
                            name: name,
                            joined: new Date()
                        })
                        .then(user => {
                            console.log('POST /register successfully registered for:', user[0].email)
                            res.json(user[0])
                        })
                        .catch(err => {
                            res.status(400).json('failed to register user');
                        })
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
            .catch(err => {
                res.status(400).json('unable to register');
            });
    });
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    db
        .select('*')
        .from('users')
        .where({
            id: id
        })
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
            return res.status(404).json('unable to update or retrieve entries');
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
