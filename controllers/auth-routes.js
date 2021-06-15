const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/sessiondata', (req, res) => {
    res.json(req.session)
})

// create a new user
router.post('/new', (req, res) => {
    console.log('route reached');
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(newUser => {
        req.session.user = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
            password: newUser.password
        };
        res.json(newUser)
    }).catch(err => {
        console.log(err);
        res.status(500), json(err);
    })
});

// login an existing user
router.post('/login', async (req, res) => {
    console.log('route reached!')
    try {
        const foundUser = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        if (!foundUser) {
            req.session.destroy();
            return res.status(401).send('Username not found')
        }
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            // if (req.body.password === foundUser.password) {
            console.log('success')
            req.session.user = {
                id: foundUser.id,
                username: foundUser.username,
                email: foundUser.email,
                username: foundUser.username
            };
            console.log(req.session.user)
            return res.json(req.session)
        }
        else {
            console.log("incorrect password")
        }
    } catch (err) {
        req.session.destroy();
        return res.status(401).send("Username or password is incorrect")
    }
});

// logout a user
router.get('/logout', async (req, res) => {
    if (!req.session.user) {
        console.log("No user logged in!");
        return
    } else {
        req.session.destroy();
        console.log("successfully logged out!")
        res.redirect('/')
    }
})

module.exports = router;