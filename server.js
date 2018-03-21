const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
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

app.use(function (req, res, next) {
    let now = new Date();
    console.log(now.toLocaleDateString() + " " + now.getHours() + " " + + now.getMinutes() + " " + + now.getSeconds());

    // bcrypt.hash(req.body.password, null, null, function (err, hash) {
    //     console.log(hash);
    // });

    next()
});

app.get('/', (req, res) => {
    res.json(database.users);
});

// app.use('/signin', (req, res, next) => {
//     bcrypt.compare(req.body.password, database.users[0].password, function (err, res) {
//         if (res === true) {
//             console.log('good password');
//             res.locals.testvalue = true;
//         } else {
//             console.log('bad password');
//             res.locals.testvalue = true;
//         }
//     });

//     next();
// })

app.post('/signin', (req, res) => {

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

    database.users.push({
        id: '126',
        name: name,
        email: email,
        balls: balls,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(404).json('not found');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
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
