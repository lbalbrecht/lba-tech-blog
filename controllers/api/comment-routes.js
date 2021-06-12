const router = require('express').Router();
const { Comment, BlogPost, User } = require('../../models/');
const apiAuth = require("../../middleware/apiAuth");

// get all comments
router.get('/', async (req, res) => {
    console.log('route reached!')
    try {
        const allComments = await Comment.findAll();
        res.status(200).json(allComments);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get one comment
router.get('/:id', async(req, res) => {
    console.log('route reached!')
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{ model: User }, { model: BlogPost }],
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with that id!' })
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new comment
router.post('/', apiAuth, async (req, res) => {
    console.log('route reached!')
    try {
        const newComment = await Comment.create({
            comment_author: req.session.user.username,
            comment_body: req.body.comment_body,
            comment_date: req.body.comment_date,
            user_id: req.session.user.id,
            blogpost_id:req.body.blogpost.id
        });
        if(!req.session.user) {
            res.render('login')
            return
        }
        res.status(200).json(newComment)
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a comment
router.delete('./:id', async (req, res) => {
    console.log('route reached!')
    try {
        const removeComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!req.session.user) {
            res.render('login')
            return
        }
        res.status(200).json(removeComment)

        if (!removeComment) {
            res.status(404).json({message: 'comment not found!'})
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;