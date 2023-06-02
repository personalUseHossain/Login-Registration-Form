const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const collection = require('./schema/schema.js')
const bcrypt = require('bcryptjs');


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send(`<h1>Hello user</h1><a href='/login'>Login</a>`)
})

app.get('/login', (req, res) => {
    res.render('login/index')
})
app.get('/register', (req, res) => {
    res.render('register/index')
})

app.post('/register/new', async (req, res) => {
    const createUser = new collection({
        username: req.body.regname,
        email: req.body.regemail,
        password: req.body.regpass,
    })
    createUser.password = await bcrypt.hash(createUser.password, 10);
    const result = await createUser.save();
    console.log(result);
    res.redirect('/login');
})
app.post('/login/new', async (req, res) => {
    try {
        const temail = req.body.logemail;
        const tpassword = req.body.logpass;
        let result = await collection.find({ email: temail });
        result = result[0];

        const checkpass = await bcrypt.compare(tpassword, result.password);
        console.log(checkpass)
        if (checkpass) {
            res.send(`hello ${result.username}`)
        }
        else {
            res.send('invalid login details')
        }
    }
    catch (err) {
        res.send('invalid login details')
    }
})

require('./db/db.js')

//server
app.listen(8080, () => {
    console.log('server is running on port 8080...')
})


