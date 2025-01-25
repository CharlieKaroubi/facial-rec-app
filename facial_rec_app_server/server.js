import express, { response } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'gov',
      password: 'Leomessi10',
      database: 'smart-brain',
    },
});


const app = express();
app.use(bodyParser.json());
app.use(cors());
const database = {
    users: [
        {
            id: '123',
            fname: 'John',
            lname: 'Doe',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            fname: 'Sally',
            lname: 'Smith',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.json('success');
});

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isValid) {
            return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => res.status(400).json('unable to get user'));
        } else {
            res.status(400).json('wrong credentials');
        }
    })
    .catch(err => res.status(400).json('wrong credentials'));
});

app.post('/signup', (req, res) => {
    const {fname, lname, email, password} = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
            .insert({
                email: loginEmail[0].email,
                fname: fname,
                lname: lname,
                joined: new Date()
            }).then(user => {
                res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    });
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    db.select('*')
    .from('users')
    .where({id})
    .then(user => {
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('not found');
        }
    }).catch(err => {
        res.status(400).json('error getting user');
    });
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    }).catch(err => {
        res.status(400).json('unable to get entries');
    });
});


app.listen(3000, () => {
    console.log('app is running on port 3000');
});


/*
/--> res = this is working
/signin --> POST = success/fail
/signup --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/