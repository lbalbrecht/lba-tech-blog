const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/sessiondata', (req, res) => {
    console.log('route reached');
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then(newUser => {
        req.session.user = {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username
        };
        res.json(newUser)
    }).catch(err => {
        console.log(err);
        res.status(500), json(err);
    })
});

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
            req.session.user = {
                id: foundUser.id,
                email: foundUser.email,
                username: foundUser.username
            };
            console.log(req.session)
            return res.json(req.session)
        }
    } catch (err) {
        req.session.destroy();
        return res.status(401).sendStatus("Username or password is incorrect")
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.render('index')
})

module.exports = router;