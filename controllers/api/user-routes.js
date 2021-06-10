const express = require('express');
const router = express.Router();
const { Comment, BlogPost, User } = require('../../models');

// find all users
router.get('/', async (req, res) => {
    console.log('route reached!')
    try {
        const allUsers = await User.findAll();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json(err);
    }
})

// find one user
router.get('/:id', async(req, res) => {
    console.log('route reached!')
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [{ model: BlogPost }, { model: Comment }],
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with that id!' })
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;