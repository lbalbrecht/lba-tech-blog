const router = require('express').Router();
const apiAuth = require("../middleware/apiAuth")
const { User, BlogPost, Comment } = require('../models/');

// loads the home page
router.get('/', async (req, res) => {
    const allPostsData = await BlogPost.findAll();
    const allPosts = allPostsData.map(post => post.get({plain: true}))
    res.render('index',{
        posts: allPosts
    })
})

// loads the login page
router.get('/login', async (req, res) => {
    if(!req.session.user) {
    res.render('login')
    } else {
        res.render("dashboard")
    }
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

// open a specific post with comments from the user's dashboard
router.get('dashboard/:id', apiAuth, async (req, res) => {
    const userPostData = await BlogPost.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
    const PostCommentsData = await Comment.findByPk(req.params.id, {
        include: [{ model: BlogPost }]
    })
    const userPost = userPostData.get({ plain: true })
    const postComments = postCommentsData.map((comments) => comments.get({ plain: true }))
    res.render("dashboard", { userPost, postComments })
})

module.exports = router;