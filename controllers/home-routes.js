const router = require('express').Router();
const apiAuth = require("../middleware/apiAuth")
const { User, BlogPost, Comment } = require('../models/');

// loads the home page
router.get('/', async (req, res) => {
    const allPostsData = await BlogPost.findAll();
    const allPosts = allPostsData.map(post => post.get({ plain: true }))
    res.render('index', {
        posts: allPosts
    })
})

// loads the login page
router.get('/login', async (req, res) => {
    if (!req.session.user) {
        res.render('login')
    } else {
        return
    }
})

router.get('/onepost', async (req,res) => {
    res.render('onePost')
})


// if user is logged in, displays user dashboard; otherwise, sends user to login page
router.get('/dashboard', apiAuth, async (req, res) => {
    const userPostData = await BlogPost.findAll({
        where: {
            user_id: req.session.user.id
        }
    })
    const userPosts = userPostData.map((posts) => posts.get({ plain: true }));
    res.render("dashboard", { userPost: userPosts })
});

// open the new post page from the user's dashboard
router.get('/newpost', apiAuth, (req, res) => {
    res.render('newPost')
})

// get one post with comments
router.get('/onepost/:id', async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }],
        });
        console.log(postData)
        if (!postData) {
            res.status(404).json({ message: 'No post found with that id!' })
        }
        const onePost = postData.get({ plain: true })
        res.render("onePost", {
            title: onePost.title,
            post_author: onePost.post_author,
            post_date: onePost.post_date,
            post_body: onePost.post_body,
            comments: onePost.Comments,
            comment_author: onePost.Comments.comment_author,
            comment_date: onePost.Comments.comment_date,
            comment_body: onePost.Comments.comment_body
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;