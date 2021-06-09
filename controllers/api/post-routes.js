const express = require('express');
const router = express.Router();
const { Comment, BlogPost, User } = require('../../models');

// get all blog posts
router.get('/', async (req, res) => {
    console.log('route reached!')
    try {
        const allPosts = await Post.findAll();
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get one blog post
router.get('/:id', async(req, res) => {
    console.log('route reached!')
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id!' })
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new blog post
router.post('/', async (req, res) => {
    console.log('route reached!')
    try {
        const newPost = await BlogPost.create({
            title: req.body.title,
            post_body: req.body.post_body,
            post_date: req.body.post_date,
            user_id: req.session.user.id
        });
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a blog post
router.delete('./:id', async (req, res) => {
    console.log('route reached!')
    try {
        const removePost = await BlogPost.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(removePost)

        if (!removePost) {
            res.status(404).json({message: 'post not found'})
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

// add a comment to a post
router.put('/:id', async (req, res) => {
    console.log('route reached!')
    let commentId = req.body.id
    console.log(commentId)

    try {
        const postToUpdate = await Post.findByPk(postId)
        postToUpdate.addComment(req.params.id)
        postToUpdate.save();
        res.status(200).json({ message: 'Success!' })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;