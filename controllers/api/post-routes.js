const express = require('express');
const router = express.Router();
const { Comment, BlogPost, User } = require('../../models');
const apiAuth = require("../../middleware/apiAuth")

// get all blog posts
router.get('/', async (req, res) => {
    console.log('route reached!')
    try {
        const allPosts = await BlogPost.findAll();
        res.status(200).json(allPosts);
        console.log(allPosts)
    } catch (err) {
        res.status(500).json(err);
    }
})

// get one blog post with comments
router.get('/:id', async(req, res) => {
    console.log('route reached!')
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id!' })
        }
        const onePost = postData.get({ plain: true })
        const commentData = postData.Comments.map((comment) => comment.get({ plain: true }))
        res.render("onePost", { 
            title: onePost.title,
            post_author: onePost.post_author,
            post_date: onePost.post_date,
            post_body: onePost.post_body,
            comments: commentData
         })
        // console.log(onePost)
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new blog post
router.post('/', apiAuth, async (req, res) => {
    console.log('route reached!')
    try {
        const newPost = await BlogPost.create({
            title: req.body.title,
            post_author: req.session.user.username,
            post_body: req.body.post_body,
            post_date: req.body.post_date,
            user_id: req.session.user.id
        });
        if(!req.session.user) {
            res.render('login');
            return
        }
        if (req.body.post_body.length > 255) {
            alert("Post must be shorter than 255 characters");
            return
        }
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a blog post
router.delete('./:id', apiAuth, async (req, res) => {
    console.log('route reached!')
    try {
        const removePost = await BlogPost.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!req.session.user) {
            res.render('login')
            return
        }
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
        const postToUpdate = await BlogPost.findByPk(postId)
        postToUpdate.addComment(req.params.id)
        postToUpdate.save();
        res.status(200).json({ message: 'Success!' })
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;